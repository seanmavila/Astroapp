const express = require("express");
const router = express.Router();

// Get the index page
router.get("/", (req, res, next) => {
  res.render("home", { title: "Astroapp" });
});

// Get home page
router.get("/home", (req, res, next) => {
  res.render("home", { title: "Astroapp" });
});


//get Galaxy Sorting page
router.get("/galaxySort", (req, res, next) => {
  res.render("galaxySort", { title: "Galaxy Sorting" });
});

//get HR Diagram page
router.get("/hrsim", (req, res, next) => {
  let user = req.session.user;
  res.render("hrsim", { title: "HR Diagram Sorting" });
});

//get Stellar Spectra page
router.get("/spectra", (req, res, next) => {
  res.render("spectra", { title: "Stellar Spectra Sorting" });
});

// Get spectra slider page
router.get("/SpectraSlider", (req, res, next) => {
  res.render("SpectraSlider", { title: "Stellar Spectra Slider" });
});

// Get spectra page
router.get("/fusion", (req, res, next) => {
  res.render("fusion", { title: "Nuclear Fusion Accounting" });
});

module.exports = router;
