const express = require('express');
const { MongoClient } = require('mongodb');
const passport = require('passport');
const configurePassport =  require('./config/passport');
const api = require('./routes/api');
const census = require('./routes/census');
const auth = require('./routes/auth');
const path = require('path');

const app = express();

MongoClient.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`,
  { useNewUrlParser: true }).then(client => {

  const db = client.db(process.env.MONGODB_NAME);

  //configurePassport(db);

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, '../client/public')));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use('/auth', auth );
  app.use('/api', api(db) );
  app.use('/census', census() )

});



module.exports = app;