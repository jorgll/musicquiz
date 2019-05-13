import { reducer } from './state';
import { RootAction } from './action'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import { sagaMiddleware, initializeSagas } from './saga'

function configureStore() {
    let middleware = applyMiddleware(sagaMiddleware);
    middleware = composeWithDevTools(middleware);
    
    //@ts-ignore: middleware type mismatch
    const store = createStore(reducer, middleware);
    
    initializeSagas();
    const action = (type: RootAction) => store.dispatch({type});
    return store;
}

export const store = configureStore();