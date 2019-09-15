const express = require('express');
const router = express.Router();
const gmail = require('../index');
const configurePassport =  require('../config/passport');
/* Connect to Google API */

const api = (db) => {
  "use strict";
  router.get('/boards' , (req, res) => gmail((err, boards) => {
    res.send(boards);
  }));
  router.get('/user', (req, res) => configurePassport(db, (err, user) => {
    res.send(user);
  }));
  return router
  ;
};


module.exports = api;