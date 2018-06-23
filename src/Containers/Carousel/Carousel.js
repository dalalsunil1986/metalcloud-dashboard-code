// @flow
import React, { Component } from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { connect } from 'react-redux';

// Styles
import styled from 'styled-components';
import { H2, H3 } from '../../Theme/Theme';
import { media, Colors } from '../../Theme/Global';

import { details } from '../../Config/Metal';

// Redux
import MetalActions from '../../Redux/MetalRedux';

// Utils
import { CamelCaseSeparator, OFFSET, LIMIT } from '../../Utils';

type Props = {
    genre: string,
    setActiveBand: string => void,
    activeBand: string,
    getTrackList: (string, string, number, number) => void,
};

type State = {};

const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 8,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 572,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 376,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

class Carousel extends Component<Props, State> {
    state = {};

    componentDidMount() {
        const { genre, activeBand, getTrackList } = this.props;
        getTrackList(genre, activeBand, OFFSET, LIMIT);
    }

    render() {
        const { genre, setActiveBand, activeBand, getTrackList } = this.props;
        return (
            <CarouselWrapper>
                <H2 active>{CamelCaseSeparator(genre)}</H2>
                <SliderWrapper>
                    <Slider {...sliderSettings}>
                        {Object.keys(details[genre]).map(type => (
                            <CardWrapper
                                active={type === activeBand}
                                key={type}
                                onClick={() => {
                                    setActiveBand(type);
                                    getTrackList(genre, type, OFFSET, LIMIT);
                                }}
                            >
                                <CardPhoto>
                                    <Photo src={details[genre][type].url} />
                                    <H3 active={type === activeBand}>
                                        {CamelCaseSeparator(
                                            details[genre][type].name
                                        )}
                                    </H3>
                                </CardPhoto>
                            </CardWrapper>
                        ))}
                    </Slider>
                </SliderWrapper>
            </CarouselWrapper>
        );
    }
}

const mapStateToProps = state => ({
    genre: state.sidebar.genre,
    activeBand: state.metal.band,
});

const mapDispatchToProps = dispatch => ({
    setActiveBand: band => dispatch(MetalActions.setActiveBand(band)),
    getTrackList: (genre, band, offset, limit) =>
        dispatch(MetalActions.requestTracksList(genre, band, offset, limit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Carousel);

const CarouselWrapper = styled.div`
    padding-top: 150px;
    padding-bottom: 30px;
    align-items: center;
    ${media.tablet`padding-top: 100px`} ${media.phone`padding-top: 100px`};
`;

const SliderWrapper = styled.div`
    padding-top: 30px;
    padding-bottom: 30px;
    ${media.desktop`height: 100px;`}
    ${media.tablet`padding-top: 20px`}
    ${media.phone`padding-top: 20px`}
`;

const CardWrapper = styled.div`
    height: 220px;
    max-width: 180px;
    background-color: ${Colors.Background};
    align-items: center;
    text-align: center;
    text-transform: capitalize;
    overflow: hidden;
    ${media.tablet`max-width: 180px`}
    ${media.phablet`max-width: 150px`}
    ${media.phone`max-width: 250px`}
`;

const CardPhoto = styled.div`
    height: 170px
    width: 100%;
`;

const Photo = styled.img`
    height: 100%;
    width: 100%;
`;
