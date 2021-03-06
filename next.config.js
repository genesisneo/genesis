const webpack = require('webpack');

// vercel system environment variables
const processEnvNowGithubCommitSha = process.env.VERCEL_GITHUB_COMMIT_SHA;
const versionHash = processEnvNowGithubCommitSha || '75EZM9';

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
