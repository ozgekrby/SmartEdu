const express = require('express');
const {
  createUser,
  loginUser,
  getDashboardPage,
  logoutUser,
} = require('../controllers/authControllers');
const authmiddleware = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const User = require('../models/User');
const router = express.Router();

router.route('/signup').post(
  [
    body('name').not().isEmpty().withMessage('Please Enter Your Name'),
    body('email')
      .isEmail()
      .withMessage('Please Enter Valid Email')
      .custom((userEmail) => {
        return User.findOne({ email: userEmail }).then((user) => {
          if (user) {
            return Promise.reject('Email is already exists!');
          }
        });
      }),
    body('password').not().isEmpty().withMessage('Please Enter A Password'),
  ],
  createUser
);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/dashboard').get(authmiddleware, getDashboardPage);
module.exports = router;
