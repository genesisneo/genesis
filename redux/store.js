import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxThunk from 'redux-thunk';
import reducer from './reducers';

const reduxStore = (initialState) => createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

export default reduxStore;
