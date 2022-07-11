const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const dotenv = require("dotenv");
const uniqid = require("uniqid");

//definitons, connect libraries, database, config
const PORT = process.env.PORT || 3001;
dotenv.config();
const path = require("path");
const app = express();

const dba = process.env.DB_A;
const sec_data = process.env.SPECIAL_SESSION;

// app.use(express.static("../client/public"));
app.use(express.static(path.resolve(__dirname, "../client/build")));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use(
  session({
    secret: sec_data,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// for local DB connection
// mongoose.connect("mongodb://localhost:27017/eShopDB", {
//   useNewUrlParser: true,
// });

mongoose.connect(
  "mongodb+srv://admin-eluk:" +
    dba +
    "@cluster0.sjbwo.mongodb.net/?retryWrites=true&w=majority"
);

const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  favorites: Array,
});

const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  imgUrl: String,
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

const Product = mongoose.model("Product", productSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// manually add users or products

// const newUser = new User({
//   username: "asd@asdf.com",
//   password: "fawfdsfdfsa",
// });

// newUser.save();

// const newProduct = new Product({
//   id: uniqid(),
//   title: "Sushi",
//   description: "These sushi are great",
//   imgUrl: "https://cdn.pixabay.com/photo/2018/08/03/08/33/food-3581341_960_720.jpg"
// });

// newProduct.save();

//define routes

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/getProducts", function (req, res) {
  Product.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "Product check", products: products });
    }
  });
});

app.get("/checkUser", function (req, res) {
  if (req.user) {
    console.log("user is logged in");
    res.json({ message: "User check", username: req.user.username });
  } else {
    console.log("user is not logged in ");
    res.json({ message: "User check", username: null });
  }
});

app.get("/getFavorites", function (req, res) {
  if (req.user) {
    const favoriteList = req.user.favorites;
    Product.find({ id: favoriteList }, function (err, favorites) {
      if (err) {
        console.log(err);
      } else {
        res.json({ message: "Favorite product check", favorites: favorites });
      }
    });
  } else {
    console.log("user is not logged in ");
    res.json({ message: "User check", favorites: null });
  }
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
    { id: uniqid(), username: req.body.username },
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

  passport.authenticate("local")(req, res, function () {
    res.redirect("/catalog");
  });
});

app.post("/addFavorite", function (req, res) {
  if (req.user) {
    console.log("user is logged in");
    res.json({ message: "User check", username: req.user.username });
  } else {
    console.log("user is not logged in ");
    res.json({ message: "User check", username: null });
  }
});

app.put("/updateProduct", function (req, res) {
  Product.updateOne(
    { id: "1ckv5scvwl5ggqv3e" },
    { title: "sushi tasty" },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.put("/updateUser", function (req, res) {
  User.updateOne(
    { username: req.body.username },
    { $push: { favorites: req.body.newFavorite } },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.delete("/deleteFavorite", (req, res) => {
  const removeFavId = req.body.id;
  User.updateOne(
    { username: req.body.username },
    {
      $pull: {
        favorites: removeFavId,
      },
    },
    function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
