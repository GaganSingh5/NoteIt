const router = require('express').Router();
const User = require('../models/User.model');

router.route('/').post((req, res) => {
  // const response = {
  //   statusCode: '',
  //   description: '',
  //   error: '',
  // };
  const { username } = req.body;
  const { email } = req.body;
  const { password } = req.body;

  if (typeof username === 'undefined' || typeof email === 'undefined' || typeof password === 'undefined') {
    res.status(400).json({
      statusCode: 400,
      description: 'Invalid Request',
      error: 'Bad Request',
    });
    return;
  }

  try {
    const newUser = new User({
      username,
      email,
    });
    console.log('here');
    newUser.setPassword(password);
    // User.create({ username, email, password })
    newUser.save()
      .then(() => res.status(201).json({
        statusCode: 201,
        description: 'User Created',
        status: 'Created',

      }))
      .catch(((err) => {
        console.log(`err ${err}`);
        res.status(400).json(`Error: ${err}`);
      }));
  } catch (e) {
    console.log(`error: ${e}`);
  }
});

module.exports = router;
