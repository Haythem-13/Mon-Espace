const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const connection = require('./connection');
const session = require('express-session');
const MemoryStore = require('memorystore')(session);
const accountRoute = require('./Routers/accounts');
const subscriptionRoute = require('./Routers/subscription');
const reportRoute = require('./Routers/report');
const { submitReport } = require('./Controllers/report');
const { addMembership } = require('./Controllers/subscription');
const { createNewAccount } = require('./Controllers/accounts');

const app = express();
const port = 5000;

// Middleware setup
app.use(cors());
app.use(express.json()); // Body parser middleware for JSON
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
app.use(cors());
app.use('/report', reportRoute);
app.use('/subscription', subscriptionRoute);
app.use('/accounts', accountRoute);

app.post('/subscription/addUser', addMembership);
app.post('/report/submit', submitReport);
app.post('/accounts/create', createNewAccount);

app.get('/test', (req, res) => {
  res.send('Server is up and running!');
});

app.listen(port, () => {
  console.log(`Server start listening on port ${port}`);
});
