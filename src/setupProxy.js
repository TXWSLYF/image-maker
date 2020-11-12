// const fs = require('fs');
// const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // app.use('/api', async (req, res, next) => {
  //   const { method, url } = req;
  //   const [pathName] = url.split('?');

  //   const absolutePath = path.resolve(__dirname, `./mock${pathName}.json`);
  //   console.log(method, pathName, method.toLowerCase(), absolutePath);

  //   if (fs.existsSync(absolutePath)) {
  //     // 删除模块缓存
  //     delete require.cache[absolutePath];
  //     res.end(JSON.stringify(require(absolutePath)));
  //   }

  //   await next();
  // });
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/', // remove base path
      },
    }),
  );
};
