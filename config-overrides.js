module.exports = function override(config, env) {
  // if (env === 'production') {
  //   config.optimization.splitChunks = {
  //     chunks: 'async',
  //     minSize: 20000,
  //     maxSize: 0,
  //     minChunks: 1,
  //     maxAsyncRequests: 30,
  //     maxInitialRequests: 30,
  //     automaticNameDelimiter: '~',
  //     cacheGroups: {
  //       defaultVendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         priority: -10,
  //       },
  //       default: {
  //         minChunks: 2,
  //         priority: -20,
  //         reuseExistingChunk: true,
  //       },
  //     },
  //   };
  // }

  return config;
};
