const express = require('express');
const router = express.Router();
const censusVariables = require('../lib/censusVariablesCreation');
/* Connect to my Census files */

const census = () => {
  router.get('/variables', (req, res) => censusVariables.extractKeys(req, res) )
  ;
  router.get('/bivariate', (req, res) => censusVariables.mergeRegionsById(req, res) )
  ;
  router.get('/states', (req, res) => censusVariables.drawStatesMap(req, res) )
  ;
  router.get('/counties', (req, res) => censusVariables.drawCountiesMap(req, res) )
  ;
  return router;
};

module.exports = census;