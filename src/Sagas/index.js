import { takeLatest, all } from 'redux-saga/effects'

/* ------------- Types ------------- */
import { MetalTypes } from '../Redux/MetalRedux'

/* ------------- Sagas ------------- */
import {tracksListSaga} from './MetalSagas'


/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function * root () {
  yield all([
    takeLatest(MetalTypes.REQUEST_TRACKS_LIST, tracksListSaga)
  ])
}
