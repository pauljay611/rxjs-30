import { fromEvent } from 'rxjs'
import { map, merge } from 'rxjs/operators'

export default function alert(button, input) {
	const click$ = fromEvent(button, 'click')
	const input$ = fromEvent(input, 'change')
	click$
		.pipe(
			merge(input$),
			map((e) => e.target.value)
		)
		.subscribe((message) => {
			window.alert(message)
		})
}
