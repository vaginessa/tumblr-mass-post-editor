function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/auth/tumblr');
}

module.exports = ensureAuthenticated;
