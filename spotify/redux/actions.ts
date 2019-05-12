// @ts-ignore: rn-spotify-sdk has no DefinitelyTyped TypeScript support
import Spotify from 'rn-spotify-sdk';

export const INITIALIZE_SPOTIFY_START   = 'spotify/INITIALIZE_SPOTIFY_START';
export const INITIALIZE_SPOTIFY_END     = 'spotify/INITIALIZE_SPOTIFY_END';
export const PLAY_TRACK                 = 'spotify/PLAY_TRACK';

export type InitializeSpotifyStartAction = Readonly<{
    type: typeof INITIALIZE_SPOTIFY_START
    payload: { }
}>;

export type InitializeSpotifyEndAction = Readonly<{
    type: typeof INITIALIZE_SPOTIFY_END
    payload: {
        succeeded: boolean,
        errorDetails: string
    }
}>;

export type PlayTrackAction = Readonly <{
    type: typeof PLAY_TRACK
    payload: { }
}>;

export function initializeSpotify(): SpotifyActionTypes {
    console.log('called initializeSpotify()');

    initializeSpotifyIfNeeded()
        .catch((error) => {
            console.log("Error", error.message);
            return { type: INITIALIZE_SPOTIFY_END, payload: { succeeded: false, errorDetails: error.message }}
        }
    )
    console.log ('returning INITIALIZE_SPOTIFY_END');
    return { type: INITIALIZE_SPOTIFY_START, payload: { succeeded: true, errorDetails: '' }};
}

export function playTrack(): SpotifyActionTypes {
    console.log('called PLAY_TRACK');
    // log into Spotify
    Spotify.login().then((loggedIn: any) => {
        if(loggedIn) {
            // logged in
            console.log('Signed in!');
            Spotify.getMe().then((result: any) => {
                console.log(result)
                // Spotify.search('hamilton', ['track']).then((top) => {
                // Spotify.getPlaylistTracks('3PpJrvtxZlBlq6kTyCbzJQ').then((top: any) => {
                Spotify.playURI("spotify:track:4TTV7EcfroSLWzXRY6gLv6", 0, 0).then(() => {
                    console.log("Alexander Hamilton");
                }).catch((error: any) => {
                    console.log(error.message);
                });
            }).then(() => {
                // success
                console.log("Success");
            }).catch((error: any) => {
                // error
                console.log("Error", error.message);
            });
        }
        else {
            // cancelled
            console.log("Cancelled");
        }
    }).catch((error: any) => {
        // error
        console.log("Error", error.message);
    });

    return { type: PLAY_TRACK, payload: {}}
}

async function initializeSpotifyIfNeeded() {
    if (!await Spotify.isInitializedAsync()) {
        console.log('Initializing Spotify initializeSpotifyIfNeeded...');
        // Initialize Spotify
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
        const loggedIn = await Spotify.initialize(spotifyOptions);
    }
}

export type SpotifyActionTypes = InitializeSpotifyStartAction | InitializeSpotifyEndAction | PlayTrackAction