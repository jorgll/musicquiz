import { put, takeEvery } from 'redux-saga/effects';
import { INITIALIZE_SPOTIFY, PLAY_TRACK, actions, GET_MY_TRACKS, STOP_PLAYBACK } from './actions'
import { Service } from '../service'
import { PlaybackState, LibraryTracks } from '../model';
import { eventChannel, END } from 'redux-saga';

export class Saga {
    sagas = [ 
        this.watchInitializeSpotify(), 
        this.watchPlayTrack(), 
        this.watchPlayackStateChanged(), 
        this.watchStopPlayback(),
        this.watchGetMyTracks()
    ];
    
    constructor(private readonly service: Service) {
        console.log('Saga constructor called');
    }

    *watchInitializeSpotify() {
        yield takeEvery(INITIALIZE_SPOTIFY, this.initializeSpotify.bind(this));
    }

    *watchPlayTrack() {
        yield takeEvery(PLAY_TRACK, this.playTrack.bind(this));
    }

    *watchPlayackStateChanged() {
        const playbackStateChangedEventChannel = this.createPlaybackEventChannel();
        yield takeEvery(playbackStateChangedEventChannel, this.playbackStateChanged.bind(this));
    }

    *watchStopPlayback() {
        yield takeEvery(STOP_PLAYBACK, this.stopPlayback.bind(this));
    }

    *watchGetMyTracks() {
        yield takeEvery(GET_MY_TRACKS, this.getMyTracks.bind(this));
    }

    createPlaybackEventChannel(): any {
        return eventChannel(emitter => {
            
            const playbackStateChanged = (event: PlaybackState) => {
                if (event) {
                    emitter(event);
                } else {
                    emitter (END);
                }
            }

            this.service.registerEventHandler('play', playbackStateChanged);
            this.service.registerEventHandler('pause', playbackStateChanged);
            this.service.registerEventHandler('trackChange', playbackStateChanged);
            this.service.registerEventHandler('metadataChange', playbackStateChanged);
            this.service.registerEventHandler('contextChange', playbackStateChanged);

            return () => {
                this.service.removeAllEventHandlers();
            }
        });
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

    *stopPlayback() {
        try {
            yield this.service.stopPlayback();
        } catch (error) {
            yield put (actions.playTrackError(error.message));
        }
    }

    *getMyTracks() {
        try {
            const libraryTracks: LibraryTracks = yield this.service.getMyTracks();
            yield put (actions.getMyTracksCompleted(libraryTracks));
        } catch (error) {
            yield put (actions.getMyTracksError(error));
        }
    }

    *playbackStateChanged(state: PlaybackState) {
        yield put (actions.playbackStateChanged(state));
    }
}

const spotifySaga = new Saga(new Service);
export const spotifySagas = [
    ...spotifySaga.sagas
];