import { actionsType, fetchDataSuccess } from './actions'
import { combineEpics, ofType } from 'redux-observable'
import { ajax } from 'rxjs/ajax'
import { mergeMap, map } from 'rxjs/operators'

const fetchDataEpic = (action$) =>
	action$.pipe(
		ofType(actionsType.FETCH_DATA),
		mergeMap((action) =>
			ajax
				.getJSON(`https://api.github.com/users/${action.payload}`)
				.pipe(map((response) => fetchDataSuccess(response)))
		)
	)

export default combineEpics(fetchDataEpic)
