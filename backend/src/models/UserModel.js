const mongoose = require("mongoose");

const User = mongoose.model("user", {
  name: String,
  email: String,
  password: String,
  created_at: Date,
  updated_at: Date,
});
module.exports = User;
