import axios from 'axios';
import {
  GET_PORTFOLIO,
  GET_PROJECT,
  GET_PROFILE,
} from './types';

export const getPortfolio = () => async (dispatch) => {
  const response = await axios.get('/api/genesis');
  const { data } = response;
  dispatch({
    type: GET_PORTFOLIO,
    payload: data.portfolio ? data.portfolio : { error: 'Page not found' }
  });
};

export const getProject = id => async (dispatch) => {
  const response = await axios.get('/api/genesis');
  const { data } = response;
  const item = data.portfolio.filter(items => items.id === parseInt(id, 10));
  dispatch({
    type: GET_PROJECT,
    payload: item.length !== 0 ? item[0] : { error: 'Page not found' }
  });
};

export const getProfile = () => async (dispatch) => {
  const response = await axios.get('/api/genesis');
  const { data } = response;
  dispatch({
    type: GET_PROFILE,
    payload: data.about ? data.about : { error: 'Page not found' }
  });
};
