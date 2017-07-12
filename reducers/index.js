import { combineReducers } from 'redux';
import markers from './markers';
import aerostagrams from './aerostagrams';

const AerostApp = combineReducers({
  markers,
  aerostagrams,
})

export default AerostApp;
