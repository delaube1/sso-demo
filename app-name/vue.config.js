module.exports = {
  publicPath: "/",
  devServer: {
    // 代理
    proxy: {
      '/api': {
        target: "http://localhost:9000/",
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          '^/api': '' // 将/api替换为空
        }
      }
    }
  }
};
