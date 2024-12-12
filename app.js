const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRouter');
const courseRouter = require('./routes/courseRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//GLOBAL VARIABLES
global.userIN = null; 

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())
app.use(session({
  secret: 'my_keyboard_cat',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1/smartedu-database' })
}))
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
  });
//DB Connection

mongoose.connect('mongodb://127.0.0.1/smartedu-database').then(() => {
  console.log('Connected DB');
});

app.use(flash());
app.use((req, res, next)=> {
  res.locals.flashMessages = req.flash();
  next();
})

//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
