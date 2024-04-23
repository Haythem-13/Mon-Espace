const express = require("express");
const router = express.Router();
const verifyToken =require("../middelware/auth")

const {addMembership,getUsers,getUserByEmail,updatePlan} = require("../Controllers/subscription")

router.post("/addUser", async (req, res, next) => {
    try {
      const { discipline, entryDate, email } = req.body;
      await addMembership({ discipline, entryDate, email});
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      next(error);
    }
  });
  
  router.get("/getUsers", getUsers); 
router.get("/getUserByEmail", getUserByEmail); 
router.patch("/update", updatePlan); 

module.exports = router;