import axios from 'axios';
import {
  GET_PORTFOLIO,
  GET_PROJECT,
  GET_PROFILE,
  GET_PORTFOLIO_BY_TAGS,
  GET_PORTFOLIO_BY_TECHNOLOGY,
} from './types';

export const getPortfolio = (domain) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') === 0 ? 'http://' : 'https://';
  await axios.get(`${protocol}${domain}/api`)
    .then(
      ({ data }) => dispatch({
        type: GET_PORTFOLIO,
        payload: data.portfolio.sort(() => Math.random() - 0.5),
      }),
    )
    .catch(
      () => dispatch({
        type: GET_PORTFOLIO,
        payload: { error: 'Page not found' },
      }),
    );
};

export const getProject = (domain, slug) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') === 0 ? 'http://' : 'https://';
  await axios.get(`${protocol}${domain}/api`)
    .then(
      ({ data }) => {
        const item = data.portfolio
          .filter((items) => items.slug === slug);
        const portfolio = data.portfolio
          .filter((items) => items.slug !== slug);

        return dispatch({
          type: GET_PROJECT,
          payload: {
            project: item[0],
            portfolio: portfolio.sort(() => Math.random() - 0.5),
          },
        });
      },
    )
    .catch(
      () => dispatch({
        type: GET_PROJECT,
        payload: { error: 'Page not found' },
      }),
    );
};

export const getProfile = (domain) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') === 0 ? 'http://' : 'https://';
  await axios.get(`${protocol}${domain}/api`)
    .then(
      ({ data }) => dispatch({
        type: GET_PROFILE,
        payload: data.profile,
      }),
    )
    .catch(
      () => dispatch({
        type: GET_PROFILE,
        payload: { error: 'Page not found' },
      }),
    );
};

export const getPortfolioByTags = (domain, key) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') === 0 ? 'http://' : 'https://';
  await axios.get(`${protocol}${domain}/api`)
    .then(
      ({ data }) => {
        const items = data.portfolio
          .filter((item) => item.tags.includes(key));

        return dispatch({
          type: GET_PORTFOLIO_BY_TAGS,
          payload: items,
        });
      },
    )
    .catch(
      () => dispatch({
        type: GET_PORTFOLIO_BY_TAGS,
        payload: { error: 'Page not found' },
      }),
    );
};

export const getPortfolioByTechnology = (domain, key) => async (dispatch) => {
  const protocol = domain.indexOf('localhost') === 0 ? 'http://' : 'https://';
  await axios.get(`${protocol}${domain}/api`)
    .then(
      ({ data }) => {
        const items = data.portfolio
          .filter((item) => item.technology.includes(key));

        return dispatch({
          type: GET_PORTFOLIO_BY_TECHNOLOGY,
          payload: items,
        });
      },
    )
    .catch(
      () => dispatch({
        type: GET_PORTFOLIO_BY_TECHNOLOGY,
        payload: { error: 'Page not found' },
      }),
    );
};
