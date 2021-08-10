const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://c3120.herokuapp.com',
      changeOrigin: true,
    })
  );
};