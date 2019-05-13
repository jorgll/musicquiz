// @ts-ignore: rn-spotify-sdk has no DefinitelyTyped TypeScript support
import Spotify from 'rn-spotify-sdk';

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

const AlexanderHamiltonTrackId = "spotify:track:4TTV7EcfroSLWzXRY6gLv6";

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
 
    async playTrack() { 
        await Spotify.playURI(AlexanderHamiltonTrackId, 0, 0);
    }
}