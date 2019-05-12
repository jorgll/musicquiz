import { 
    SpotifyActionTypes, 
    INITIALIZE_SPOTIFY, 
    INITIALIZE_SPOTIFY_COMPLETED, 
    PLAY_TRACK,
    PLAY_TRACK_ERROR
} from './actions';

export type SpotifyState = Readonly<{
    isInitialized: boolean;
    errorMessage: string;
}>;

const initialState: SpotifyState = {
    isInitialized: false,
    errorMessage: ''
};

const spotifyReducer = (state = initialState, action: SpotifyActionTypes): SpotifyState => {
    console.log(state);
    switch (action.type) {
        case INITIALIZE_SPOTIFY:
            return state;
        case INITIALIZE_SPOTIFY_COMPLETED:
            return { isInitialized: action.payload.succeeded, errorMessage: action.payload.errorDetails };
        case PLAY_TRACK:
            return state;
        case PLAY_TRACK_ERROR:
            return { ...state, errorMessage: action.payload };
        default:
            return state;
    }
}

export { spotifyReducer as reducer };