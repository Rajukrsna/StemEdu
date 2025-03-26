const mongoose = require("mongoose");

const ExperimentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the image URL or path
    required: true,
  },
  route: {
    type: String,
    required: true,
    unique: true,
  },
  track: {
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Experiment", ExperimentSchema);
