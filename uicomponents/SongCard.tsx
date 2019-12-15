import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Song } from './Song';
import * as Colors from '../uicomponents/ColorScheme';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#D1CCDC',
        borderColor: '#424C55',
        borderWidth: 1,
        width: 200,
        height: 150
    },
    songTitle: {
        color: '#3D2C2E',
        paddingTop: 5,
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    songArtist: {
        color: '#3D2C2E',
        fontSize: 10,
        textAlign: 'center',
        paddingBottom: 3,
    },
    albumArtStyle: {
        width: 80,
        height: 80,
    }
});

type Props = Readonly<{
    song: Song;
}>;

function SongCard ( {song}: Props ) {
    return (
        <View key={"vw"+song.id} style={styles.container}>
            <Text key={"txtLine1"+song.id} style={styles.songTitle}>
                {song.title}
            </Text>
            <Text key={"txtLine2"+song.id} style={styles.songArtist}>
                {song.artist}
            </Text>
            <Image key={"img"+song.id} 
                source={{uri: song.albumArt}} 
                style={styles.albumArtStyle}
            />
        </View>
    );
}

export { SongCard };