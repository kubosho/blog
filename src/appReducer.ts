import { combineReducers } from 'redux';
import { topReducer } from './Page/Top/topReducer';

export const appReducer = combineReducers({ topState: topReducer });
