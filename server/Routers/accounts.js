const express = require('express');
const router = express.Router();
const verifyToken = require('../middelware/auth');

const { createNewAccount, getAllAccounts, login, createAdmin } = require('../controllers/accounts');

router.post('/register', createAdmin);
router.post('/create', createNewAccount);
router.post('/login', login);
router.get('/', verifyToken, getAllAccounts);

module.exports = router;
