const express = require("express");
const router = express.Router();
const Post = require("../models/post");

router.get("/", (req, res) => {
  console.log(req.session);
  res.render("site/index");
});

router.get("/about", (req, res) => {
  res.render("site/about");
});
router.get("/admin", (req, res) => {
  res.render("admin/index");
});

router.get("/blog", (req, res) => {
  Post.find({}).then((posts) => {
    res.render("site/blog", {
      posts: posts.map((item) => item.toJSON()),
    });
  });
});

router.get("/contact", (req, res) => {
  res.render("site/contact");
});

module.exports = router;
