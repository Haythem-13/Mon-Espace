const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
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
    default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  },
});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true, // Ensure unique emails
  },
  memberships: [membershipSchema], 
});

const User = mongoose.model('User', userSchema);

module.exports = { User, membershipSchema }; // 
