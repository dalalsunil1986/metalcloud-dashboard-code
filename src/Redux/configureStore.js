// Redux
import { createStore, applyMiddleware } from 'redux';

// Redux Middlewares
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

// Reducers
import Reducer from './index';
import RootSaga from '../Sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const middleware = applyMiddleware(sagaMiddleware);

export default function configureStore() {
    const store = createStore(Reducer, middleware);

    // Run the saga
    sagaMiddleware.run(RootSaga);

    return { store };
}
