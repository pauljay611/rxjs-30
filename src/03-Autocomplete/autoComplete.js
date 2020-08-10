import { fromEvent } from 'rxjs'
import { map, merge, debounceTime, takeUntil, repeat } from 'rxjs/operators'

function mockVal(str, repeat = 1) {
	return str.repeat(repeat)
}

function getSelectionHTML(list) {
	return list.map((i) => `<p>${i}</p>`).join('')
}

export default function autoComplete(input, panel) {
	const change$ = fromEvent(input, 'keyup')
	const focus$ = fromEvent(input, 'focus')
	const blur$ = fromEvent(input, 'blur')

	blur$.subscribe(() => {
		panel.innerHTML = ''
	})

	const $inputChange = focus$.pipe(merge(change$))

	$inputChange
		.pipe(
			debounceTime(500),
			takeUntil(blur$),
			map((e) => e.target.value),
			repeat()
		)
		.subscribe((v) => {
			panel.innerHTML = getSelectionHTML([
				mockVal(v, 1),
				mockVal(v, 2),
				mockVal(v, 3)
			])
		})
}
