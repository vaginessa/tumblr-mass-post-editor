/* eslint-disable new-cap */

const router = require('express').Router();
const ensureAuthenticated = require('../middleware/ensure-authenticated');

// Route: /
router.get('/',
  ensureAuthenticated,
  (req, res, _next) => {
    if (!req.session.blogs) {
      req.session.blogs = {};
    }

    const user = req.user.user;

    res.render('index', { user });
  }
);

module.exports = router;
