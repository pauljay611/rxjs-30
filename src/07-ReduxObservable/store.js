import { createStore, applyMiddleware, compose } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import fetchDataEpic from './epics'
import reducer from './reducer'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
	const store = createStore(
		reducer,
		composeEnhancers(applyMiddleware(epicMiddleware))
	)

	epicMiddleware.run(fetchDataEpic)

	return store
}
