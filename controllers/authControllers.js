const User = require('../models/User');
const bcrypt = require('bcrypt');
const Category = require('../models/Category');
const Course = require('../models/Course');
const { validationResult } = require('express-validator');
exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const errors = validationResult(req);
    console.log(errors);
    console.log(errors.array()[0].msg);
    for (let i = 0; i <errors.array().length; i++) {
      req.flash("error", `${errors.array()[i].msg}`);
    }
  
    res.status(400).redirect('/register');
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      req.flash("error", "User does not exist!");
      return res.status(400).redirect('/login');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      req.flash("error", "Your password is incorrect!");
      return res.status(400).redirect('/login');
    }

    req.session.userID = user._id;
    return res.status(200).redirect('/users/dashboard');
    
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

exports.getDashboardPage = async (req, res) => {
  try {
    const user = await User.findOne({_id:req.session.userID}).populate('courses');
    const categories = await Category.find();
    const courses = await Course.find({user:req.session.userID})
    const users = await User.find();
    console.log(users.countDocument);
    if (!user) {
      return res.redirect('/users/login');
    }
    res.status(200).render('dashboard', {
      page_name: 'dashboard',
      user,
      categories,
      courses,
      users,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {    
    await User.findByIdAndDelete(req.params.id)
    await Course.deleteMany({user:req.params.id})
    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};