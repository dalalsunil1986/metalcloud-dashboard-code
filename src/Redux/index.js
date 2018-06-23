/* eslint-disable global-require */
import { combineReducers } from 'redux';

const RootReducer = combineReducers({
  sidebar: require('./SidebarRedux').reducer,
  metal: require('./MetalRedux').reducer
})

export default RootReducer
