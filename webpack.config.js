/* eslint-disable import/no-extraneous-dependencies */

const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const getEntryName = (entry) => path.basename(entry, '.js')
const examplesPath = path.resolve(__dirname, 'examples')
const distPath = path.resolve(examplesPath, 'dist')
const examples = glob.sync(path.resolve(examplesPath, '*.js'))

module.exports = {
  mode: 'production',
  entry: examples.reduce((acc, examplePath) => {
    acc[getEntryName(examplePath)] = examplePath
    return acc
  }, {}),
  output: {
    path: distPath,
    filename: path.join('[name]', 'bundle.js'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunks: [],
      filename: path.resolve(distPath, 'index.html'),
      template: path.resolve(examplesPath, 'index.ejs'),
      templateParameters: {
        examples: examples.map((example) => getEntryName(example)),
        title: 'react-mathjax-node - Examples',
      },
    }),
    ...examples.map((e) => {
      const entryName = getEntryName(e)
      return new HtmlWebpackPlugin({
        chunks: [entryName, 'react', 'mathjax'],
        filename: path.resolve(distPath, entryName, 'index.html'),
        template: path.resolve(examplesPath, 'example.ejs'),
        templateParameters: {
          title: `react-mathjax-node - ${entryName} example`,
        },
      })
    }),
  ],
  resolve: {
    extensions: ['*', '.js'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 100 * 1024,
      cacheGroups: {
        mathjax: {
          filename: 'mathjax.bundle.js',
          name: 'mathjax',
          test: /[\\/]node_modules[\\/]mathjax-full[\\/]/,
        },
        react: {
          filename: 'react.bundle.js',
          name: 'react',
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
        },
      },
    },
  },
}
