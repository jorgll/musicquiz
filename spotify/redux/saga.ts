import { takeEvery, put } from 'redux-saga/effects';
import { INITIALIZE_SPOTIFY, PLAY_TRACK, actions } from './actions'
import { Service } from '../service'

export class Saga {
    sagas = [ this.initializeSpotify(), this.playTrack() ];
    
    constructor(private readonly service: Service) {
        console.log('Saga constructor called');
    }

    *initializeSpotify() {
        console.log('in the initializeSpotifySaga');
        try {
            yield this.service.initializeSpotify();
            yield put (actions.initializeSpotifyCompleted(true, ''));
        } catch (error) {
            yield put (actions.initializeSpotifyCompleted(false, error.message));
        }
    }

    *playTrack() {
        console.log('in the playTrack saga');
        try {
            yield this.service.playTrack();
        } catch (error) {
            yield put (actions.playTrackError(error.message));
        }
    }
}

const spotifySaga = new Saga(new Service);
export const spotifySagas = [
    ...spotifySaga.sagas,
    takeEvery(INITIALIZE_SPOTIFY, spotifySaga.initializeSpotify),
    takeEvery(PLAY_TRACK, spotifySaga.playTrack)
];