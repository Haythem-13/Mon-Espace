const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  plan: {
    type: String,
    required: true,
  },
  endDate: {
    type: Date,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
