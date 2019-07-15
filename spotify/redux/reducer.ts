import { 
    SpotifyActionTypes, 
    INITIALIZE_SPOTIFY, 
    INITIALIZE_SPOTIFY_COMPLETED, 
    PLAY_TRACK,
    PLAY_TRACK_ERROR,
    PLAYBACK_STATE_CHANGED
} from './actions';
import { PlaybackState } from '../model';

export type SpotifyState = Readonly<{
    isInitialized: boolean;
    errorMessage: string;
    playbackState: PlaybackState;
}>;


const initialState: SpotifyState = {
    isInitialized: false,
    errorMessage: '',
    playbackState: null
};

const spotifyReducer = (state = initialState, action: SpotifyActionTypes): SpotifyState => {
    console.log('Dispatching action ', action.type);
    switch (action.type) {
        case INITIALIZE_SPOTIFY:
            return state;
        case INITIALIZE_SPOTIFY_COMPLETED:
            return { ...state, isInitialized: action.payload.succeeded, errorMessage: action.payload.errorDetails };
        case PLAY_TRACK:
            return { ...state, errorMessage: '' };
        case PLAY_TRACK_ERROR:
            return { ...state, errorMessage: action.payload };
        case PLAYBACK_STATE_CHANGED:
            return { ...state, playbackState: action.payload };
        default:
            return state;
    }
}

export { spotifyReducer as reducer };