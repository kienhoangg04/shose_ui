const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'https://kien-api-shose.onrender.com',
            changeOrigin: true,
        }),
    );
};
