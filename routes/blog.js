/* eslint-disable camelcase, new-cap */

const router = require('express').Router();
const tumblr = require('tumblr.js');
const consumer = require('../helpers/consumer');
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
  (req, res) => {
    const blog = res.locals.blog.blog;
    const posts = res.locals.blog.posts;

    req.session.blogs[blog.name] = posts.map(post => post.id);

    res.render('blog', { blog, posts });
  }
);

// Route: /blog/:blogName
router.get('/:blogName/edit',
  ensureAuthenticated,
  (req, res) => {
    const { blogName } = req.params;
    const state = req.query.state;

    if (state) {
      const tumblrClient = tumblr.createClient({
        consumer_key: consumer.key,
        consumer_secret: consumer.secret,
        token: req.user.token,
        token_secret: req.user.tokenSecret
      });

      req.session.blogs[blogName].forEach(id => {
        tumblrClient.editPost(blogName, { id, state }, (err, data) => {
          if (err) {
            return err;
          }

          return data;
        });
      });
    }

    res.redirect(req.headers.referer);
  }
);

module.exports = router;
