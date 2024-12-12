const express=require("express");
const { createCategory, deleteCategory } = require("../controllers/categoryControllers");

const router=express.Router();

router.route("/").post(createCategory);
router.route('/:id').delete(deleteCategory);


module.exports=router;