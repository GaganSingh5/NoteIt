const router = require('express').Router();
const User = require('../models/User.model');

router.route('/').post(async (req, res) => {
  const {
    username,
  } = req.body;
  // const {
  //   email
  // } = req.body;
  const {
    password,
  } = req.body;

  const user = User.find({ username });
  const data = await user.exec();
  console.log(data);
  // const { _id } = user.model.validatePassword;
  if (data[0] && data[0].validatePassword(password)) {
    // const
    const {
      _id,
    } = data[0];
    return res.status(200).json({ _id });
    // return next;
  }
  return res.status(404);
  // return next;
});

module.exports = router;
