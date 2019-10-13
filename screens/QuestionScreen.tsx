import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../redux-root/state';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    helloworld: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

type Props = Readonly <{
}>;

type State = Readonly <{
}>;


const mapStateToProps = (state: RootState) => {
    return {
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => { 
    return bindActionCreators({}, dispatch)
};

class LoginScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.helloworld}>Spotify Music Quiz</Text>
            </View>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);