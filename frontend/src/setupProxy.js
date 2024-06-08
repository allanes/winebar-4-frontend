const { createProxyMiddleware } = require('http-proxy-middleware');

const backendPort = process.env.REACT_APP_BACKEND_INTERNAL_PORT || 5000;
const nginxPort = process.env.REACT_APP_NGINX_PORT || 8000;

module.exports = function (app) {
  app.use(
    '/backend',
    createProxyMiddleware({
      target: `http://127.0.0.1:${backendPort}`,
      changeOrigin: true,
    })
  );
  app.use(
    '/descargas',
    createProxyMiddleware({
      target: `http://127.0.0.1:${nginxPort}`,
      changeOrigin: true,
    })
  );
};
