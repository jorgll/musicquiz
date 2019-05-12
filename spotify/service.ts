// @ts-ignore: rn-spotify-sdk has no DefinitelyTyped TypeScript support
import Spotify from 'rn-spotify-sdk';

export class Service {

    async initializeSpotify() {
        console.log('Spotify Service: intializing');
        if (!await Spotify.isInitializedAsync()) {
            console.log('Initializing Spotify...');
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
 
    playTrack() {
        console.log('Spotify Service: playing track');
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
    }
}

