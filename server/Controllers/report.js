
const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
require('dotenv').config();
const jwt = require('jsonwebtoken');
const ReportModel = require("../models/report");
const Report = require('../models/report');

const getUserReports = async (req, res) => {
    try {
      const userEmail = req.params.email; // Get user's email from request parameters
      const reports = await Report.find({ userEmail }); 
      res.send(reports);
    } catch (error) {
      console.error('Error fetching user reports:', error);
      res.status(500).json({ message: 'Error fetching user reports' });
    }
  };

  const submitReport = async (req, res) => {
    try {
        const { name, report, userEmail } = req.body; 
        
        const newReport = await ReportModel.create({
            name,
            report,
            userEmail: userEmail // Use userEmail from req.body
        });

        const token = jwt.sign(
            { userId: newReport._id, name: newReport.name, report: newReport.report, email: newReport.userEmail },
            process.env.PRIVATE_KEY
        );

        res.status(201).json({ 
            success: true, 
            message: 'Report submitted successfully', 
            token, 
            name: newReport.name, 
            report: newReport.report, 
            email: newReport.userEmail 
        });
    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ success: false, message: 'An error occurred while submitting the report' });
    }
};


module.exports = { submitReport,getUserReports };
