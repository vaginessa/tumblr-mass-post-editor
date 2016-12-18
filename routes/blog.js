/* eslint-disable new-cap */

const router = require('express').Router();
const ensureAuthenticated = require('../middleware/ensure-authenticated');
const getAllPosts = require('../middleware/get-all-posts');

// Router: /blog
router.get('/', (_req, res) => {
  res.redirect('/');
});

// Route: /blog/:blogName
router.get('/:blogName',
  ensureAuthenticated,
  getAllPosts,
  (_req, res) => {
    res.render('blog', {
      blog: res.locals.blog.blog,
      posts: res.locals.blog.posts
    });
  }
);

module.exports = router;
