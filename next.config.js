const webpack = require('webpack');

// zeit system environment variables
const processEnvNowGithubCommitSha = process.env.NOW_GITHUB_COMMIT_SHA;
// custom environment variables
const processEnvVersionHash = process.env.VERSION_HASH;
const versionHash = processEnvNowGithubCommitSha
  || processEnvVersionHash
  || '75EZM9';

module.exports = {
  publicRuntimeConfig: {
    versionHash,
  },
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
