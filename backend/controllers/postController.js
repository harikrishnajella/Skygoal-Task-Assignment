const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const post = await Post.create({ title, content, userId: req.user._id });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find({ userId: req.user._id });
        res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
};

const updatePost = async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id, userId: req.user._id });
        if (!post) return res.status(404).json({ message: 'Post not found' });

        post.title = req.body.title || post.title;
        post.content = req.body.content || post.content;
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

const deletePost = async (req, res) => {
    try {
        const post = await Post.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
        if (!post) return res.status(404).json({ message: 'Post not found' });
        res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
