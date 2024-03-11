const express = require("express");
const router = express.Router();
const verifyToken =require("../middelware/auth")
const { getAllAccounts, createNewAccounts, login , } = require("../Controllers/accounts");

router.post("/login", login);
router.post("/create", createNewAccounts); 
router.get("/", getAllAccounts);


module.exports = router;