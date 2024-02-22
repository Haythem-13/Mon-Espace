const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const BankOperation = require("../models/bankoperations");
const Accounts = require("../models/accounts"); 

const createNewAccounts = async (req, res) => {
  console.log("new one created");
  try {
    const { username, email, password } = req.body;

    const existingUsername = await Accounts.findOne({ username });
    const existingEmail = await Accounts.findOne({ email });

    if (existingUsername) {
      res.status(400).send({ msg: 'Username is already used' });
    } else if (existingEmail) {
      res.status(400).send({ msg: 'Email is already used' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Accounts.create({
        username,
        email,
        password: hashedPassword,
      });

      res.send({ msg: 'Account successfully created', newUser });
    } 
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Cannot create the account', error });
  }
};

// const login = async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     if (!username || !password) {
//       return res.status(400).json({ msg: "Username and password are required" });
//     }
//     const foundAccount = await Accounts.findOne({ username });
//     if (!foundAccount) {
//       return res.status(400).json({ msg: 'Invalid username' });
//     }
//     const validPassword = await bcrypt.compare(password, foundAccount.password);
//     if (!validPassword) {
//       return res.status(400).json({ msg: 'Invalid password' });
//     }
//     // Generate token
//     const token = jwt.sign(
//       { userId: foundAccount._id, username: foundAccount.username },
//       process.env.PRIVATE_KEY
//     );
    
//     res.send({ msg: 'Login successful', token ,username});
//   } catch (error) {
//     res.status(500).json({ msg: 'An error occurred. Please try again later.', error });
//   }
// }

const getAllAccounts = async (req, res) => {
  try {
    let allAccounts = await Accounts.find();
    res.send(allAccounts);
  } catch (error) {
    res.send({ msg: "Cannot retrieve accounts", error });
  }
};

// const getBankHistory = async (req, res) => {
//   try {
//     const bankHistory = await BankOperation.find();
//     res.send(bankHistory);
//   } catch (error) {
//     res.status(500).send({ msg: 'Error fetching bank history', error });
//   }
// };

module.exports = { createNewAccounts,getAllAccounts  };
