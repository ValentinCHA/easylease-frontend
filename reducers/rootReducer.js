import { combineReducers } from 'redux';
import user from './user';
import scenario from './scenario';
import contrat from './contrat';
import client from './client'

const rootReducer = combineReducers({
  user: user,
  scenario: scenario,
  client: client,
  contrat: contrat,
});

export default rootReducer;
