import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk';
import PostReducer from './reducers/PostReducer';

const rootReducer = combineReducers({
    PostReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk));