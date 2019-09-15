const express = require('express');
const router = express.Router();
const passport = require ('passport');

router.get('/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/gmail.readonly']
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

router.post('/login', passport.authenticate('local', { failureRedirect: '/login'}), (req, res) => {
  res.redirect('/');
});

module.exports = router;