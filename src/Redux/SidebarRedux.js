// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    toggleSidebar: null,
    setSidebarState: ['status'],
    setGenre: ['genre'],
});

export const SidebarTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    status: false,
    genre: 'ThrashMetal',
});

/* ------------- Reducers ------------- */
export const sidebarToggle = (state: any) =>
    state.merge({ status: !state.status });

export const sidebarState = (state: any, { status }: { status: boolean }) =>
    state.merge({ status });

export const genre = (state: any, { genre }: { genre: string }) =>
    state.merge({ genre, status: false });

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.TOGGLE_SIDEBAR]: sidebarToggle,
    [Types.SET_SIDEBAR_STATE]: sidebarState,
    [Types.SET_GENRE]: genre,
});
