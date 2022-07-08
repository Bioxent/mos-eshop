const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const PORT = process.env.PORT || 3001;

const path = require("path");
const app = express();

// app.use(express.static("public"));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  session({
    secret: "Our little secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// mongoose.connect("mongodb://localhost:27017/eShopDB", {
//   useNewUrlParser: true,
// });

mongoose.connect("mongodb+srv://admin-eluk:sanjf368njFDc@cluster0.sjbwo.mongodb.net/?retryWrites=true&w=majority");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  favorites: Array,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// const newUser = new User({
//   username: "asd@asdf.com",
//   password: "fawfdsfdfsa",
// });

// newUser.save();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/checkUser", function (req, res) {
  if (req.user) {
    console.log("user is logged in");
    res.json({ message: "Hello from server!", username: req.user.username });
  } else {
    console.log("user is not logged in ");
    res.json({ message: "Hello from server!", username: null });
  }
  console.log(req.user);
});

app.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

app.post("/register", function (req, res) {
  User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/catalog");
        });
      }
    }
  );
});

app.post("/login", function (req, res) {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/catalog");
      });
    }
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
