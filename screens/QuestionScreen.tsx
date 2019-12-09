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
    playTrack: (id: string) => SpotifyActionTypes;
    stopPlayback: ()  => SpotifyActionTypes;
    getMyTracks: () => SpotifyActionTypes;
}>;

type State = Readonly <{
    questions: number[];
    answer: number;
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
    return bindActionCreators({ 
        initializeSpotify, 
        playTrack, 
        stopPlayback, 
        getMyTracks 
    }, dispatch)
};

const PotentialAnswersPerScreen = 4;
const SpotifyTrackPageSize = 20;

class QuestionScreen extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            answer: 0,
            questions: []
        }
    }

    // Choose N number of random songs from a user's recent library
    // This method only handles the randomization of numbers from 0-19 as defined by SpotifyTrackPageSize
    // To turn these into actual track objects you need to go through the songLibrary prop
    pickSongs() {
        let current: number = 0;
        let questions: number[] = [];

        while (questions.length < PotentialAnswersPerScreen) {
            current = Math.floor(Math.random()*SpotifyTrackPageSize);
            if (questions.find(q => q == current)) {
                continue;
            }
            questions.push(current);
        }

        this.setState({ answer: questions[0], questions: questions });
        if (this.props.songLibrary) {
            const answerId: string = this.props.songLibrary.items[questions[0]].track.id;
            this.props.playTrack(answerId);
        }
    }

    // Issue a fetch of the tracks as soon as this screen is loaded
    componentDidMount() {
        if (!this.props.songLibrary) {
            this.props.getMyTracks();
        }
     }

    // Iterate over songs in a screen and show a text element for each one
    renderSongs() {
        const questions: number[] = this.state.questions;
        if (this.props.songLibrary && this.props.songLibrary.items.length > 0 && questions.length > 0) {
            const items: [LibraryTrack] = this.props.songLibrary.items;
            
            const renderedTracks = questions.map(i => {
                return <Text key={i} style={styles.helloworld}>
                    {items[i].track.name} ({items[i].track.artists[0].name})
                </Text>;
            });

            return (
                <View>
                    {renderedTracks}
                </View>
            )
        }
        else {
            return null;
        }
    }
     
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.helloworld}>Guess the song</Text>
                {this.renderSongs()}

                <TouchableHighlight style={styles.greenButton} onPress={() => this.pickSongs()}>
                    <Text style={styles.greenButtonText}>
                        Pick new songs
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);