const express = require("express");
const errorMiddleware = require("../middleware/error");
const usersRoute = require("../routes/users");
const namesRoute = require("../routes/names");
const cors = require('cors');

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/users", usersRoute);
  app.use("/api/names", namesRoute);
  app.use(errorMiddleware);
};
