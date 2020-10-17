module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',

    // 老师习惯的方式，从这
    // 对象字面量项尾不能有逗号
    'comma-dangle': [2,'never'],
    // 可以给参数重新赋值
    'no-param-reassign': 0,
    // 允许全局用require
    'global-require': 0,
    // 关闭换行风格检测
    'linebreak-style': 0,
    'indent': 'off',
    // 防止'xxx'：bianliang 这种形式报错
    "quote-props":[0, "always"],
    'vue/script-indent': [
      'error',
      2,
      {
        'baseIndent': 1
      }
    ],
    'max-len': ['error', {code: 300}]
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
// 到这



};
