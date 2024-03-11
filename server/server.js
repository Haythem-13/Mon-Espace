const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('./connection');
const auth = require('./middelware/auth');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);

const app = express();
const port = 5000;

const { createNewAccounts } = require('./Controllers/accounts');
const accountRoute = require('./Routers/accounts');
const subscriptionRoute = require('./Routers/subscription'); // Correct path
const { addUser } = require('./Controllers/subscription');

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
  })
);

connection();

app.use(express.json());

const cors = require('cors');
app.use(cors());

app.post('/accounts/create', createNewAccounts);

app.use('/accounts', accountRoute);
app.use('/subscription', subscriptionRoute);
app.post('/subscription/addUser', addUser); // Correct path

app.get('/test', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`);
});
