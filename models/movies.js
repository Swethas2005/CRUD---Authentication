let mongoose = require("mongoose");

// movies Schema
const movieSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
});

// movies model
const MovieModel = mongoose.model("movie", movieSchema);
// export model 
module.exports= MovieModel