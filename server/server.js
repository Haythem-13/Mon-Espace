const express = require('express');
require('dotenv').config();
const connection = require('./connection');
const auth = require('./middelware/auth');

connection();
const app = express();
const port = 5000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

const accountRoute = require('./Routers/accounts');

const { createNewAccounts } = require('./Controllers/accounts');
const { getAllUsersHistory } = require('./Controllers/bankHistory');
app.post('/accounts/create', createNewAccounts);
app.get('/bankhistory', getAllUsersHistory); 

app.listen(port, () => {
    console.log(`Server start listening on port ${port}`);
  });
  