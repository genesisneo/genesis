import getConfig from 'next/config';

const {
  publicRuntimeConfig,
} = getConfig();
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
    versionHash: publicRuntimeConfig.versionHash.length > 5
      ? publicRuntimeConfig.versionHash.substring(0, 5)
      : publicRuntimeConfig.versionHash,
  },
  portfolio: [],
  profile: {},
  project: {},
};

export default initialState;
