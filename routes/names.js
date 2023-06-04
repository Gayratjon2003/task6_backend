const { Name } = require("../models/name");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  let names = await Name.find();
  res.send(names);
});


module.exports = router;
