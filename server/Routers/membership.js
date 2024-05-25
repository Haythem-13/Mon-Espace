const express = require("express");
const router = express.Router();
const verifyToken =require("../middelware/")
const { addMembership} = require("../Controllers//membership");




router.post("/addUser", async (req, res, next) => {
    try {
      const { discipline, entryDate } = req.body;
      await addMembership({ discipline, entryDate });
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      next(error);
    }
  });
  

module.exports = router;

