import { fromEvent, timer, BehaviorSubject } from 'rxjs'
import { map, exhaustMap, takeWhile, tap, withLatestFrom } from 'rxjs/operators'

export default function counter(input, display) {
	const input$ = fromEvent(input, 'change')
	const timer$ = timer(1000, 20)
	const currentNumber = new BehaviorSubject(0)

	input$
		.pipe(
			map((e) => e.target.value),
			exhaustMap((endTime) =>
				timer$.pipe(
					withLatestFrom(currentNumber),
					map((_, n) => n),
					tap((v) => currentNumber.next(v + 1)),
					takeWhile((val) => val <= endTime)
				)
			)
		)
		.subscribe((val) => {
			console.log(val)
			display.innerHTML = val
		})
}
