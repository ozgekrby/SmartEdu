const express=require("express");
const { createCourse, getAllCourses, getCourse, enrollCourse, releaseCourse, deleteCourse } = require("../controllers/courseControllers");
const roleMiddleware = require('../middlewares/roleMiddleware');
const router=express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]), createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route('/enroll').post(enrollCourse);
router.route('/release').post(releaseCourse);
router.route('/:slug').delete(deleteCourse);
module.exports=router;