module.exports = {
  publicPath: process.env.BASE_URL, // 选用history路由时不可使用./等相对路径,否则刷新会造成白页
  devServer: {
    proxy: {
      '/sp': {
        target: 'http://172.20.96.32:8999/sp/',
        changeOrigin: true,
        pathRewrite: {
          '^/sp': ''
        }
      }
    },
    writeToDisk: false // 运行时默认打进内存, 为true时将编译的文件打包进项目文件夹下
  }
};
