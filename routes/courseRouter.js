const express=require("express");
const { createCourse, getAllCourses, getCourse, enrollCourse, releaseCourse, deleteCourse, updateCourse } = require("../controllers/courseControllers");
const roleMiddleware = require('../middlewares/roleMiddleware');
const router=express.Router();

router.route('/').post(roleMiddleware(["teacher", "admin"]), createCourse);
router.route("/").get(getAllCourses);
router.route("/:slug").get(getCourse);
router.route('/enroll').post(enrollCourse);
router.route('/release').post(releaseCourse);
router.route('/:slug').delete(deleteCourse);
router.route('/:slug').put(updateCourse);
module.exports=router;