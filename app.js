const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRouter');
const courseRouter = require('./routes/courseRouter');
const categoryRouter = require('./routes/categoryRouter');
const userRouter = require('./routes/userRouter');
const bodyParser = require('body-parser');
const session = require('express-session')
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
}))
app.use('*', (req, res, next) => {
  userIN = req.session.userID;
  next();
  });
//DB Connection

mongoose.connect('mongodb://127.0.0.1/smartedu-database').then(() => {
  console.log('Connected DB');
});

//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);
app.use('/categories', categoryRouter);
app.use('/users', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
