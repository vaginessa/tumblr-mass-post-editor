const consumer = require('./consumer');
const TumblrStrategy = require('passport-tumblr').Strategy;

const tumblrStrategy = new TumblrStrategy({
  consumerKey: consumer.key,
  consumerSecret: consumer.secret,
  callbackURL: 'http://localhost:3000/auth/tumblr/callback'
}, (token, tokenSecret, profile, done) => {
  const user = profile._json.response;

  user.token = token;
  user.tokenSecret = tokenSecret;

  return done(null, user);
});

module.exports = tumblrStrategy;
