const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const path = require("path");
const Category = require("../models/category");
const User = require("../models/user");

router.get("/new", (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/users/login");
  } else {
    Category.find({}).then((categories) => {
      res.render("site/addpost", {
        categories: categories.map((item) => item.toJSON()),
      });
      console.log(categories);
    });
  }
});

router.get("/:id/", (req, res) => {
  Post.findById(req.params.id)
    .populate({ path: "author", model: User })
    .then((post) => {
      Category.find({}).then((categories) => {
        res.render("site/post", {
          post: post.toJSON(),
          categories: categories.map((category) => category.toJSON()),
        });
      });
    });
});

router.post("/test", (req, res) => {
  let post_image = req.files.post_image;
  post_image.mv(
    path.resolve(__dirname, "../public/img/postimages", post_image.name)
  );
  Post.create({
    ...req.body,
    post_image: `/img/postimages/${post_image.name}`,
    author: req.session.userId,
  });

  req.session.sessionFlash = {
    type: "alert alert-success",
    message: "Your post was created succesfully",
  };

  res.redirect("/blog");
});

module.exports = router;
