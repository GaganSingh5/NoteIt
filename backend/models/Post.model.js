const mongoose = require('mongoose');

const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "can't be blank"],
  },
  content: {
    type: String,
    required: [true, "can't be blank"],
  },
  coverUrl: {
    type: String,
  },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
