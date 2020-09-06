export const actionsType = {
	FETCH_DATA: 'FETCH_DATA',
	FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
	FETCH_DATA_FAILED: 'FETCH_DATA_FAILED'
}

export const fetchData = () => {
	return {
		type: actionsType.FETCH_DATA
	}
}

export const fetchDataSuccess = (payload) => {
	return {
		type: actionsType.FETCH_DATA_SUCCESS,
		payload
	}
}

export const fetchDataFailed = () => {
	return {
		type: actionsType.FETCH_DATA_FAILED
	}
}
