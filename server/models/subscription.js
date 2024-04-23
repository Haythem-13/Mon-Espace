const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  discipline: {
    type: String,
    required: true,
  },
  entryDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
    default: Date.now() + 30 * 24 * 60 * 60 * 1000, // Default to one month from now
  },

});

const User = mongoose.model('User', userSchema);

module.exports = User;
