const express = require("express");
const router = express.Router();

// Get home page
router.get("/", (req, res, next) => {
  res.render("home", { title: "Astroapp" });
});

// Get HR diagram page
router.get("/hrsim", (req, res, next) => {
  res.render("hrsim", { title: "HR Diagram Simulation" });
});

module.exports = router;
