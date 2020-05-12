import getConfig from 'next/config';

const {
  publicRuntimeConfig: {
    versionHash,
  },
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
    versionHash,
  },
  portfolio: [],
  profile: {},
  project: {},
};

export default initialState;
