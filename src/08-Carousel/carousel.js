import { fromEvent, BehaviorSubject } from 'rxjs'
import { withLatestFrom, throttleTime } from 'rxjs/operators'

export default function carousel(container) {
	const bgColors = ['#eee', '#c5c', '#b44']
	const defaultVal = 0
	container.style.backgroundColor = bgColors[defaultVal]
	const board = new BehaviorSubject(defaultVal)
	const wheel$ = fromEvent(container, 'wheel')
	wheel$
		.pipe(throttleTime(100), withLatestFrom(board))
		.subscribe(([e, val]) => {
			if (e.deltaY < 0 && val < bgColors.length - 1) {
				board.next(val + 1)
			}
			if (e.deltaY > 0 && val > 0) {
				board.next(val - 1)
			}
			container.style.backgroundColor = bgColors[board.value]
		})
}
