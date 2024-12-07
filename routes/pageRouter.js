const express=require("express");
const { getIndexPage, getAboutPage } = require("../controllers/pageControllers");

const router=express.Router();

router.route("/").get(getIndexPage);
router.route("/about").get(getAboutPage);

module.exports=router;