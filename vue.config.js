module.exports = {
  publicPath: process.env.BASE_URL,
  devServer: {
    proxy: process.env.VUE_APP_PROXY // 代理到测试服务器
  }
};
