import React from 'react';
import { StyleSheet, View, TouchableHighlight } from 'react-native';
import { Toast } from 'native-base';
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
});

type Props = Readonly<{
    songs: Song[];
    answerId: string;
    onAnswer(isCorrect: boolean): void;
}>;

function QuestionModule ( {songs, answerId, onAnswer}: Props ) {
    if (!songs || songs.length === 0 ) return null;

    let questionItems = songs.map(s => {
        return (
            <TouchableHighlight 
                key={"th" + s.id} 
                onPress={() => onAnswer(s.id == answerId ? true : false)}
            >
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