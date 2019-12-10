module.exports = (api) => {
  const config = {
    presets: [['@babel/env', { modules: false }], '@babel/react'],
    plugins: ['@babel/plugin-syntax-dynamic-import'],
    env: {
      cjs: {
        presets: ['@babel/env', '@babel/react'],
      },
    },
  }
  if (api.env('test')) {
    config.presets[0][1].modules = 'auto'
    config.presets[0][1].targets = { node: 'current' }
  }
  return config
}
