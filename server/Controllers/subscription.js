const mongoose = require('mongoose');
const User = require('../models/subscription');
const jwt = require('jsonwebtoken');
const Accounts = require('../models/accounts');

const addMembership = async (req, res) => {
  const { email, discipline, entryDate } = req.body; // This assumes req.body is defined
  
  if (!discipline || !entryDate || !email) {
    return res.status(400).send({ msg: 'Missing data, please provide discipline, entryDate, and email' });
  }

  try {
    const user = await Accounts.findOne({ email });
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }

    const currentDate = new Date(entryDate);
    const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    const membership = {
      discipline,
      entryDate,
      expiryDate,
    };

    user.memberships.push(membership);
    await user.save();
    const token = jwt.sign(
      { userId: membership._id, discipline: membership.discipline, entryDate: membership.entryDate, expiryDate: membership.expiryDate },
      process.env.PRIVATE_KEY
    );

    return res.status(200).json({ msg: 'Membership added successfully', token, user: membership });
    // return res.status(200).json({ msg: 'Membership added successfully', user });
  } catch (error) {
    console.error('Error adding membership:', error);
    return res.status(500).send({ msg: 'Error adding membership', error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching users', error });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching user', error });
  }
};

const updatePlan = async (req, res) => {
  try {
    const { email, newPlan } = req.body;
    const updatedUser = await User.findOneAndUpdate({ email }, { plan: newPlan }, { new: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ msg: 'Error updating plan', error });
  }
};

module.exports = { addMembership, getUsers, getUserByEmail, updatePlan };
