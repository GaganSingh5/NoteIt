const Post = require('../models/Post.model');
const User = require('../models/User.model');

exports.getPosts = async function (req, res) {
  const { userId } = req.params;
  const result = {
    status: 200,
    posts: [],
  };
  const postsRefs = await User.findOne({
    _id: userId,
  }, {
    posts: 1,
  }).exec();

  if (postsRefs.posts.length > 0) {
    const postsData = await Post.find({
      _id: {
        $in: postsRefs.posts,
      },
    }).exec();
    result.posts = postsData;
  }

  return res.status(result.status).json({
    posts: result.posts,
  });
};

exports.addPost = async function (req, res) {
  const result = {
    status: 400,
    error: null,
    description: '',
  };

  const {
    title, content, coverUrl,
  } = req.body;

  const {
    userId,
  } = req.params;

  const newPost = new Post({
    title,
    content,
    coverUrl,
  });

  try {
    const postAdded = await newPost.save();
    const postId = postAdded._id;

    if (postAdded) {
      const postRefAdded = await User.updateOne({
        _id: userId,
      }, {
        $push: {
          posts: postId,
        },
      }).exec();
      if (postRefAdded) {
        result.status = 201;
        result.description = 'Post Created';
      }
    }
  } catch (err) {
    result.status = 500;
    result.description = 'Unexpected Error from backend';
    result.error = err;
  }
  return res.status(result.status).json({
    statusCode: result.status,
    description: result.description,
    error: result.error,
  });
};

exports.deletePost = async function (req, res) {
  const {
    userId,
    postId,
  } = req.params;

  Post.deleteOne({ _id: postId }).then(() => {
    User.updateOne({
      _id: userId,
    }, {
      $pull: {
        posts: { $eq: postId },
      },
    }).then(() => res.status(204).json({
      statusCode: '204',
      description: 'Post Deleted Successfully',
      status: 'No Content',
    })).catch((err) => res.status(500).json({
      statusCode: '500',
      description: 'Unexpected error occured while deleting post',
      status: 'Internal Server Error',
      error: err,
    }));
  }).catch((err) => res.status(500).json({
    statusCode: '500',
    description: 'Unexpected error occured while deleting post',
    status: 'Internal Server Error',
    error: err,
  }));
};

exports.updatePost = async function (req, res) {
  const {
    postId,
  } = req.params;

  const {
    title,
    content,
    coverUrl,
  } = req.body;

  Post.updateOne({
    _id: postId,
  }, {
    title,
    content,
    coverUrl,
  }).then(() => res.status(204).json({
    statusCode: '204',
    description: 'Post Updated Successfully',
    status: 'No Content',
  }));
};
