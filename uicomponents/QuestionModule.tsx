import React from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from 'react-native';
import { Toast } from 'native-base';
import { Song } from './Song';
import { SongCard } from './SongCard';
import * as Colors from './ColorScheme';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
});

type Props = Readonly<{
    songs: Song[];
    answerId: string;
}>;

function guessAnswer(currentTrackId: string, answerId: string) {
    if (currentTrackId === answerId) {
        Toast.show({
            text: 'Correct!',
            buttonText: 'X',
            type: "success", 
        });
        console.log('correct');
    } else {
        Toast.show({
            text: 'Incorrect! Try again',
            buttonText: 'X',
            type: "danger", 
        });
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