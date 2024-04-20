const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require("../models/subscription"); 

const addUser = async ({ email, plan, StartDate }) => {
    if (!email || !plan) {
      throw new Error('Missing data, please provide new values');
    }
  
    try {
      const user = new User({ email, plan, StartDate });
      const result = await user.save();
      return result;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error; // rethrow the error to be caught by the route handler
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
module.exports = { addUser,getUsers ,getUserByEmail,updatePlan };
