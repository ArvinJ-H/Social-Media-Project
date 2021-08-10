const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
  id:{
    type: Number,
    required: true,
  },
  user:{
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  content: {
    type: String,
    required: true,
    min: 1,
    max: 100,
  },
  timestamp:{
      type: Date,
      default: Date.now
  },
  likes:{
    type: Array,
    default:[]
  }
});
module.exports = mongoose.model('posts',postsSchema)