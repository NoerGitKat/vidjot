const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

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
  res.render("users/login");
});

// POST User register route
router.post("/register", (req, res) => {
  res.render("users/register");
});

module.exports = router;
