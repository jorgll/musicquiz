import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Song } from './Song';
import * as Colors from '../uicomponents/ColorScheme';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: Colors.BACKGROUND_PRIMARY,
        paddingBottom: 40,
        paddingHorizontal: 20,
    },
    albumWithMetadataContainer: {
        alignItems: 'flex-start',
    },
    songTitle: {
        color: Colors.FOREGROUND_PRIMARY,
        paddingTop: 5,
        fontSize: 14,
        textAlign: 'left',
        fontWeight: 'bold',
        width: 120,
        textShadowColor: "#333333",
        textShadowOffset: { width: 0.5, height: 0.5},
        textShadowRadius: 3,
    },
    songArtist: {
        color: Colors.FOREGROUND_SECONDARY,
        fontSize: 12,
        textAlign: 'left',
        width: 120,
    },
    albumArtStyle: {
        width: 120,
        height: 120,
    }
});

type Props = Readonly<{
    song: Song;
}>;

function SongCard ( {song}: Props ) {
    return (
        <View key={"vw"+song.id} style={styles.container}>
            <View style={styles.albumWithMetadataContainer}>
                <Image key={"img"+song.id} 
                    source={{uri: song.albumArt}} 
                    style={styles.albumArtStyle}
                />
                <Text key={"txtLine1"+song.id} style={styles.songTitle} numberOfLines={2}>
                    {song.title}
                </Text>
                <Text key={"txtLine2"+song.id} style={styles.songArtist} numberOfLines={1} ellipsizeMode={'tail'}>
                    {song.artist}
                </Text>
            </View>
        </View>
    );
}

export { SongCard };