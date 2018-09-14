const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const session = require("express-session");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Import routes
const ideasRouter = require("./routes/ideas");
const usersRouter = require("./routes/users");

// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Using static files like styles
app.use(express.static("public"));

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use express-session
app.use(
  session({
    secret: "keyboard cat",
    resave: true,
    saveUninitialized: true
  })
);

// Use flash
app.use(flash());

// Set global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// Connecting DB
mongoose
  .connect(
    "mongodb://localhost/vidjot-dev",
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected..."))
  .catch(error => console.log(error));

const port = 5000;

// GET Home route
app.get("/", (req, res) => {
  const title = "VidJot";
  res.render("index", {
    title: title
  });
});

// GET About route
app.get("/about", (req, res) => {
  res.render("about");
});

// Routes
app.use("/ideas", ideasRouter);
app.use("/users", usersRouter);

app.listen(port, () => {
  console.log(`Port is running on ${port}`);
});
