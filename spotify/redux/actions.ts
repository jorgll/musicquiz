import { PlaybackState, LibraryTracks } from "../model";

export const INITIALIZE_SPOTIFY             = 'spotify/INITIALIZE_SPOTIFY';
export const INITIALIZE_SPOTIFY_COMPLETED   = 'spotify/INITIALIZE_SPOTIFY_COMPLETED';
export const PLAY_TRACK                     = 'spotify/PLAY_TRACK';
export const PLAY_TRACK_ERROR               = 'spotify/PLAY_TRACK_ERROR';
export const PLAYBACK_STATE_CHANGED         = 'spotify/PLAYBACK_STATE_CHANGED';
export const STOP_PLAYBACK                  = 'spotify/STOP_PLAYBACK';
export const STOP_PLAYBACK_ERROR            = 'spotify/STOP_PLAYBACK_ERROR';
export const GET_MY_TRACKS                  = 'spotify/GET_MY_TRACKS';
export const GET_MY_TRACKS_COMPLETED        = 'spotify/GET_MY_TRACKS_COMPLETED';
export const GET_MY_TRACKS_ERROR            = 'spotify/GET_MY_TRACKS_ERROR';

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

export type PlaybackStateChangedAction = Readonly<{
    type: typeof PLAYBACK_STATE_CHANGED
    payload: PlaybackState
}>;

export type StopPlaybackAction = Readonly<{
    type: typeof STOP_PLAYBACK
    payload: { }
}>;

export type StopPlaybackErrorAction = Readonly<{
    type: typeof STOP_PLAYBACK_ERROR
    payload: string
}>;

export type GetMyTracksAction = Readonly<{
    type: typeof GET_MY_TRACKS
    payload: { }
}>;

export type GetMyTracksCompletedAction = Readonly<{
    type: typeof GET_MY_TRACKS_COMPLETED
    payload: LibraryTracks
}>;

export type GetMyTracksErrorAction = Readonly<{
    type: typeof GET_MY_TRACKS_ERROR
    payload: any
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

export function stopPlayback(): SpotifyActionTypes {
    return { type: STOP_PLAYBACK, payload: {} }
}

export function stopPlaybackError(error: string): SpotifyActionTypes {
    return {
        type: STOP_PLAYBACK_ERROR,
        payload: error
    }
}

export function getMyTracks(): SpotifyActionTypes {
    return {
        type: GET_MY_TRACKS,
        payload: {}
    }
}

export function getMyTracksCompleted(response: LibraryTracks): SpotifyActionTypes {
    return {
        type: GET_MY_TRACKS_COMPLETED,
        payload: response
    }
}

export function getMyTracksError(error: string): SpotifyActionTypes {
    return {
        type: GET_MY_TRACKS_ERROR,
        payload: error
    }
}

export function playbackStateChanged(newState: PlaybackState): SpotifyActionTypes {
    return { 
        type: PLAYBACK_STATE_CHANGED, 
        payload: newState 
    }
}

export const actions = { 
    initializeSpotify, 
    initializeSpotifyCompleted, 
    playTrack, 
    playTrackError, 
    playbackStateChanged, 
    stopPlayback, 
    stopPlaybackError,    
    getMyTracks,
    getMyTracksCompleted,
    getMyTracksError 
};

export type SpotifyActionTypes = 
    InitializeSpotifyAction | 
    InitializeSpotifyCompletedAction | 
    PlayTrackAction | 
    PlayTrackErrorAction | 
    PlaybackStateChangedAction | 
    StopPlaybackAction | 
    StopPlaybackErrorAction | 
    GetMyTracksAction | 
    GetMyTracksCompletedAction |
    GetMyTracksErrorAction;