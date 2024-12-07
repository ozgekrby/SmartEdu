const express=require("express");
const { createCourse } = require("../controllers/courseControllers");

const router=express.Router();

router.route("/").post(createCourse);

module.exports=router;