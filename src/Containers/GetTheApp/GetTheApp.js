import React from 'react';
import styled from 'styled-components';

import {Colors, media} from '../../Theme/Global';
import { H2, Paragraph } from '../../Theme/Theme';

import { GooglePlay, AppStore } from '../../Assets';

const GetTheApp = () => (
    <GetTheAppWrapper>
        <H2 active>Get the App</H2>
        <IconsWrapper>
            <Icon
                src={AppStore}
                onClick={() =>
                    window.open(
                        'https://itunes.apple.com/us/app/metalcloud/id1319945253?mt=8',
                        '_blank'
                    )
                }
            />
            <Icon
                src={GooglePlay}
                onClick={() =>
                    window.open(
                        'https://play.google.com/store/apps/details?id=com.metalcloud',
                        '_blank'
                    )
                }
            />
        </IconsWrapper>
      <Paragraph>or visit <span onClick={() =>
        window.open(
          'http://pritishvaidya.com',
          '_blank'
        )
      }>pritishvaidya.com</span></Paragraph>
    </GetTheAppWrapper>
);

export default GetTheApp;

const GetTheAppWrapper = styled.div`
    padding-left: 150px;
    ${H2}, ${Paragraph} {
        text-align: start;
    }
    ${media.phablet`
    ${H2}, ${Paragraph} {
      text-align: center
    };
    padding-left: 0px;`};
    ${media.phone`
    ${H2}, ${Paragraph} {
      text-align: center
    }
    padding-left: 0px;`};
`;

const IconsWrapper = styled.div`
    max-width: 450px
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    ${media.phablet`flex-direction: column; align-items: center`};
    ${media.phone`flex-direction: column; align-items: center`};
    `;

const Icon = styled.img`
    height: 75px;
    width: 200px;
`;
