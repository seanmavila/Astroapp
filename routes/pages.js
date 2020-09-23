const express = require("express");
const User = require("../core/user");
const Movies = require("../core/movies");
const router = express.Router();

// create an object from the class User in the file core/user.js
const user = new User();

const movies = new Movies();

// Get the index page
router.get("/", (req, res, next) => {
  let user = req.session.user;
  // If there is a session named user that means the use is logged in. so we redirect him to home page by using /home route below
  if (user) {
    res.redirect("/home");
    return;
  }
  // IF not we just send the index page.
  res.render("index", { title: "Astroapp" });
});

// Get home page
router.get("/home", (req, res, next) => {
  let user = req.session.user;

  if (user) {
    res.render("home", { opp: req.session.opp, name: user.fullname });
    return;
  }
  res.redirect("/");
});

module.exports = router;
