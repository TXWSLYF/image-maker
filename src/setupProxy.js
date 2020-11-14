const fs = require('fs');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

let proxyArg = process.argv.find((arg) => /proxy/.test(arg));
proxyArg = proxyArg ? proxyArg.split('=')[1] : 'PROD';

module.exports = function (app) {
  let middleware = null;

  if (proxyArg === 'MOCK') {
    middleware = async (req, res, next) => {
      const { method, url } = req;
      const [pathName] = url.split('?');

      const absolutePath = path.resolve(__dirname, `./mock${pathName}.json`);
      console.log(method, pathName, method.toLowerCase(), absolutePath);

      if (fs.existsSync(absolutePath)) {
        // 删除模块缓存
        delete require.cache[absolutePath];
        res.end(JSON.stringify(require(absolutePath)));
      }

      await next();
    };
  }

  if (proxyArg === 'LOCAL') {
    middleware = createProxyMiddleware({
      target: 'http://localhost:8080',
      pathRewrite: {
        '^/api': '/', // remove base path
      },
      changeOrigin: true,
    });
  }

  if (proxyArg === 'PROD') {
    middleware = createProxyMiddleware({
      target: 'http://image-maker.qsxqd.com',
      changeOrigin: true,
    });
  }

  app.use('/api', middleware);
};
