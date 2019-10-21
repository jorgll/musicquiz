import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { NavigationScreenProp } from 'react-navigation';
import { RootState } from '../redux-root/state';
import { SpotifyActionTypes, initializeSpotify } from '../spotify'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    greenButton: {
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: 'green',
        overflow: 'hidden',
        width: 200,
        height: 40,
        margin: 20,
    },
    greenButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

type Props = Readonly <{
    navigation: NavigationScreenProp<null>;
    isSpotifyInitialized: boolean;
    spotifyErrorMessage: string;
    initializeSpotify: () => SpotifyActionTypes;
}>;

type State = Readonly <{
}>;

const mapStateToProps = (state: RootState) => {
    if (!state.spotify) return {};

    return {
        isSpotifyInitialized: state.spotify.isInitialized,
        spotifyErrorMessage: state.spotify.errorMessage,
        playbackState: state.spotify.playbackState
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => { 
    return bindActionCreators({ initializeSpotify }, dispatch)
};

class LoginScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Login',
    }

    componentDidMount() {
       this.props.initializeSpotify();
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return (nextProps.isSpotifyInitialized === this.props.isSpotifyInitialized);
    }

    render() {
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>Spotify Music Quiz</Text>
            {this.props.isSpotifyInitialized ? 
                <Text style={styles.instructions}>Spotify initializing...</Text>
            : 
                 <Text style={styles.instructions}>Press Start</Text>
            }

            {/* <TouchableHighlight onPress={this.props.playTrack} style={styles.greenButton}>
                <Text style={styles.greenButtonText}>Play Song</Text>
            </TouchableHighlight> */}
            {this.props.spotifyErrorMessage !== '' ? <Text>{this.props.spotifyErrorMessage}</Text> : null}

            <TouchableHighlight onPress={() => this.props.navigation.navigate('Question')} style={styles.greenButton}>
                <Text style={styles.greenButtonText}>Start Quiz</Text>
            </TouchableHighlight>

            </View>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);