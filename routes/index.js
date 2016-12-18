/* eslint-disable new-cap */

const router = require('express').Router();
const ensureAuthenticated = require('../middleware/ensure-authenticated');

// Route: /
router.get('/',
  ensureAuthenticated,
  (req, res, _next) => {
    const user = req.user._json.response.user;

    res.render('index', { user });
  }
);

module.exports = router;
