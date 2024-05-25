const express = require('express');
const router = express.Router();
const { addMembership, getUsers, getUserByEmail, updatePlan } = require('../Controllers/subscription');

router.post('/addUser', addMembership);
router.get('/getUsers', getUsers);
router.get('/getUserByEmail/:email', getUserByEmail);
router.patch('/updatePlan', updatePlan);

module.exports = router;
