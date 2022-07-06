const {
  verifySignUp,
  validateRequest,
} = require('../../../middleware');
const controller = require('../../../controller/auth.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  // app.post(
  //   '/api/auth/signup',
  //   [
  //     validateRequest.validateSignUpRequest(),
  //     validateRequest.validationGaurd,
  //     verifySignUp.checkDuplicateEmailOrUsername,
  //   ],
  //   controller.signUp,
  // );
  app.post(
    '/api/auth/signup',
    controller.signUp,
  );
  app.post('/api/auth/signin', controller.signIn);
};
