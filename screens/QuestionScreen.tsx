import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableHighlight, TouchableHighlightBase } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../redux-root/state';
import { NavigationScreenProp } from 'react-navigation';
import { 
    SpotifyActionTypes, 
    initializeSpotify, 
    playTrack, 
    stopPlayback, 
    getMyTracks, 
    PlaybackState,
    LibraryTracks,
    LibraryTrack
} from '../spotify'

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
    playbackState: PlaybackState;
    songLibrary: LibraryTracks;
    initializeSpotify: () => SpotifyActionTypes;
    playTrack: () => SpotifyActionTypes;
    stopPlayback: ()  => SpotifyActionTypes;
    getMyTracks: () => SpotifyActionTypes;
}>;

type State = Readonly <{
    trackIndex: number;
}>;

const mapStateToProps = (state: RootState) => {
    if (!state.spotify) return {};

    return {
        isSpotifyInitialized: state.spotify.isInitialized,
        spotifyErrorMessage: state.spotify.errorMessage,
        playbackState: state.spotify.playbackState,
        songLibrary: state.spotify.songLibrary
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => { 
    return bindActionCreators({ initializeSpotify, playTrack, stopPlayback, getMyTracks }, dispatch)
};

class QuestionScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            trackIndex: 0
        }
    }

    pickRandomSong() {
        const randomIndex: number = Math.floor(Math.random()*21);
        this.setState({ trackIndex: randomIndex });
    }

    componentDidMount() {
        if (!this.props.songLibrary) {
            this.props.getMyTracks();
        }
        this.pickRandomSong();
     }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.helloworld}>Guess the song</Text>
                {this.props.songLibrary && 
                    <Text style={styles.helloworld}>{this.props.songLibrary.items[this.state.trackIndex].track.name}</Text>
                }
                <TouchableHighlight style={styles.greenButton} onPress={() => this.pickRandomSong()}>
                    <Text style={styles.greenButtonText}>
                        Next Song
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);