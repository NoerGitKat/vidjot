const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

// Import util functions
const validateRegisterForm = require("./../utils/validation/validateRegisterForm");

// Load Users Model
const UserModel = require("../models/user");
const User = mongoose.model("users");

// GET User login route
router.get("/login", (req, res) => {
  res.render("users/login");
});

// GET User register route
router.get("/register", (req, res) => {
  res.render("users/register");
});

// POST User login route
router.post("/login", (req, res) => {
  User.find({
    email: req.body.email
  })
    .then(() =>
      bcrypt
        .compare("B4c0//", hash)
        .then(res => {
          res.redirect("/ideas");
        })
        .catch(error => console.log("error"))
    )
    .catch(error => console.log(error));
});

// POST User register route
router.post("/register", (req, res) => {
  // Form validation
  const errors = validateRegisterForm(req.body);

  if (errors.length > 0) {
    res.render("/login", {
      errors: errors
    });
  } else {
    const salt = bcrypt.genSaltSync(10);
    bcrypt.hash(req, body.password, salt, function(err, hashedPassword) {
      const newUser = {
        name,
        email,
        password: hashedPassword
      };
      new User(newUser)
        .save()
        .then(idea => console.log(idea))
        .catch(error => console.log(error));
      res.redirect("/users/login");
    });
  }
});

module.exports = router;
