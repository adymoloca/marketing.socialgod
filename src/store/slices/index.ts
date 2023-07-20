import { combineReducers } from '@reduxjs/toolkit';
import utilsReducer from './utils';
import routesReducer from './routes';

export const rootReducer = combineReducers({
	utils: utilsReducer,
	routes: routesReducer,
});
