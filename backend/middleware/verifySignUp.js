const User = require('../models/User.model');

const checkDuplicateEmailOrUsername = async (req, res, next) => {
  const errors = [];
  const {
    username, email,
  } = req.body;

  const userWithUsername = await User.findOne({
    username,
  }).exec();

  if (userWithUsername) {
    errors.push('username');
  }

  const userWithEmail = await User.findOne({
    email,
  }).exec();

  if (userWithEmail) {
    errors.push('email');
  }

  if (errors.length > 0) {
    res.status(409).json({
      statusCode: 409,
      fields: errors,
      description: 'Field/s Already Exists',
    });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmailOrUsername,
};
module.exports = verifySignUp;
