// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Play from 'react-feather/dist/icons/play';
import Pause from 'react-feather/dist/icons/pause';
import Forward from 'react-feather/dist/icons/skip-forward';
import Back from 'react-feather/dist/icons/skip-back';
import Volume from 'react-feather/dist/icons/volume-2';
import VolumeMute from 'react-feather/dist/icons/volume-x';
import Refresh from 'react-feather/dist/icons/refresh-ccw';
import Repeat from 'react-feather/dist/icons/repeat';

import SoundCloudAudio from 'soundcloud-audio';

// Styles
import { Colors, media } from '../../Theme/Global';
import { Paragraph } from '../../Theme/Theme';
import MetalActions from '../../Redux/MetalRedux';

type Props = {
    track: any,
    tracks: any,
    play: boolean,
    playTrack: string => void,
    pauseTrack: string => void,
    setDuration: string => void,
    setVolume: string => void,
    volume: number,
    duration: number,
    genre: string,
    band: string,
    offset: number,
    limit: number,
    getTracks: (string, string, number, number, any) => void,
    setRepeat: boolean => void,
    repeat: boolean,
};

type State = {
    time: number,
};

class Footer extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {};
        this.SCPlayer = new SoundCloudAudio(process.env.APP_DATA);
    }

    async componentDidMount() {
        await this.play();
        await this.listenEvents();
    }

    async shouldComponentUpdate(nextProps) {
        if (nextProps.track) {
            if (nextProps.play) {
                await this.play();
            } else if (!nextProps.play) {
                await this.SCPlayer.pause();
            }
        }
        if (nextProps.volume) {
            await this.SCPlayer.setVolume(nextProps.volume / 100);
        }

        return true;
    }

    listenEvents = () => {
        // this.SCPlayer.on('playing', ::this.onAudioStarted);
        this.SCPlayer.on('timeupdate', this.trackTime);
        // this.SCPlayer.on('loadedmetadata', ::this.getDuration);
        // this.SCPlayer.on('seeking', ::this.onSeekingTrack);
        // this.SCPlayer.on('seeked', ::this.onSeekedTrack);
        // this.SCPlayer.on('pause', ::this.onAudioPaused);
        this.SCPlayer.on('ended', this.trackFinished);
        // this.SCPlayer.on('volumechange', ::this.onVolumeChange);
    };

    trackTime = () => {
        const { setDuration } = this.props;
        setDuration(this.SCPlayer.audio.currentTime);
    };

    trackFinished = async () => {
        const { repeat } = this.props;
        if (repeat) {
            await this.play();
        } else {
            this.nextTrack();
        }
    };

    play = async () => {
        const { track } = this.props;
        await this.SCPlayer.play({ streamUrl: track.stream_url });
    };

    nextTrack = async () => {
        const {
            tracks,
            track,
            playTrack,
            genre,
            band,
            offset,
            limit,
            getTracks,
        } = this.props;
        const trackIndex = tracks.indexOf(track);
        if (trackIndex !== tracks.length - 1) {
            playTrack(tracks[trackIndex + 1]);
        } else {
            getTracks(genre, band, offset + 10, limit, tracks);
        }
    };

    previousTrack = () => {
        const { tracks, track, playTrack } = this.props;
        const trackIndex = tracks.indexOf(track);
        if (trackIndex !== 0) {
            playTrack(tracks[trackIndex - 1]);
        }
    };

    seekTime = async offsetX => {
        const { track, setDuration } = this.props;
        const percentage = offsetX / window.innerWidth;
        const time = track.duration / 1000 * percentage;
        await this.SCPlayer.setTime(time);
        await setDuration(time);
    };

    stopAndRewind = async () => {
        await this.SCPlayer.stop();
        await this.play();
    };

    repeat = async () => {
        const { setRepeat, repeat } = this.props;
        setRepeat(!repeat);
    };

    render() {
        const {
            track,
            play,
            playTrack,
            pauseTrack,
            volume,
            setVolume,
            duration,
            repeat,
        } = this.props;
        return (
            <FooterWrapper>
                <TrackRange
                    min="1"
                    max="100"
                    value={duration * 1000 * 100 / track.duration}
                    onClick={event => this.seekTime(event.nativeEvent.offsetX)}
                />
                <FooterPhoto src={track.artwork_url} />
                <FooterTextWrapper>
                    <Paragraph active>{track.title}</Paragraph>
                </FooterTextWrapper>
                <PlayerButtonsWrapper>
                    <Repeat
                        color={repeat ? Colors.Tint : Colors.Primary}
                        size={20}
                        onClick={this.repeat}
                    />
                    <Back
                        color={Colors.Primary}
                        size={20}
                        onClick={this.previousTrack}
                    />
                    <PlayWrapper
                        onClick={() =>
                            play ? pauseTrack(track) : playTrack(track)
                        }
                    >
                        {play ? (
                            <Pause color={Colors.Primary} size={25} />
                        ) : (
                            <Play color={Colors.Primary} size={25} />
                        )}
                    </PlayWrapper>
                    <Forward
                        color={Colors.Primary}
                        size={20}
                        onClick={this.nextTrack}
                    />
                    <Refresh
                        color={Colors.Primary}
                        size={20}
                        onClick={this.stopAndRewind}
                    />
                </PlayerButtonsWrapper>
                <VolumeSliderWrapper>
                    {volume < 5 ? (
                        <VolumeMute color={Colors.Primary} size={25} />
                    ) : (
                        <Volume color={Colors.Primary} size={25} />
                    )}
                    <VolumeRange
                        type="range"
                        min="1"
                        max="100"
                        value={volume}
                        onChange={event =>
                            setVolume(Number(event.target.value))
                        }
                    />
                </VolumeSliderWrapper>
            </FooterWrapper>
        );
    }
}

const mapStateToProps = state => ({
    track: state.metal.track,
    tracks: state.metal.tracks,
    play: state.metal.play,
    volume: state.metal.volume,
    duration: state.metal.duration,
    repeat: state.metal.repeat,
    genre: state.sidebar.genre,
    band: state.metal.band,
    offset: state.metal.offset,
    limit: state.metal.limit,
});

const mapDispatchToProps = dispatch => ({
    playTrack: track => dispatch(MetalActions.playTrack(track)),
    pauseTrack: track => dispatch(MetalActions.pauseTrack(track)),
    setVolume: value => dispatch(MetalActions.setVolume(value)),
    setDuration: value => dispatch(MetalActions.setDuration(value)),
    setRepeat: value => dispatch(MetalActions.setRepeat(value)),
    getTracks: (genre, band, offset, limit, tracks) =>
        dispatch(
            MetalActions.requestTracksList(genre, band, offset, limit, tracks)
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);

const FooterWrapper = styled.div`
  height: 100px;
  position: fixed;
  bottom: 0;
  width: 100%
  background-color: ${Colors.Footer};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const FooterPhoto = styled.img`
    height: 100px;
    width: 100px;
    ${media.phablet`display: none`};
    ${media.phone`display: none`};
`;

const FooterTextWrapper = styled.div`
    padding-left: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${media.phablet`display: none`};
    ${media.phone`display: none`};
`;

const PlayerButtonsWrapper = styled.div`
    width: 400px;
    position: absolute;
    left: 40%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    ${media.phablet`width: 100%; left: 0`};
    ${media.phone`width: 100%; left: 0`};
`;

const PlayWrapper = styled.div`
    background-color: ${Colors.Tint};
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const VolumeSliderWrapper = styled.div`
    position: absolute;
    right: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    ${media.phablet`display: none`};
    ${media.phone`display: none`};
`;

const TrackRange = styled.progress`
  position: absolute;
  top: -5px;
  width: 100%; 
  height: 5px;
  background-color: ${Colors.Active} 
  &::-moz-progress-bar { background: ${Colors.Tint} }
  &::-webkit-progress-bar {background-color: ${Colors.Active} }
  &::-webkit-progress-value { background: ${Colors.Tint} }
`;

const VolumeRange = styled.input`
    margin-left: 10px;
`;
