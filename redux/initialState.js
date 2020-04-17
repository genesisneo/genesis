const { VERSION_HASH } = process.env;
const {
  siteName,
  siteDescription,
  siteDomain,
  imagePlaceholder,
} = require('../config.json');

const initialState = {
  global: {
    siteName,
    siteDescription,
    siteDomain,
    imagePlaceholder,
    versionHash: VERSION_HASH || '75EZM9',
  },
  portfolio: [],
  profile: {},
  project: {},
};

export default initialState;
