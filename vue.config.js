// 端口不同：使用代理服务器进行跨域
module.exports = {
  devServer: {
    // open表示是否运行时就启动app
    open: true,
    // port表示我们当前vue页面的端口
    port: 8085,
    proxy: {
      // 接口中以api开头的地址（理解为请求网址有/api的），都会通过代理服务器请求
      '/api': {
        // 请求的目标地址
        // target: 'http://134.175.219.100:4000',
        target: 'http://localhost:3000',
        // proxy websockets
        ws: true,
        // 如果请求跨域就需要加上
        changeOrigin: true,
        // 将/api值重写成/，相当于把网址中的api字符隐藏
        pathRewrite: {
          '/api': '/'
        }
      }
    }
  }
};
