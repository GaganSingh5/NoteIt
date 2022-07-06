const {
  authJwt,
} = require('../../../middleware');
const postsController = require('../../../controller/posts.controller');

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
    '/api/:userId/posts',
    postsController.getPosts,
  );

  app.post(
    '/api/:userId/posts',
    postsController.addPost,
  );

  app.delete(
    '/api/:userId/posts/:postId',
    postsController.deletePost,
  );

  app.put(
    '/api/:userId/posts/:postId',
    postsController.updatePost,
  );
};
