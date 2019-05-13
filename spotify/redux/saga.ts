import { put, call, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SPOTIFY, PLAY_TRACK, actions } from './actions'
import { Service } from '../service'

export class Saga {
    sagas = [ this.watchInitializeSpotify(), this.watchPlayTrack() ];
    
    constructor(private readonly service: Service) {
        console.log('Saga constructor called');
    }

    *watchInitializeSpotify() {
        yield takeEvery(INITIALIZE_SPOTIFY, this.initializeSpotify.bind(this));
    }

    *watchPlayTrack() {
        yield takeEvery(PLAY_TRACK, this.playTrack.bind(this));
    }

    *initializeSpotify() {
        try {
            yield this.service.initializeSpotify();
            yield put (actions.initializeSpotifyCompleted(true, ''));
        } catch (error) {
            yield put (actions.initializeSpotifyCompleted(false, error.message));
        }
    }

    *playTrack() {
        try {
            yield this.service.playTrack();
        } catch (error) {
            yield put (actions.playTrackError(error.message));
        }
    }
}

const spotifySaga = new Saga(new Service);
export const spotifySagas = [
    ...spotifySaga.sagas
];