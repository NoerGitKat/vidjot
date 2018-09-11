const express = require("express");
const app = express();
const exphbs = require("express-handlebars");

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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