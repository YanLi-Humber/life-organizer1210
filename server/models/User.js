const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },  // Add this line for username
});

// Optional: Pre-save hook to handle things like password hashing or default username creation
userSchema.pre("save", function(next) {
  if (!this.username) {
    this.username = this.email.split('@')[0]; // Default username from email if not provided
  }
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
