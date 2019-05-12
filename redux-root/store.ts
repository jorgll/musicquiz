import { reducer } from './state';
import { RootAction } from './action'
import { createStore, applyMiddleware } from 'redux';
import composeWithDevTools from 'remote-redux-devtools';
import { sagaMiddleware, initializeSagas } from './saga'

//@ts-ignore: devToolsEnhancer() fails type checks
export const store = createStore(reducer, applyMiddleware(sagaMiddleware));
initializeSagas();
const action = (type: RootAction) => store.dispatch({type});