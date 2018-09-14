const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const methodOverride = require("method-override");

// Import util functions
const validateIdeaForm = require("./utils/validation/validateIdeaForm");

// Override with the X-HTTP-Method-Override header in the request
app.use(methodOverride("_method"));

// Load Ideas Model
const IdeaModel = require("./models/idea");
const Idea = mongoose.model("ideas");

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Using static files like styles
app.use(express.static("public"));

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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
  const title = "This is my title";
  res.render("index", {
    title: title
  });
});

// GET About route
app.get("/about", (req, res) => {
  res.render("about");
});

// GET Idea route
app.get("/ideas", (req, res) => {
  Idea.find({})
    .then(ideas => {
      res.render("ideas", { ideas });
    })
    .catch(error => console.log(error));
});

// GET Edit idea route
app.get("/ideas/edit/:id", (req, res) => {
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      res.render("ideas/edit", { idea });
    })
    .catch(error => console.log(error));
});

// PUT Edit idea route
app.put("/ideas/edit/:id", (req, res) => {
  const { title, details } = req.body;
  Idea.findOne({
    _id: req.params.id
  })
    .then(idea => {
      // Overwrite entry with edited values
      idea.title = title;
      idea.details = details;

      idea.save().then(() => res.redirect("/ideas"));
    })
    .catch(error => console.log(error));
});

// GET Add idea route
app.get("/ideas/add", (req, res) => {
  res.render("ideas/add");
});

// POST Add idea route
app.post("/ideas/add", (req, res) => {
  const { title, details } = req.body;
  // Form validation
  const errors = validateIdeaForm(req.body);

  if (errors.length > 0) {
    res.render("ideas/add", {
      errors: errors
    });
  } else {
    const newIdea = {
      title,
      details
    };
    new Idea(newIdea)
      .save()
      .then(idea => console.log(idea))
      .catch(error => console.log(error));
    res.redirect("/ideas");
  }
});

app.listen(port, () => {
  console.log(`Port is running on ${port}`);
});
