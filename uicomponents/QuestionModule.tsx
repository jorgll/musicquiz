import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { Song } from './Song';
import { SongCard } from './SongCard';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    correct: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    incorrect: {
        fontSize: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    }
});

type Props = Readonly<{
    songs: Song[];
    answerId: string;
}>;

function guessAnswer(currentTrackId: string, answerId: string) {
    if (currentTrackId === answerId) {
        console.log('correct');
    } else {
        console.log('wrong');
    }
}

function QuestionModule ( {songs, answerId}: Props ) {
    if (!songs || songs.length === 0 ) return null;

    let questionItems = songs.map(s => {
        return (
            <TouchableHighlight key={"th" + s.id} onPress={() => guessAnswer(s.id, answerId)}>
                <SongCard song={s} key={s.id}/> 
            </TouchableHighlight>
        );
    });

    return (
        <View style={styles.container}>
            {questionItems}
        </View>
    );
}

export { QuestionModule };