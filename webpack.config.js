/* eslint-disable import/no-extraneous-dependencies */

const glob = require('glob')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const pkg = require('./package.json')

const examplesPath = path.resolve(__dirname, 'examples')
const distPath = path.resolve(examplesPath, 'dist')
const examples = glob.sync(path.resolve(examplesPath, '*.js'))
const exampleNames = examples.reduce((acc, e) => {
  acc[e] = path.basename(e, '.js')
  return acc
}, {})

module.exports = {
  mode: 'production',
  entry: examples.reduce((acc, examplePath) => {
    acc[exampleNames[examplePath]] = examplePath
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
        examples: examples.map((example) => exampleNames[example]),
        repoUrl: pkg.repository.url,
        title: `${pkg.name} - Examples`,
      },
    }),
    ...examples.map(
      (e) =>
        new HtmlWebpackPlugin({
          chunks: [exampleNames[e], 'react', 'mathjax'],
          filename: path.resolve(distPath, exampleNames[e], 'index.html'),
          template: path.resolve(examplesPath, 'example.ejs'),
          templateParameters: {
            exampleName: exampleNames[e],
            repoUrl: pkg.repository.url,
            title: `${pkg.name} - ${exampleNames[e]} example`,
          },
        })
    ),
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
