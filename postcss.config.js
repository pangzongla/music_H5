module.exports = {
  plugins: {
    autoprefixer: {},
    // 添加配置
    'postcss-pxtorem': {
      // 添加根节点的font-size的值
      rootValue: 75,
      // 用什么符号去表示转换为rem值
      propList: ['*']
    }
  }
};
