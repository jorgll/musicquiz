import { 
    SpotifyActionTypes, 
    INITIALIZE_SPOTIFY_START, 
    INITIALIZE_SPOTIFY_END, 
    PLAY_TRACK
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
    switch (action.type) {
        case INITIALIZE_SPOTIFY_START:
            console.log(state);
            return state;
        case INITIALIZE_SPOTIFY_END:
            console.log(state);
            return { isInitialized: action.payload.succeeded, errorMessage: action.payload.errorDetails };
        case PLAY_TRACK:
            console.log(state);
            return state;
    default:
        console.log(state);
        return state;
    }
}

export { spotifyReducer as reducer };