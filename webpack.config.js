const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;
const isProd = NODE_ENV === 'production';
const outputDirectory = `${__dirname}/build`;

module.exports = {
  mode: NODE_ENV,
  devtool: isProd ? false : 'inline-source-map',
  entry: ['babel-polyfill', './frontend/'],
  output: {
    path: outputDirectory,
    filename: 'genesis.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins() {
                return [autoprefixer];
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                `${__dirname}/frontend/styles`
              ]
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
      {
        test: /\.(eot|svg|ttf|woff2?|otf)$/,
        use: 'file-loader'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 3000,
    open: true,
    proxy: [{
      context: [
        '/api',
        '/images',
        '/resize',
      ],
      target: 'http://localhost:8080',
    }]
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
    new HtmlWebpackPlugin({
      template: './frontend/views/index.html',
      favicon: './frontend/static/images/favicon.png',
      meta: {
        author: 'Genesis Mallorca Obtera',
        description: 'Product Designer and Developer',
        'format-detection': 'telephone=no',
        'x-ua-compatible': { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
        keywords: 'genesis, mallorca, obtera, web, product, design, develop, ui, ux, user, interface, experience',
        viewport: 'width=device-width, initial-scale=1, user-scalable=1, minimum-scale=1, maximum-scale=1, minimal-ui',
      }
    })
  ]
};
