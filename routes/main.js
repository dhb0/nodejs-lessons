const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Category = require("../models/category");
const User = require("../models/user");

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("site/index");
});

router.get("/about", (req, res) => {
  res.render("site/about");
});

//
router.get("/admin", (req, res) => {
  res.render("admin/index");
});
//

router.get("/blog", (req, res) => {
  Post.find({})
    .populate({path:'author', model:User})
    .sort({ $natural: -1 })
    .then((posts) => {
      Category.find({}).then((categories) => {
        res.render("site/blog", {
          posts: posts.map((item) => item.toJSON()),
          categories: categories.map((category) => category.toJSON()),
        });
      });
    });
});

router.get("/contact", (req, res) => {
  res.render("site/contact");
});

module.exports = router;
