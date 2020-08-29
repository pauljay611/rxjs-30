import { fromEvent, forkJoin, race, of } from 'rxjs'
import { map, mergeMap, catchError } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

export default function request(buttonAll, buttonRace, buttonThen) {
	const allApi = [
		'https://api.github.com/users?per_page=6',
		'https://api.github.com/users?per_page=6',
		'https://api.github.com/users?per_page=7'
	]
	const allReq$ = allApi.map((i) => getRequest(i))

	const clickAll$ = fromEvent(buttonAll, 'click')
	const clickRace$ = fromEvent(buttonRace, 'click')
	const clickThen$ = fromEvent(buttonThen, 'click')
	RxPromiseAll(allReq$, clickAll$).subscribe((e) => console.log(e))
	RxPromiseRace(allReq$, clickRace$).subscribe((e) => console.log(e))
	RxPromiseThen(allReq$, clickThen$).subscribe((e) => console.log(e))
}

function getRequest(item) {
	return ajax(item).pipe(
		map((res) => res.response),
		catchError((error) => {
			console.log('error: ', error)
			return of(error)
		})
	)
}

function RxPromiseThen(requests, event$) {
	return event$.pipe(
		mergeMap(() =>
			requests[0].pipe(
				mergeMap(() => requests[1].pipe(mergeMap(() => requests[2])))
			)
		)
	)
}

function RxPromiseAll(requests, event$) {
	return event$.pipe(mergeMap(() => forkJoin(...requests)))
}

function RxPromiseRace(requests, event$) {
	return event$.pipe(mergeMap(() => race(...requests)))
}
