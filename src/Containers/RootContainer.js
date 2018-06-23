// @flow
import React, { Component } from 'react';
import Sidebar from 'react-sidebar';

import styled from 'styled-components';

// Redux
import { connect } from 'react-redux';
import SidebarActions from '../Redux/SidebarRedux';

// Styles
import { Colors } from '../Theme/Global';

// Components
import Carousel from '../Containers/Carousel';
import { Header, SidebarContent } from '../Components';
import Artist from '../Containers/Artist';
import TrackList from '../Containers/TrackList';
import Footer from '../Containers/Footer';
import GetTheApp from '../Containers/GetTheApp';

type Props = {
    setSidebarState: boolean => void,
    toggleSidebar: () => void,
    status: boolean,
    track: any,
};

type State = {
    transitions: boolean,
    touch: boolean,
    shadow: boolean,
    pullRight: boolean,
    touchHandleWidth: number,
    dragToggleDistance: number,
};

class RootContainer extends Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            transitions: true,
            touch: true,
            shadow: true,
            pullRight: false,
            touchHandleWidth: 20,
            dragToggleDistance: 30,
        };
    }

    onSetOpen = open => this.props.setSidebarState(open);

    render() {
        const { track } = this.props;
        const sidebarContent = <SidebarContent />;
        const sidebarProps = {
            sidebar: sidebarContent,
            sidebarClassName: 'custom-sidebar-class',
            open: this.props.status,
            touch: this.state.touch,
            shadow: this.state.shadow,
            pullRight: this.state.pullRight,
            touchHandleWidth: this.state.touchHandleWidth,
            dragToggleDistance: this.state.dragToggleDistance,
            transitions: this.state.transitions,
            onSetOpen: this.onSetOpen,
        };

        return (
            <Sidebar {...sidebarProps}>
                <Wrapper>
                    <Header />
                    <Carousel />
                    <Artist />
                    <TrackList />
                    {track && <Footer />}
                    <GetTheApp />
                </Wrapper>
            </Sidebar>
        );
    }
}

const mapStateToProps = state => ({
    status: state.sidebar.status,
    track: state.metal.track,
    play: state.metal.play,
});

const mapDispatchToProps = dispatch => ({
    toggleSidebar: () => dispatch(SidebarActions.toggleSidebar()),
    setSidebarState: state => dispatch(SidebarActions.setSidebarState(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RootContainer);

const Wrapper = styled.div`
    padding-bottom: 150px;
    background-color: ${Colors.SecondaryBackground};
    overflow-x: hidden;
`;
