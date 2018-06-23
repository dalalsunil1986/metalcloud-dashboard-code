// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

// Styles
import { Colors, media } from '../../Theme/Global';
import { H2, H1, Paragraph } from '../../Theme/Theme';

// Constants
import { details } from '../../Config/Metal';
import { CamelCaseSeparator } from '../../Utils';

type Props = {
    activeBand: string,
    genre: string,
};

type State = {};

class Artist extends Component<Props, State> {
    state = {};
    render() {
        const { activeBand, genre } = this.props;
        return (
            <ArtistWrapper>
                <H2 active>Artist</H2>
                <ArtistDescriptionWrapper>
                    <ArtistCard>
                        <Photo src={details[genre][activeBand].url} />
                    </ArtistCard>
                    <DescriptionWrapper>
                        <H1 active>{CamelCaseSeparator(activeBand)}</H1>
                        <Paragraph>{details[genre][activeBand].desc}</Paragraph>
                    </DescriptionWrapper>
                </ArtistDescriptionWrapper>
            </ArtistWrapper>
        );
    }
}

const mapStateToProps = state => ({
    activeBand: state.metal.band,
    genre: state.sidebar.genre,
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Artist);

const ArtistWrapper = styled.div`
    padding-left: 150px;
    padding-right: 150px
    padding-top: 30px;
    padding-bottom: 30px;
    ${H1}, ${H2}, ${Paragraph} {
      text-align: start
    };
    ${media.phablet`
    ${H1}, ${H2}, ${Paragraph} {
      text-align: center
    };
    padding-left: 0px; padding-right: 0px; padding-top: 100px;`}
    ${media.phone`
    ${H1}, ${H2}, ${Paragraph} {
      text-align: center
    };
    padding-left: 0px; padding-right: 0px; padding-top: 100px;`}
`;

const ArtistCard = styled.div`
    height: 240px;
    width: 210px;
`;

const Photo = styled.img`
    height: 100%;
    width: 100%;
`;

const ArtistDescriptionWrapper = styled.div`
    display: flex;
    flex-direction: row;
    ${media.phablet`padding-left: 0px; flex-direction: column; align-items: center`};
    ${media.phone`padding-left: 0px; flex-direction: column; align-items: center`};
`;

const DescriptionWrapper = styled.div`
    padding-left: 30px;
    ${media.phablet`padding-left: 0px`};
    ${media.phone`padding-left: 0px;`};
`;
