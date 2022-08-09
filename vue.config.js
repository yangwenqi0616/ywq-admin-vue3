module.exports = {
  publicPath: process.env.BASE_URL,
  devServer: {
    proxy: {
      "/sp": {
        target: "http://172.20.96.32:8999/sp/",
        changeOrigin: true,
        pathRewrite: {
          "^/sp": ""
        }
      }
    }
  }
};
