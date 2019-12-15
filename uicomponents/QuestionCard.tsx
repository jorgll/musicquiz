import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { Question } from './Question';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        width: 300
    },
    standardText: {
        fontSize: 12,
        textAlign: 'center',
        margin: 10,
    },
    albumArtStyle: {
        width: 80,
        height: 80,
    }
});

type Props = Readonly<{
    question: Question;
}>;

function QuestionCard ( {question}: Props ) {
    return (
        <View key={"vw"+question.id} style={styles.container}>
            <Text key={"txtLine1"+question.id} style={styles.standardText}>
                {question.title}
            </Text>
            <Text key={"txtLine2"+question.id} style={styles.standardText}>
                {question.artist}
            </Text>
            <Image key={"img"+question.id} 
                source={{uri: question.albumArt}} 
                style={styles.albumArtStyle}
            />
        </View>
    );
}

export { QuestionCard };