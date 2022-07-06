const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

exports.signUp = function (req, res) {
  const {
    username, email, password, firstname, lastname,
  } = req.body;

  const newUser = new User({
    firstname,
    lastname,
    username,
    email,
  });
  newUser.generateHash(password);

  newUser.save()
    .then(() => res.status(201).json({ statusCode: 201, description: 'Sign Up Success', status: 'Created' }))
    .catch(((err) => res.status(500).json({
      statusCode: 500,
      description: 'Error occured will processing request',
      status: 'Internal Server Error',
      error: err,
    })));
};

exports.signIn = async function (req, res) {
  const {
    username, password, email,
  } = req.body;

  let userQuery = {};

  if (username) {
    userQuery = { username };
  } else {
    userQuery = { email };
  }

  const user = User.findOne(userQuery);
  const userData = await user.exec();
  // const { _id } = user.model.validatePassword;
  // console.log(userData + userData.validatePassword(password));
  if (userData && userData.validatePassword(password)) {
    // const
    console.log('here');
    const {
      _id,
    } = userData;

    const token = jwt.sign({
      id: _id,
    }, process.env.SECRET, {
      expiresIn: 86400, // 24 hours
    });
    console.log({
      userId: _id,
      accessToken: token,
      username: userData.username,
      email: userData.email,
    });
    return res.status(200).json({
      userId: _id, accessToken: token, username: userData.username, email: userData.email,
    });
  }
  return res.status(404);
};
