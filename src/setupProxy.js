const { createProxyMiddleware } = require('http-proxy-middleware');

console.log('setupProxy.js');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://loyeco.com:12121/api',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};