const path = require('path')

module.exports = (name) => ({
  mode: 'development',
  entry: {
    [name]: path.resolve(__dirname, name, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, name, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              rootMode: 'upward',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, '..', 'node_modules', 'react'),
    },
    extensions: ['*', '.js'],
  },
})
