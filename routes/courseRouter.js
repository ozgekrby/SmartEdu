const express=require("express");
const { createCourse, getAllCourses, getCourse } = require("../controllers/courseControllers");

const router=express.Router();

router.route("/").post(createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);

module.exports=router;