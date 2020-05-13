import axios from 'axios';
import {
  GET_PORTFOLIO,
  GET_PROJECT,
  GET_PROFILE,
  GET_PORTFOLIO_BY_TAGS,
  GET_PORTFOLIO_BY_TECHNOLOGY,
} from './types';

export const getPortfolio = (domain) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  const { data } = await axios.get(`${protocol}${domain}/api`);
  return dispatch({
    type: GET_PORTFOLIO,
    payload: data.portfolio
      ? data.portfolio.sort(() => Math.random() - 0.5)
      : { error: 'Page not found' },
  });
};

export const getProject = (domain, slug) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  const { data } = await axios.get(`${protocol}${domain}/api`);
  const item = data.portfolio
    .filter((items) => items.slug === slug);
  return dispatch({
    type: GET_PROJECT,
    payload: item.length !== 0
      ? item[0]
      : { error: 'Page not found' },
  });
};

export const getProfile = (domain) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  const { data } = await axios.get(`${protocol}${domain}/api`);
  return dispatch({
    type: GET_PROFILE,
    payload: data.about
      ? data.about
      : { error: 'Page not found' },
  });
};

export const getPortfolioByTags = (domain, key) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  const { data } = await axios.get(`${protocol}${domain}/api`);
  const items = data.portfolio
    .filter((item) => item.tags.includes(key));
  return dispatch({
    type: GET_PORTFOLIO_BY_TAGS,
    payload: items.length !== 0
      ? items
      : { error: 'Page not found' },
  });
};

export const getPortfolioByTechnology = (domain, key) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') !== -1 ? 'http://' : 'https://';
  const { data } = await axios.get(`${protocol}${domain}/api`);
  const items = data.portfolio
    .filter((item) => item.technology.includes(key));
  return dispatch({
    type: GET_PORTFOLIO_BY_TECHNOLOGY,
    payload: items.length !== 0
      ? items
      : { error: 'Page not found' },
  });
};
