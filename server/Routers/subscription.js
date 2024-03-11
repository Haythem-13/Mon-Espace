const express = require("express");
const router = express.Router();
const verifyToken =require("../middelware/auth")

const {addUser,getUsers,getUserByEmail,updatePlan} = require("../Controllers/subscription")

router.post("/addUser", async (req, res) => {
    try {
      const result = await addUser(req.body);
      res.send(result);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).send({ msg: "An error occurred", error: error.message });
    }
  });
  
  
  router.post("/getUsers", async (req, res) => {
    try {
      const result = await getUsers();
      res.send(result);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).send({ msg: "An error occurred", error: error.message });
    }
  });
  
  router.post('/getUserByEmail', async (req, res) => {
    try {
      const result = await getUserByEmail(req.body.email);
      res.send(result);
    } catch (error) {
      console.error("Error getting user by email:", error);
      res.status(500).send({ msg: "An error occurred", error: error.message });
    }
  });
  
  router.post('/updatePlan', async (req, res) => {
    try {
      const { email, newPlan } = req.body;
      const result = await updatePlan(email, newPlan);
      res.send(result);
    } catch (error) {
      console.error("Error updating user plan:", error);
      res.status(500).send({ msg: "An error occurred", error: error.message });
    }
  });
  


module.exports = router;