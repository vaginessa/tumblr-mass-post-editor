const consumer = require('./consumer');
const TumblrStrategy = require('passport-tumblr').Strategy;

const tumblrStrategy = new TumblrStrategy({
  consumerKey: consumer.key,
  consumerSecret: consumer.secret,
  callbackURL: 'http://localhost:3000/auth/tumblr/callback'
}, (_token, _tokenSecret, profile, done) => {
  return done(null, profile);
});

module.exports = tumblrStrategy;
