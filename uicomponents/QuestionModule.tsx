import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Question } from './Question';
import { QuestionCard } from './QuestionCard';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    standardText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});

type Props = Readonly<{
    questions: Question[];
}>;

function QuestionModule ( {questions}: Props ) {
    if (!questions || questions.length === 0 ) return null;

    let questionItems = questions.map(item => {
        return ( <QuestionCard question={item} key={item.id}/> );
    });

    return (
        <View style={styles.container}>
            {questionItems}
        </View>
    );
}

export { QuestionModule };