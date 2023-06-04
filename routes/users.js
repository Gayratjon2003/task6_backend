const { User, validate, validateGetUser } = require("../models/user");
const { Name } = require("../models/name");
const express = require("express");
const router = express.Router();
const _ = require("lodash");

router.post("/me", async (req, res) => {
  const { error } = validateGetUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let user = await User.findOne({ recipient: req.body.recipient });
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let name = await Name.findOne();
  if (!name) {
    name = new Name({
      title: "names",
      names: [],
    });
    await name.save();
    return;
  }
  let namesArray = [...name.names];
  namesArray.push(req.body.user);
  namesArray.push(req.body.recipient);
  let filteredData = [...new Set(namesArray)];
  name.names = filteredData;
  await name.save();
  const messageTime = new Date();

  let user = await User.findOne({ recipient: req.body.recipient });
  if (user) {
    const prevMessages = user.messages;
    user.messages = [
      {
        title: req.body.title,
        message: req.body.message,
        user: req.body.user,
        time: messageTime,
      },
      ...prevMessages,
    ];
    await user.save();
    return res.send("Message sent successfully");
  }

  const pickedValues = {
    recipient: req.body.recipient,
    messages: [
      {
        title: req.body.title,
        message: req.body.message,
        user: req.body.user,
        time: messageTime,
      },
    ],
  };
  user = new User(pickedValues);
  await user.save();

  res.send(_.pick(user, ["_id", "recipient", "messages"]));
});

module.exports = router;
