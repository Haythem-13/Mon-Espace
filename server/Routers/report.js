const express = require("express");
const router = express.Router();
const { submitReport,getUserReports } = require("../Controllers/report");
const authenticateUser = require('../middelware/auth');


router.post('/submit', submitReport);
// Route to fetch user reports
router.get('/reports/:email', authenticateUser, getUserReports);

module.exports = router;

