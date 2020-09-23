const express = require("express");
const path = require("path");

const app = express();

// for body parser. to collect data that sent from the client.
app.use(express.urlencoded({ extended: false }));

// Serve static files. CSS, Images, JS files ... etc
app.use(express.static(path.join(__dirname, "public")));

// Template engine. PUG
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve the index page
app.get("/", function (req, res) {
  res.render("index");
});

// Setting up the server
app.listen(3000, () => {
  console.log("Server is running on port 3000...");
});

module.exports = app;
