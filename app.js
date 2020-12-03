const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");

// Import controllers
const categoryController = require("./controllers/categoryController");
const libraryItemController = require("./controllers/libraryItemController");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  }
  next();
});

// Controllers
app.use("/api/categories", categoryController);
app.use("/api/categories/:categoryId/libraryItems", libraryItemController);

// !IMPORTANT Error handling must be declared below the controllers declaration.

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    errors: {
      message: err.message || "Internal Server Error",
    },
  });
});

module.exports = app;
