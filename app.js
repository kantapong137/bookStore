//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const md5 = require("md5");
const router = require('express').Router();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/userDB", { useNewUrlParser: true });

// const userSchema = {
//   email: String,
//   password: String,
// };

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

// const secret = "DoraemonIsCat";
// userSchema.plugin(encrypt, { secret: secret, encryptedFields: ["password"] });

const User = new mongoose.model("User", userSchema);

const weatherRoute = require('./route/weather');

// Use View Engine

// Middleware route
app.use('/secrets', weatherRoute);

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res) {
  const newUser = new User({
    email: req.body.username,
    password: md5(req.body.password),
  });
  newUser.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.render("secrets");
      console.log("Home coming");
    }
  });
});

app.get("/logout", function (req, res) {
  // req.logout();
  res.redirect("/");
});

app.post("/login", function (req, res) {
  const username = req.body.username;
  const password = md5(req.body.password);

  User.findOne({ email: username }, function (err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render("secrets");
        }
      }
    }
  });
});


app.listen(3000, function () {
  console.log("Server is run on port 3000.");
});
