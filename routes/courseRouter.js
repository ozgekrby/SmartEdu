const express=require("express");
const { createCourse, getAllCourses } = require("../controllers/courseControllers");

const router=express.Router();

router.route("/").post(createCourse);
router.route("/").get(getAllCourses);

module.exports=router;