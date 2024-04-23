const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/subscription"); 

const addMembership = async ({ email, entryDate }) => {
  if (!email || !entryDate) {
    throw new Error('Missing data, please provide new values');
  }

  try {
    const currentDate = new Date();
    const user = new User({
      email,
      entryDate,
      expiryDate: new Date(entryDate.getFullYear(), entryDate.getMonth() + 1, entryDate.getDate()),
      StartDate: currentDate 
    });
    const result = await user.save();
    return result;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
};

  

const getUsers = (User) => async () => {
    return await User.find({});
};

const getUserByEmail = (User) => async (email) => {
    return await User.findOne({ email });
};

const updatePlan = (User) => async (email, newPlan) => {
    return await User.findOneAndUpdate({ email }, { plan: newPlan }, { new: true });
};
module.exports = { addMembership,getUsers ,getUserByEmail,updatePlan };
