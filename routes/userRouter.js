const express=require("express");
const { createUser, loginUser, getDashboardPage, logoutUser } = require("../controllers/authControllers");


const router=express.Router();

router.route("/signup").post(createUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/dashboard').get(getDashboardPage);
module.exports=router;