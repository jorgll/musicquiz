import { reducer as spotify, SpotifyState } from './spotify';
import { combineReducers } from 'redux';

export const reducer = combineReducers({
    spotify: spotify
});

export type RootState = ReturnType<typeof reducer>;