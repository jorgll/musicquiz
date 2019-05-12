import { spotifySagas } from '../spotify/redux'
import { all } from 'redux-saga/effects'
import createSagaMiddleware from 'redux-saga';

class RootSaga {
    *sagas(): any {
        yield all ([
            ...spotifySagas
        ]);
    }
}

export const sagaMiddleware = createSagaMiddleware();
export function initializeSagas() {
    const rootSaga = new RootSaga();
    sagaMiddleware.run(rootSaga.sagas);    
}