const express = require("express");
const router = express.Router();
const verifyToken =require("../middelware/auth")

const {addUser,getUsers,getUserByEmail,updatePlan} = require("../Controllers/subscription")

router.post("/addUser", addUser);
router.get("/getUsers", getUsers); 
router.get("/getUserByEmail", getUserByEmail); 
router.patch("/update", updatePlan); 

module.exports = router;