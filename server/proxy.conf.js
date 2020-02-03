const proxy = [
    {
      context: '/api',
      target: 'http://localhost:3000',
      secure: false,
      logLever: 'debug',
      pathRewrite: {'^/api' : ''}
    }
  ];
  module.exports = proxy;