const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The Name is required'],
    },
    userEmail: {
        type: String,
        required: [true, 'The Name is required'],
    },
    report: {
        type: String,
        required: [true, 'report is required'],
        minlength: [30, 'report must be at least 30 characters long'],
    },
});

const ReportModel = mongoose.model('Report', reportSchema);

module.exports = ReportModel;