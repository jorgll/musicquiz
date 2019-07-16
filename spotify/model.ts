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

export type LibraryTracks = Readonly<{
    href: string;
    items: [LibraryTrack];
    limit: number;
    next: string;
    offset: number;
    previous: number;
    total: number;
}> | null;

export type LibraryTrack = Readonly<{
    added_at: Date;
    track: {
        album: LibraryAlbum;
        artists: LibraryArtist;
        available_markets: [string];
        disc_number: number;
        duration_ms: number;
        explicit: boolean;
        external_ids: { isrc: string };
        external_urls: { spotify: string };
        href: string;
        id: string;
        is_local: boolean;
        name: string;
        popularity: number;
        preview_url: string;
        track_number: number;
        type: string;
        uri: string;
    }
}>;

export type LibraryAlbum = Readonly<{
    album_type: string;
    artists: [LibraryArtist];
    available_markets: [string];
    external_urls: { spotify: string };
    href: string;
    id: string;
    images: [{ url: string, width: number, height: number }];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}>

export type LibraryArtist = Readonly<{
    external_urls: { spotify: string };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}>;