const mongoose = require("mongoose");

const UserProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User collection
    required: true,
  },
  subjects: [
    {
      name: { type: String, required: true }, // Subject name (e.g., Maths, Physics)
      progress: { type: Number, default: 0, min: 0, max: 100 }, // Progress percentage (0-100)
    },
  ],
});

const UserProgress = mongoose.model("UserProgress", UserProgressSchema);

module.exports = UserProgress;
