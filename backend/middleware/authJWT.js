const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
  const response = {
    statusCode: '000',
    description: '',
    error: '',
  };

  const token = req.headers['x-access-token'];

  if (!token) {
    response.statusCode = 401;
    response.description = 'No JWT has been provided in request';
    response.error = 'Unauthorized';
  } else {
    jwt.verify(token, process.env.SECRET, (err, decode) => {
      if (err) {
        response.statusCode = 401;
        response.description = 'Jwt Provided is Invalid';
        response.error = 'Unauthorized';
      } else {
        req.userId = decode.id;
        next();
      }
    });
  }

  return res.status(401).json(response);
};

const authJwt = {
  verifyJWT,
};
module.exports = authJwt;
