const quotesController = require('../../../controller/quotes.controller');

module.exports = function (app) {
  app.use((req, res, next) => {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept',
    );
    next();
  });
  // app.get('/api/:userId/posts', [authJwt.verifyJWT], postController.getPosts);
  app.get(
    '/api/quote/today',
    quotesController.getQuote,
  );
};
