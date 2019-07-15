// Spotify object model
// From https://developer.spotify.com/documentation/web-playback-sdk/reference/

export type PlaybackState = Readonly<{
    error: string;
    metadata: {
        currentTrack: PlaybackTrack;
        nextTrack: PlaybackTrack;
        prevTrack: PlaybackTrack;
    }
    state: {
        activeDevice: boolean;
        playing: boolean;
        position: number;
        repeating: boolean;
        shuffling: boolean;
    }
}> | null;

export type PlaybackTrack = Readonly<{
    albumCoverArtURL: string;
    albumName: string;
    albumUri: string;
    artistName: string;
    artistUri: string;
    contextName: string;
    contextUri: string;
    duration: number;
    indexInContext: number;
    name: string;
    uri: string;
}> | null;
