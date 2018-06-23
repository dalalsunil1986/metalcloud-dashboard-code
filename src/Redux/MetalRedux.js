// @flow
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    setActiveBand: ['band'],
    requestTracksList: ['genre', 'band', 'offset', 'limit', 'tracks'],
    successTracksList: ['tracks'],
    failureTracksList: ['error'],
    playTrack: ['track'],
    pauseTrack: ['track'],
    setVolume: ['volume'],
    setDuration: ['duration'],
    setRepeat: ['repeat'],
});

export const MetalTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
    band: 'sodom',

    fetching: false,
    fetched: false,
    offset: 0,
    limit: 10,
    tracks: [],
    error: null,

    track: null,
    play: false,
    volume: 50,
    duration: 0,
    repeat: false,
});

/* ------------- Reducers ------------- */
export const activeBand = (state: any, { band }: { band: string }) =>
    state.merge({ band });

export const tracksListRequest = (
    state: any,
    { band, offset, limit }: { band: string, offset: number, limit: number }
) => state.merge({ band, offset, limit, fetching: true, fetched: false });

export const tracksListSuccess = (state: any, { tracks }: { tracks: any }) =>
    state.merge({ tracks, fetching: false, fetched: true });

export const tracksListFailure = (state: any, { error }: { error: string }) =>
    state.merge({ error, fetching: false, fetched: false });

export const playActiveTrack = (state: any, {track}: {track: any}) => state.merge({track, play: true})

export const pauseActiveTrack = (state: any, {track}: {track: any}) => state.merge({track, play: false})

export const setTrackVolume = (state: any, {volume}: {volume: any}) => state.merge({volume})

export const setTrackDuration = (state: any, {duration}: {duration: number}) => state.merge({duration})

export const setTrackRepeat = (state: any, {repeat}: {repeat: boolean}) => state.merge({repeat})


/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
    [Types.SET_ACTIVE_BAND]: activeBand,

    [Types.REQUEST_TRACKS_LIST]: tracksListRequest,
    [Types.SUCCESS_TRACKS_LIST]: tracksListSuccess,
    [Types.FAILURE_TRACKS_LIST]: tracksListFailure,

    [Types.PLAY_TRACK]: playActiveTrack,
    [Types.PAUSE_TRACK]: pauseActiveTrack,
    [Types.SET_VOLUME]: setTrackVolume,

    [Types.SET_DURATION]: setTrackDuration,
    [Types.SET_REPEAT]: setTrackRepeat

});
