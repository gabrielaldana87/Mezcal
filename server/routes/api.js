const express = require('express');
const router = express.Router();
const configurePassport =  require('../config/passport');
const callGoogleApi = require('../config/google');
const groupLabelCategories = require('../lib/groupLabelCategories');
const goalData = require('../lib/goalClassifications.json');
const extractMessagesToCreateBoard = require('../lib/extractMessagesToCreateBoard');
const data = require('../lib/goalClassifications');
/* Connect to Google API */

const api = (db) => {
  "use strict";
  router.get('/boards' , (req, res) => callGoogleApi(auth => {
    extractMessagesToCreateBoard(auth, boards => res.send(boards));
  }))
  ;
  router.get('/categories', (req, res) => callGoogleApi( auth => {
    groupLabelCategories(auth, data => res.send(data)) ;
  }))
  ;
  router.get('/user', (req, res) => configurePassport(db, (err, user) => {
    res.send(user);
  }))
  ;
  router.get('/goals/:label_id', (req, res) => {
    const id = req.params.label_id;
    res.send(goalData['goal_classifications'].filter(o => o['id'] === id));
  });
  return router
  ;
};

module.exports = api;