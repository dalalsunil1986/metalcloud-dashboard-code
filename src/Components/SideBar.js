// @flow
import React from 'react';
import { connect } from 'react-redux';

// Styles
import styled from 'styled-components';
import { Paragraph } from '../Theme/Theme';
import { Colors } from '../Theme/Global';

// Constants
import { details } from '../Config/Metal';

// Redux
import SidebarActions from '../Redux/SidebarRedux';
import MetalActions from '../Redux/MetalRedux';

// Utils
import {CamelCaseSeparator, LIMIT, OFFSET} from "../Utils";

const Sidebar = ({ setGenre, activeGenre, setActiveBand, getTrackList }: () => void) => (
    <SidebarWrapper>
        {Object.keys(details).map(genre => (
            <SidebarItem
                key={genre}
                onClick={() => {
                    setGenre(genre);
                    setActiveBand(Object.keys(details[genre])[9])
                    getTrackList(genre, Object.keys(details[genre])[9], OFFSET, LIMIT)
                }}
            >
                <Paragraph
                    active={genre === activeGenre}
                    style={{ paddingLeft: 30, paddingRight: 50 }}
                >
                    {CamelCaseSeparator(genre)}
                </Paragraph>
                <Separator/>
            </SidebarItem>
        ))}
    </SidebarWrapper>
);

const mapStateToProps = state => ({
    activeGenre: state.sidebar.genre,
});

const mapDispatchToProps = dispatch => ({
    setGenre: genre => dispatch(SidebarActions.setGenre(genre)),
    setActiveBand: band => dispatch(MetalActions.setActiveBand(band)),
    getTrackList: (genre, band, offset, limit) => dispatch(MetalActions.requestTracksList(genre, band, offset, limit))
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

const SidebarWrapper = styled.div`
    background-color: ${Colors.Background};
`;

const Separator = styled.div`
  height: 1px;
  width: 100%
  background-color: ${Colors.SidebarSeparator}
`;

const SidebarItem = styled.div`
    padding: 5px 10px 5px 10px;
    background-color: ${props =>
        props.active ? Colors.Primary : Colors.Background};
    
    &:hover ${Paragraph} {
        color: ${Colors.Active};
    }
   
`;
