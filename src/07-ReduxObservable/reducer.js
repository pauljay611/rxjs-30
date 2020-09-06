import { actionsType } from './actions'

const reducer = (state = { data: null, loading: false }, action) => {
	switch (action.type) {
		case actionsType.FETCH_DATA:
			return { ...state, loading: true }
		case actionsType.FETCH_DATA_SUCCESS:
			return { ...state, data: action.payload, loading: false }
		default:
			return state
	}
}

export default reducer
