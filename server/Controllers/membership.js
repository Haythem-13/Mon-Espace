const jwt = require('jsonwebtoken');
const Member = require("../models/membership"); 

const addMembership = async ({ email, discipline, entryDate }) => {
    if ( !discipline || !entryDate) {
      throw new Error('Missing data, please provide new values');
    }
  
    try {
      const currentDate = new Date();
      const id = Date.now().toString(); 
      const newMember = new Member({ // Change variable name to avoid conflict
        id,
        email,
        discipline,
        entryDate,
        expiryDate: currentDate.setMonth(currentDate.getMonth() + 1), 
      });
      const result = await newMember.save(); // Use newMember instead of Member
      return result;
    } catch (error) {
      console.error('Error adding member:', error);
      throw error;
    }
  };
  

  module.exports = { addMembership };
