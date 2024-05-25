const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const Accounts = require('../models/accounts');

const createAdmin = async (req, res) => {
  try {
    const existingAdmin = await Accounts.findOne({ username: 'adminUser' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('adminPassword', 10);
      const admin = await Accounts.create({
        username: 'adminUser',
        email: 'admin@example.com',
        password: hashedPassword,
      });
      res.status(201).json({ msg: 'Admin account created', admin });
    } else {
      res.status(400).json({ msg: 'Admin account already exists' });
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
    res.status(500).json({ msg: 'Error creating admin account', error });
  }
};

const createNewAccount = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUsername = await Accounts.findOne({ username });
    const existingEmail = await Accounts.findOne({ email });

    if (existingUsername) {
      return res.status(400).send({ msg: 'Username is already used' });
    } else if (existingEmail) {
      return res.status(400).send({ msg: 'Email is already used' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Accounts.create({
        username,
        email,
        password: hashedPassword,
        startDate: Date.now(),
      });

      const token = jwt.sign(
        { userId: newUser._id, username: newUser.username, email: newUser.email },
        process.env.PRIVATE_KEY
      );

      return res.status(200).json({ msg: 'Account successfully created', token, user: newUser });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: 'Cannot create the account', error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const user = await Accounts.findOne({ username, email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, email: user.email },
      process.env.PRIVATE_KEY
    );

    return res.status(200).json({ msg: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'An error occurred. Please try again later.' });
  }
};

const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Accounts.find({});
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Cannot retrieve accounts', error });
  }
};

module.exports = { createNewAccount, getAllAccounts, login, createAdmin };