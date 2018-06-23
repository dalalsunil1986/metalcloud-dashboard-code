// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Play from 'react-feather/dist/icons/play-circle';
import Pause from 'react-feather/dist/icons/pause-circle';
import SpinKit from 'react-spinkit';

// Styles
import { Colors, media } from '../../Theme/Global';
import { H1, H2, Paragraph } from '../../Theme/Theme';

// Utils
import { MillisToMinutesAndSeconds } from '../../Utils';

import MetalActions from '../../Redux/MetalRedux';

type Props = {
    tracks: any,
    playTrack: string => void,
    pauseTrack: string => void,
    track: any,
    play: boolean,
    genre: string,
    band: string,
    offset: number,
    limit: number,
    getTracks: (string, string, number, number, any) => void,
    fetching: boolean,
};

type State = {};

class TrackList extends Component<Props, State> {
    state = {};

    loadMore = () => {
        const { genre, band, offset, limit, tracks, getTracks } = this.props;
        getTracks(genre, band, offset + 10, limit, tracks);
    };

    render() {
        const {
            tracks,
            playTrack,
            pauseTrack,
            track,
            play,
            fetching,
        } = this.props;
        return (
            <TrackListWrapper>
                <H2 active>Top Tracks</H2>
                <TableOverflow>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead />
                                <TableHead>
                                    <Paragraph>#</Paragraph>
                                </TableHead>
                                <TableHead>
                                    <Paragraph>SONG</Paragraph>
                                </TableHead>
                                <TableHead>
                                    <Paragraph>DESCRIPTION</Paragraph>
                                </TableHead>
                                <TableHead>
                                    <Paragraph>TIME</Paragraph>
                                </TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tracks.map((currentTrack, index) => (
                                <TableRow
                                    key={currentTrack.id}
                                    onClick={() =>
                                        currentTrack === track && play
                                            ? pauseTrack(track)
                                            : playTrack(currentTrack)
                                    }
                                >
                                    <TableCell width={100}>
                                        <TablePhoto
                                            src={currentTrack.artwork_url}
                                        />
                                    </TableCell>
                                    <TableCell width={100}>
                                        <Paragraph>{index + 1}</Paragraph>
                                    </TableCell>
                                    <TableCell width={400}>
                                        <Paragraph active>
                                            {currentTrack.title}
                                        </Paragraph>
                                    </TableCell>
                                    <TableCell
                                        width={600}
                                        style={{ paddingRight: 40 }}
                                    >
                                        <Paragraph
                                            style={{
                                                maxHeight: 50,
                                                overflow: 'hidden',
                                            }}
                                        >
                                            {currentTrack.description}
                                        </Paragraph>
                                    </TableCell>
                                    <TableCell>
                                        <Paragraph>
                                            {MillisToMinutesAndSeconds(
                                                currentTrack.duration
                                            )}
                                        </Paragraph>
                                    </TableCell>
                                    <TableCell>
                                        {currentTrack === track && play ? (
                                            <Pause
                                                color={Colors.Primary}
                                                size={30}
                                            />
                                        ) : (
                                            <Play
                                                color={Colors.Primary}
                                                size={30}
                                            />
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {fetching && (
                        <SpinnerOverlay>
                            <SpinKit name="line-scale-pulse-out" color={Colors.Tint} />
                        </SpinnerOverlay>
                    )}
                </TableOverflow>
                <ShowMoreButtonWrapper>
                    <ShowMore onClick={this.loadMore}>
                        <Paragraph
                            style={{ fontSize: 16, color: Colors.Active }}
                        >
                            Show More
                        </Paragraph>
                    </ShowMore>
                </ShowMoreButtonWrapper>
            </TrackListWrapper>
        );
    }
}

const mapStateToProps = state => ({
    tracks: state.metal.tracks,
    track: state.metal.track,
    play: state.metal.play,
    genre: state.sidebar.genre,
    band: state.metal.band,
    offset: state.metal.offset,
    limit: state.metal.limit,
    fetching: state.metal.fetching,
});

const mapDispatchToProps = dispatch => ({
    playTrack: track => dispatch(MetalActions.playTrack(track)),
    pauseTrack: track => dispatch(MetalActions.pauseTrack(track)),
    getTracks: (genre, band, offset, limit, tracks) =>
        dispatch(
            MetalActions.requestTracksList(genre, band, offset, limit, tracks)
        ),
});

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);

const TrackListWrapper = styled.div`
    padding-left: 150px;
    ${media.tablet`
    ${H1}, ${H2}, ${Paragraph} {
      text-align: center
    };
    padding-left: 5px; text-align: center`};
    ${media.phone`
    ${H1}, ${H2}, ${Paragraph} {
      text-align: center
    };
    padding-left: 5px; text-align: center`};
`;

const TableOverflow = styled.div`
    overflow-x: auto;
    position: relative;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #313247
    &:hover {
        background-color: #1d1e2d;
    }
`;

const TableHeader = styled.thead``;

const TableBody = styled.tbody``;

const TableHead = styled.th`
    text-align: start;
`;

const TableCell = styled.td`
    max-width: ${props => (props.width ? props.width : `200px`)};
    min-width: 20px;
    padding-left: 10px;
    padding-right: 10px;
`;

const TablePhoto = styled.img`
    width: 75px;
    height: 75px;
`;

const ShowMoreButtonWrapper = styled.div`
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ShowMore = styled.button`
    height: 50px;
    width: 200px;
    color: ${Colors.Tint};
    background-color: ${Colors.Tint};
    border-color: ${Colors.Tint};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const SpinnerOverlay = styled.div`
    z-index: 10;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.3);
`;
