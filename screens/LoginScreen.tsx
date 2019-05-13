import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../redux-root/state';
import { SpotifyActionTypes, initializeSpotify, playTrack } from '../spotify'

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
    spotifyLoginButton: {
        justifyContent: 'center',
        borderRadius: 18,
        backgroundColor: 'green',
        overflow: 'hidden',
        width: 200,
        height: 40,
        margin: 20,
    },
    spotifyLoginButtonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});

type Props = Readonly <{
    isSpotifyInitialized: boolean;
    spotifyErrorMessage: string;
    initializeSpotify: () => SpotifyActionTypes;
    playTrack: () => SpotifyActionTypes;
}>;

type State = Readonly <{
}>;

const mapStateToProps = (state: RootState) => {
    if (!state.spotify) return {};

    return {
        isSpotifyInitialized: state.spotify.isInitialized,
        spotifyErrorMessage: state.spotify.errorMessage
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => { 
    return bindActionCreators({ initializeSpotify, playTrack }, dispatch)
};

class LoginScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    componentDidMount() {
       this.props.initializeSpotify();
    }

    shouldComponentUpdate(nextProps: Props, nextState: State) {
        return (nextProps.isSpotifyInitialized === this.props.isSpotifyInitialized);
    }

    render() {
        console.log('Enter render(). Props: ', this.props);
        return (
            <View style={styles.container}>
            <Text style={styles.welcome}>Spotify Music Quiz</Text>
            {this.props.isSpotifyInitialized ? 
                <Text style={styles.instructions}>Spotify initializing...</Text>
            : 
                 <Text style={styles.instructions}>Press Play</Text>
            }
            
            <TouchableHighlight onPress={this.props.playTrack} style={styles.spotifyLoginButton}>
                <Text style={styles.spotifyLoginButtonText}>Play Track</Text>
            </TouchableHighlight>
            {this.props.spotifyErrorMessage !== '' ? <Text>{this.props.spotifyErrorMessage}</Text> : null}

            </View>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);