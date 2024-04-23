const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('./connection');
const auth = require('./middelware/auth');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const router = express.Router();

const app = express();
const port = 5000;

const { createNewAccounts } = require('./Controllers/accounts');
const accountRoute = require('./Routers/accounts');
const subscriptionRoute = require('./Routers/subscription'); // Correct path
const { addMembership } = require('./Controllers/subscription');

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
app.use('/subscription', subscriptionRoute);
app.use('/accounts', accountRoute);
app.use('/api', router);

router.post('/subscription/addUser', addMembership);

app.post('/accounts/create', createNewAccounts);

app.get('/test', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`);
});
