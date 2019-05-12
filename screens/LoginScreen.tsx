import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../RootState';
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

interface LoginFormProps {
    initializeSpotify: () => SpotifyActionTypes;
    playTrack: () => SpotifyActionTypes;
    isSpotifyInitialized?: boolean;
}

interface LoginFormState {
  userName: string;
}

const mapStateToProps = (state: RootState) => {
    return {
        isSpotifyInitialized: state.spotify.isInitialized
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => { 
    return bindActionCreators({ initializeSpotify, playTrack }, dispatch)
};

class LoginScreen extends Component<LoginFormProps, LoginFormState> {
    constructor(props: LoginFormProps) {
        super(props);
    }

    componentDidMount() {
       this.props.initializeSpotify();
    }

    // spotifyLoginButtonWasPressed() {
    //     this.props.playTrack();
    // }

    render() {
    return (
        <View style={styles.container}>
        <Text style={styles.welcome}>Spotify Music Quiz</Text>
        <Text style={styles.instructions}>{this.props.isSpotifyInitialized ? "Spotify initializing..." : "Spotify initialized"}</Text>
        <TouchableHighlight onPress={this.props.playTrack} style={styles.spotifyLoginButton}>
            <Text style={styles.spotifyLoginButtonText}>Log into Spotify</Text>
        </TouchableHighlight>

        </View>
    );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);