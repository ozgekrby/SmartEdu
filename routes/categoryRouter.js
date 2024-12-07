const express=require("express");
const { createCategory } = require("../controllers/categoryControllers");

const router=express.Router();

router.route("/").post(createCategory);


module.exports=router;