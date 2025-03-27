const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  xp: {
    physics: { type: Number, default: 0 },
    chemistry: { type: Number, default: 0 },
    biology: { type: Number, default: 0 },
    maths: { type: Number, default: 0 }
  }
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", UserSchema);
