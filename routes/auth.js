/* eslint-disable new-cap */

const router = require('express').Router();
const passport = require('passport');

// Route: /auth/tumblr
router.get('/tumblr',
  passport.authenticate('tumblr'),
  (_req, res) => {
    res.redirect('/');
  }
);

// Route: /auth/tumblr/callback
router.get('/tumblr/callback',
  passport.authenticate('tumblr', { failureRedirect: '/login' }),
  (_req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
