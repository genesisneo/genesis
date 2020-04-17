const webpack = require('webpack');

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(eot|woff?2|ttf|otf|svg|png|jpe?g|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 100000,
        },
      },
    });
    config.plugins.push(
      new webpack.ProvidePlugin({
        'window.lazysizes': 'lazysizes',
      }),
    );
    return config;
  },
};
