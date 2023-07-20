const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/naver_api",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      pathRewrite: {
        "^/naver_api": "/v1/search/blog",
      },
      changeOrigin: true,
    })
  );
};
