const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv/config");

const BCRYPT_SALT = parseInt(process.env.BCRYPT_SALT);

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetToken: String,
  resetTokenExpiry: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, BCRYPT_SALT);
  next();
});

module.exports = mongoose.model("User", UserSchema);
