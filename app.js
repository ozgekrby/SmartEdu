const express = require('express');
const mongoose = require('mongoose');
const pageRouter = require('./routes/pageRouter');
const courseRouter = require('./routes/courseRouter');
const bodyParser = require('body-parser');
const app = express();

//TEMPLATE ENGINE
app.set('view engine', 'ejs');

//Middlewares
app.use(express.static('public'));
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//DB Connection

mongoose.connect('mongodb://127.0.0.1/smartedu-database').then(() => {
  console.log('Connected DB');
});

//Routes
app.use('/', pageRouter);
app.use('/courses', courseRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
