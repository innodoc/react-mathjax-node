module.exports = {
  presets: [['@babel/env', { modules: false }], '@babel/react'],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  env: {
    cjs: {
      presets: ['@babel/env', '@babel/react'],
    },
  },
}
