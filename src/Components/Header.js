// @flow
import React from 'react';
import Menu from 'react-feather/dist/icons/menu';
import { connect } from 'react-redux';

// Styles
import styled from 'styled-components';
import { H1 } from '../Theme/Theme';
import { Colors, media } from '../Theme/Global';
import { Logo } from '../Assets';

// Redux
import SidebarActions from '../Redux/SidebarRedux';

const HeaderComponent = ({ toggleSidebar }: () => void) => (
    <Header>
        <IconsWrapper onClick={toggleSidebar}>
            <Menu color={Colors.Primary} size={45} />
        </IconsWrapper>
        <LogoWrapper>
          <a href={'http://pritishvaidya.com'}>
          </a>
        </LogoWrapper>
        <H1 active>MetalCloud</H1>
    </Header>
);

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(SidebarActions.toggleSidebar()),
});

export default connect(null, mapDispatchToProps)(HeaderComponent);

const Header = styled.header`
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100px;
    background-color: ${Colors.Background};
    align-items: center;
    justify-content: center;
    padding-top: 20px;
    ${media.tablet`height: 80px; padding-top: 0px`}
    ${media.phone`height: 80px; padding-top: 0px`}
`;

const IconsWrapper = styled.div`
    position: absolute;
    top: 0px;
    left: 40px;
    height: 100px;
    padding-top: 35px;
    align-items: center;
    justify-content: center;
    ${media.tablet`left: 0px; height: 80px; padding-top: 15px; padding-left: 15px`}
    ${media.phone`left: 0px; height: 80px; padding-top: 15px; padding-left: 15px`}
`;

const LogoWrapper = styled.div`
    position: absolute;
    top: 0px;
    right: 40px;
    height: 100px;
    padding-top: 10px;
    ${media.tablet`position: absolute; right: 0px; left: auto; height: 80px; padding-top: 0px`}
    ${media.phone`position: absolute; right: 0px; left: auto; height: 80px; padding-top: 0px`}
`;

const LogoImage = styled.img`
    height: auto;
    width: auto;
    max-height: 100%;
    max-width: 100%;
`;
