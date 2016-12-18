/* eslint-disable new-cap */

const router = require('express').Router();
const ensureAuthenticated = require('../middleware/ensure-authenticated');

// Route: /posts
router.get('/',
  ensureAuthenticated,
  (req, res) => {
    res.set('content-type', 'json');
    res.end(JSON.stringify(req.user._json.response));
  }
);

module.exports = router;
