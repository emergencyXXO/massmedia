import { applyMiddleware, createStore } from 'redux';
import combineReducers from 'redux/src/combineReducers';
import thunkMiddleware from 'redux-thunk';
import { logger } from 'redux-logger';

import CreateNote from '../modules/CreateNote/reducers';

let reducers = combineReducers({
	CreateNote,
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));

window.store = store;

export default store;
