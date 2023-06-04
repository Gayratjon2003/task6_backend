const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  recipient: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50,
  },
  messages: {
    type: Array,
    required: false,
  },
});

const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    recipient: Joi.string().min(1).max(50).required(),
    user: Joi.string().min(1).max(50).required(),
    title: Joi.string().min(1).max(255).required(),
    message: Joi.string().min(3).max(4048).required(),
  };

  return Joi.validate(user, schema);
}
function validateGetUser(user) {
  const schema = {
    recipient: Joi.string().min(1).max(50).required(),
  };

  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validateUser;
exports.validateGetUser = validateGetUser;
