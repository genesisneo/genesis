const {
  siteName,
  siteDescription,
  siteDomain,
  imagePlaceholder,
} = require('../config.json');

// zeit system environment variables
const processEnvNowGithubCommitSha = process.env.NOW_GITHUB_COMMIT_SHA;
// custom environment variables
const processEnvVersionHash = process.env.VERSION_HASH;
const versionHash = processEnvNowGithubCommitSha
  || processEnvVersionHash
  || '75EZM9';

const initialState = {
  global: {
    siteName,
    siteDescription,
    siteDomain,
    imagePlaceholder,
    versionHash,
  },
  portfolio: [],
  profile: {},
  project: {},
};

export default initialState;
