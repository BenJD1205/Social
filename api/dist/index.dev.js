"use strict";

var express = require("express");

var app = express();

var mongoose = require("mongoose");

var dotenv = require("dotenv");

var helmet = require("helmet");

var morgan = require("morgan");

var multer = require("multer");

var userRoute = require("./routes/users");

var authRoute = require("./routes/auth");

var postRoute = require("./routes/posts");

var router = express.Router();

var path = require("path");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, function () {
  console.log("Connected to MongoDB");
});
mongoose.set('useCreateIndex', true);
app.use("/images", express["static"](path.join(__dirname, "public/images"))); //middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, "public/images");
  },
  filename: function filename(req, file, cb) {
    cb(null, req.body.name);
  }
});
var upload = multer({
  storage: storage
});
app.post("/api/upload", upload.single("file"), function (req, res) {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.listen(8800, function () {
  console.log("Backend server is running!");
});