import { 
    SpotifyActionTypes, 
    INITIALIZE_SPOTIFY, 
    INITIALIZE_SPOTIFY_COMPLETED, 
    PLAY_TRACK,
    PLAY_TRACK_ERROR,
    PLAYBACK_STATE_CHANGED,
    STOP_PLAYBACK,
    STOP_PLAYBACK_ERROR,
    GET_MY_TRACKS,
    GET_MY_TRACKS_COMPLETED,
    GET_MY_TRACKS_ERROR
} from './actions';
import { PlaybackState, LibraryTracks } from '../model';

export type SpotifyState = Readonly<{
    isInitialized: boolean;
    errorMessage: string;
    playbackState: PlaybackState;
    songLibrary: LibraryTracks;
}>;


const initialState: SpotifyState = {
    isInitialized: false,
    errorMessage: '',
    playbackState: null,
    songLibrary: null
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
        case STOP_PLAYBACK:
            return state;
        case STOP_PLAYBACK_ERROR:
            return { ...state, errorMessage: action.payload };
        case GET_MY_TRACKS:
            return state;
        case GET_MY_TRACKS_COMPLETED:
            return { ...state, songLibrary: action.payload };
        case GET_MY_TRACKS_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

export { spotifyReducer as reducer };