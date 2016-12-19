/* eslint-disable camelcase */

const tumblr = require('tumblr.js');
const consumer = require('../helpers/consumer');
let tumblrClient = null;

function getAllPosts(req, res, next) {
  const ownsBlog = req.user.user.blogs.some(blog => {
    return blog.name === req.params.blogName;
  });

  if (!ownsBlog) {
    return res.redirect('/');
  }

  tumblrClient = tumblr.createClient({
    consumer_key: consumer.key,
    consumer_secret: consumer.secret,
    token: req.user.token,
    token_secret: req.user.tokenSecret
  });

  getPosts(req.params.blogName).then(data => {
    res.locals.blog = data;

    return next();
  }, reason => {
    console.error('Rejected.');
    console.error(reason);

    return next(reason);
  });
}

function getPosts(blogName, options = { offset: 0 }, accumulator = {}) {
  return new Promise((resolve, reject) => {
    tumblrClient.blogPosts(blogName, options, (err, data) => {
      if (err) {
        reject(err);
      }

      resolve(data);
    });
  }).then(data => {
    let allData = null;

    if (!accumulator.posts) {
      allData = data;
    } else {
      allData = accumulator;
      allData.posts = accumulator.posts.concat(data.posts);
    }

    if (data.posts.length < 20) {
      return allData;
    }

    options.offset += 20;

    return getPosts(blogName, options, allData);
  });
}

module.exports = getAllPosts;
