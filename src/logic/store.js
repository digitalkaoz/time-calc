import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers/reducers'

const loggerMiddleware = createLogger()
const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        composeEnhancers(applyMiddleware(
            thunkMiddleware,
            loggerMiddleware
        ))
    )
}
