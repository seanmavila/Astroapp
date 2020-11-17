const express = require("express");
const router = express.Router();

// Get home page
router.get("/", (req, res, next) => {
  res.render("home", { title: "Astroapp" });
});
//get Galaxy Sorting page
router.get("/galaxySort", (req, res, next) => {
  res.render("galaxySort", { title: "Galaxy Sorting" });
});
// Get HR diagram page
router.get("/hrsim", (req, res, next) => {
  res.render("hrsim", { title: "HR Diagram Simulation" });
});

// Get spectra page
router.get("/spectra", (req, res, next) => {
  res.render("spectra", { title: "Stellar Spectra Matching" });
});

// Get spectra page
router.get("/fusion", (req, res, next) => {
  res.render("fusion", { title: "Nuclear Fusion Accounting" });
});

module.exports = router;
