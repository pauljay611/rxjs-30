import React from 'react'
import ReactDOM from 'react-dom'
import configureStore from './store'
import { Provider } from 'react-redux'
import Container from './container'

const store = configureStore()

const App = () => {
	return (
		<Provider store={store}>
			<Container />
		</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
