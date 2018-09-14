const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Using static files like styles
app.use(express.static("public"));

// Connecting DB
mongoose
  .connect("mongodb://localhost/vidjot-dev")
  .then(() => console.log("MongoDB Connected..."))
  .catch(error => console.log(error));

const port = 5000;

app.get("/", (req, res) => {
  const title = "This is my title";
  res.render("index", {
    title: title
  });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`Port is running on ${port}`);
});
