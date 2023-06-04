const mongoose = require("mongoose");

const namesSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  names: {
    type: Array,
  },
});

const Name = mongoose.model("Name", namesSchema);

exports.Name = Name;
