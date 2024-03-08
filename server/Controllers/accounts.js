const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
// const BankOperation = require("../models/bankoperations");
const Accounts = require("../models/accounts"); 



// In a separate script or during server initialization
const Admin = require("../models/accounts")

const createAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'admin' });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('adminPassword', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword,
        // Add any other admin-specific fields you need
      });
      console.log('Admin account created');
    } else {
      console.log('Admin account already exists');
    }
  } catch (error) {
    console.error('Error creating admin account:', error);
  }
};

// Call the async function
createAdmin();

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
}
const login = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ msg: 'Username and password are required' });
    }

    let foundAccount;

    if (role === 'admin') {
      foundAccount = await Admin.findOne({ username });
    } else {
      foundAccount = await Accounts.findOne({ username });
    }

    if (!foundAccount) {
      return res.status(400).json({ msg: 'Invalid username' });
    }

    const validPassword = await bcrypt.compare(password, foundAccount.password);

    if (!validPassword) {
      return res.status(400).json({ msg: 'Invalid password' });
    }

    const token = jwt.sign(
      { userId: foundAccount._id, username: foundAccount.username, role: role || 'user' },
      process.env.PRIVATE_KEY
    );

    res.send({ msg: 'Login successful', token, username: foundAccount.username, role: role || 'user' });
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred. Please try again later.', error });
  }
};


const getAllAccounts = async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};
    if (status === 'paid' || status === 'unpaid') {
      filter = { status };
    }

    const allAccounts = await Accounts.find(filter);
    const currentDate = new Date();

    // If filtering by unpaid, update status for accounts that need renewal
    if (status === 'unpaid') {
      for (const account of allAccounts) {
        if (!account.paymentDate || currentDate > account.paymentDate) {
          // Mark the account as paid and set paymentDate for the next month
          await Accounts.findByIdAndUpdate(account._id, {
            status: 'paid',
            paymentDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
          });
        }
      }
    }

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

module.exports = { createNewAccounts,getAllAccounts ,login,createAdmin };
