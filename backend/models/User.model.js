const mongoose = require('mongoose');
const crypto = require('crypto');

const {
  Schema,
} = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    lowercase: true,
    unique: false,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  lastname: {
    type: String,
    lowercase: true,
    unique: false,
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
  },
  username: {
    type: String,
    lowercase: true,
    unique: [true, "should be unique"],
    required: [true, "can't be blank"],
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
    index: true,
  },
  email: {
    type: String,
    lowercase: true,
    unique: [true, "should be unique"],
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
  },
  bio: String,
  image: String,
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  }],
  hash: String,
  salt: String,
}, {
  timestamps: true,
});

userSchema.methods.generateHash = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

userSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

const Post = mongoose.model('User', userSchema);

module.exports = Post;
