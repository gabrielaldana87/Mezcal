const passport = require ('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const fs = require('fs');
const {google} = require('googleapis');
const Q = require('q');
const callGoogle = require('./google');
const extractMessages = require('../lib/extractMessages');


const configurePassport = (db, cb) => {
  const users = db.collection('users');
  const boards = db.collection('boards');
  const messages = db.collection('messages');

  // passport.serializeUser((user, cb) => {
  //   cb(null, user._id);
  // });
  // passport.deserializeUser((id, cb) => {
  //   users.findOne({ _id: id }).then(user => {
  //     cb(null, user);
  //   });
  // });

  users.findOne({ _id: '118055149103319104270' }).then(user => {
    if (user) {
      // callGoogle(() => extractMessages(oAuth2Client, db, user._id));
      cb(null, user);
    } else {
      throw 'user not found';
    }
  });
};

function extractUserFromGoogle() {
  fs.readFile('credentials.json', (err, content) => {
    if(err) return console.log('Error loading client secret file:', err);
    const
      credentials = JSON.parse(content),
      {client_secret, client_id, redirect_uris} = credentials.installed,
      oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]),
      TOKEN_PATH = 'token.json'
      ;
    fs.readFile(TOKEN_PATH, (err, token) => {
      if (err) return 'err';
      oAuth2Client.setCredentials(JSON.parse(token));
      getGoogleAccountFromCode(oAuth2Client)
        .then(profile => {
          users.findOne({ _id: profile.id }).then(user => {
            if (user) {
              return user;
              // callGoogle(() => extractMessages(oAuth2Client, db, user._id));
              // cb(null, user);
            } else {
              const newUser = {
                _id: profile.id,
                displayName: profile.displayName,
                name: profile.name,
                imageUrl: profile.image.url
              };
              users.insertOne(newUser).then(() => {
                console.log('here')
              });
            }
          });
        });
    });
  });
}

function getGooglePlusApi(auth) {
  return google.plus({ version: 'v1', auth });
}

function getGoogleGmailApi(auth) {
  return google.gmail({version: 'v1', auth });
}

function getGoogleAccountFromCode(auth) {
  const deferred = Q.defer();
  const plus = getGooglePlusApi(auth);
  const me = plus.people.get({ userId: 'me' }, (err, res) => {
    if (err) return console.error('The API returned an error: ' + err);
    const data = res.data;
    deferred.resolve(data);
  })
  ;
  return deferred.promise;
}

module.exports = configurePassport;