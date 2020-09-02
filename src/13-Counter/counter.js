import { fromEvent, timer } from 'rxjs'
import {
	map,
	merge,
	exhaustMap,
	startWith,
	scan,
	takeWhile,
	tap
} from 'rxjs/operators'

export default function counter(input, display) {
	const input$ = fromEvent(input, 'change')
	const timer$ = timer(1000, 20)
	let current = 0
	input$
		.pipe(
			map((e) => e.target.value),
			exhaustMap((endTime) =>
				timer$.pipe(
					tap(() => current++),
					takeWhile((val) => current <= endTime)
				)
			)
		)
		.subscribe((val) => {
			console.log(val)
			display.innerHTML = current
		})
}
