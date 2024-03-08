const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('./connection');
const auth = require('./middelware/auth');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();
const port = 5000;

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    }),
  })
);

connection();

app.use(express.json());

const cors = require('cors');
app.use(cors());

const accountRoute = require('./Routers/accounts');

app.use('/accounts', accountRoute); // Use the accountRoute middleware

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`);
});
