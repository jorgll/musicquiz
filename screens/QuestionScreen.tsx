import React from 'react';
import { StyleSheet, Text, TouchableHighlight, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../redux-root/state';
import { NavigationScreenProp } from 'react-navigation';
import { QuestionModule } from '../uicomponents/QuestionModule'
import {Question } from '../uicomponents/Question';
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
    questionIndices: number[];
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
            questionIndices: []
        }
    }

    // Choose N number of random songs from a user's recent library
    // This method only handles the randomization of numbers from 0-19 as defined by SpotifyTrackPageSize
    // To turn these into actual track objects you need to go through the songLibrary prop
    pickSongs() {
        let current: number = 0;
        let questionIndices: number[] = [];

        while (questionIndices.length < PotentialAnswersPerScreen) {
            current = Math.floor(Math.random()*SpotifyTrackPageSize);
            if (questionIndices.find(q => q == current)) {
                continue;
            }
            questionIndices.push(current);
        }

        this.setState({ answer: questionIndices[0], questionIndices: questionIndices });
        if (this.props.songLibrary) {
            const answerId: string = this.props.songLibrary.items[questionIndices[0]].track.id;
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
        const questionIndices: number[] = this.state.questionIndices;
        if (this.props.songLibrary && this.props.songLibrary.items.length > 0 && questionIndices.length > 0) {
            const items: [LibraryTrack] = this.props.songLibrary.items;

            let questionsToRender: Question[] = new Array<Question>();
            questionIndices.map(i => {
                const q: Question = new Question(
                    items[i].track.id,
                    items[i].track.name,
                    items[i].track.artists[0].name,
                    items[i].track.album.images[0].url);
                questionsToRender.push(q);
            });

            return (
                <QuestionModule questions={questionsToRender} />
            )
        }
        else {
            return null;
        }
    }

    renderPickNewSongsButton() {
        return (
            <TouchableHighlight style={styles.greenButton} onPress={() => this.pickSongs()}>
                <Text style={styles.greenButtonText}>
                    Pick new songs
                </Text>
            </TouchableHighlight>
        );
    }
     
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.helloworld}>Guess the song</Text>
                {this.renderSongs()}
                {this.renderPickNewSongsButton()}
            </ScrollView>
        );
    }
}

//@ts-ignore - LoginScreen type mismatch
export default connect(mapStateToProps, mapDispatchToProps)(QuestionScreen);