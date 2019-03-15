import { createStore } from 'redux';
import { appReducer } from './appReducer';

export const appStore = () => createStore(appReducer);
