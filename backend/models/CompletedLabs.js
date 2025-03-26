const mongoose = require("mongoose");
const { route } = require("../routes/experiment");

const CompletedLabSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Experiment name is mandatory
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  duration: {
    type: Number, // Duration in seconds
    required: true,
  },
  route : { 
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now, // Automatically set the completion time
  },
});

const CompletedLab = mongoose.model("CompletedLab", CompletedLabSchema);
module.exports = CompletedLab;
