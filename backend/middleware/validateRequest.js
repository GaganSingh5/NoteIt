const { body, validationResult } = require('express-validator');

const validateSignUpRequest = () => [
  body('username')
    .exists()
    .trim()
    .not()
    .isEmpty(),
  body('email')
    .exists()
    .trim()
    .not()
    .isEmpty()
    .isEmail(),
  body('password')
    .exists()
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .matches('^[a-zA-Z0-9!@#$%^&*]'),
];

const validationGaurd = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({
    [err.param]: err.msg,
  }));

  return res.status(400).json({
    statusCode: 400,
    description: 'Invalid Request',
    status: 'Bad Request',
  });
};
const validateRequest = {
  validateSignUpRequest,
  validationGaurd,
};
module.exports = validateRequest;
