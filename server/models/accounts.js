const mongoose = require('mongoose');
const { membershipSchema } = require('../models/subscription'); // Import only the membershipSchema

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [6, 'Your Username should contain 6 letters at least'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be at least 8 characters long'],
    validate: {
      validator: function (value) {
        // Check if password contains at least one number
        return /\d/.test(value);
      },
      message: 'Password must contain at least one number',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  StartDate: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  memberships: [membershipSchema], // Use the imported membershipSchema
});

const AccountModel = mongoose.model('Accounts', accountSchema);

module.exports = AccountModel;
