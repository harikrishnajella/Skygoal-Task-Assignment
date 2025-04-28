const express = require('express');
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/postController');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .post(authenticate, createPost)
  .get(authenticate, getPosts);

router.route('/:id')
  .put(authenticate, updatePost)
  .delete(authenticate, deletePost);

module.exports = router;
