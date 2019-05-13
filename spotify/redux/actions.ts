export const INITIALIZE_SPOTIFY             = 'spotify/INITIALIZE_SPOTIFY';
export const INITIALIZE_SPOTIFY_COMPLETED   = 'spotify/INITIALIZE_SPOTIFY_COMPLETED';
export const PLAY_TRACK                     = 'spotify/PLAY_TRACK';
export const PLAY_TRACK_ERROR               = 'spotify/PLAY_TRACK_ERROR';

export type InitializeSpotifyAction = Readonly<{
    type: typeof INITIALIZE_SPOTIFY
    payload: { }
}>;

export type InitializeSpotifyCompletedAction = Readonly<{
    type: typeof INITIALIZE_SPOTIFY_COMPLETED
    payload: {
        succeeded: boolean,
        errorDetails: string
    }
}>;

export type PlayTrackAction = Readonly <{
    type: typeof PLAY_TRACK
    payload: { }
}>;

export type PlayTrackErrorAction = Readonly<{
    type: typeof PLAY_TRACK_ERROR
    payload: string
}>;

export function initializeSpotify(): SpotifyActionTypes {
    return { type: INITIALIZE_SPOTIFY, payload: {} };
}

export function initializeSpotifyCompleted(succeeded: boolean, error: string) {
    return { 
        type: INITIALIZE_SPOTIFY_COMPLETED,
        payload: {
            succeeded: succeeded,
            errorDetails: error
        }
    }
}

export function playTrack(): SpotifyActionTypes {
    return { type: PLAY_TRACK, payload: {}}
}

export function playTrackError(error: string): SpotifyActionTypes {
    return {
        type: PLAY_TRACK_ERROR,
        payload: error
    }
}

export const actions = { initializeSpotify, initializeSpotifyCompleted, playTrack, playTrackError };
export type SpotifyActionTypes = InitializeSpotifyAction | InitializeSpotifyCompletedAction | PlayTrackAction | PlayTrackErrorAction;