const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  avatar: {
    type: String,
    default: "http://robohash.org/bob",
  },
  follows: {
    type: Array,
    default: [],
  },
});
module.exports = mongoose.model("user", userSchema);
