const express = require('express');
require('dotenv').config();
const connection = require('./connection');
// const auth = require('./middelware/auth');

connection();
const app = express();
const port = 5000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

const accountRoute = require('./Routers/accounts');

const { createNewAccounts } = require('./Controllers/accounts');
// const { getAllAccounts } = require('./Controllers/Allusers');
app.post('/accounts/create', createNewAccounts);
// app.get('/accounts/getAll', getAllAccounts);


app.listen(port, () => {
    console.log(`Server start listening on port ${port}`);
  });
  