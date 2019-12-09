// @ts-ignore: rn-spotify-sdk has no DefinitelyTyped TypeScript support

// Using react-native-spotify for Spotify integration
// https://github.com/lufinkey/react-native-spotify

import Spotify from 'rn-spotify-sdk';
import { PlaybackState, LibraryTracks } from './model';

const spotifyOptions = {
    "clientID":"977489be68c34854b96b89be50eb877b",
    "sessionUserDefaultsKey":"SpotifySession",
    "redirectURL":"musicquiz://auth",
    "scopes":[
        "user-read-recently-played",
        "user-top-read",
        "user-library-read", 
        "playlist-read-private", 
        "user-read-private", 
        "user-read-playback-state",
        "user-follow-read",
        "streaming"
    ],
};

const SpotifyTrackIdPrefix: string = "spotify:track:";
const AlexanderHamiltonTrackId = "spotify:track:4TTV7EcfroSLWzXRY6gLv6";

export type PlaybackStateChanged = (state: PlaybackState) => any;

export class Service {

    isInitialized: boolean = false;

    async initializeSpotify() {
        if (this.isInitialized) {
            return;
        }
        this.isInitialized = await Spotify.isInitializedAsync();
        await Spotify.initialize(spotifyOptions);
        await Spotify.login();
    }
 
    async playTrack(id: string) { 
        const trackId: string = SpotifyTrackIdPrefix + id;
        console.log('Spotify Service: Play track ' + trackId);
        await Spotify.playURI(trackId, 0, 0);
    }

    async stopPlayback() {
        await Spotify.setPlaying(false);
    }

    async getMyTracks(): Promise<LibraryTracks> {
        const result: LibraryTracks = await Spotify.getMyTracks();
        console.log('Here are your tracks:', result);
        return result;
    }

    registerEventHandler(eventName: string, eventHandler: PlaybackStateChanged) {
        Spotify.on(eventName, (state: PlaybackState) => eventHandler(state));
    }

    removeAllEventHandlers() {
        Spotify.removeAllListeners();
    }
}