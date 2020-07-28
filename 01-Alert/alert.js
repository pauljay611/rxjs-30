import { fromEvent } from 'rxjs'

export default function alert(button, message) {
	const $click = fromEvent(button, 'click')

	$click.subscribe(() => {
		window.alert(message)
	})
}
