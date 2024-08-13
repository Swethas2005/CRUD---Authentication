let mongoose = require("mongoose");

// movies Schema
const movieSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
});

// movies model
const userModel = mongoose.model("user", movieSchema);
// export model 
module.exports= userModel