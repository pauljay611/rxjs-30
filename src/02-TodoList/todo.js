import { fromEvent } from 'rxjs'
import { map, filter } from 'rxjs/operators'

export default function todo(list, add) {
	const list$ = fromEvent(list, 'click')
	const add$ = fromEvent(add, 'click')

	list$
		.pipe(
			filter((e) => e.target.closest('button')),
			map((e) => e.target)
		)
		.subscribe((res) => {
			if (res.closest('.btn-edit')) {
				const input = list.querySelector('.input-' + res.dataset.index)
				input.getAttribute('disabled') === ''
					? input.removeAttribute('disabled')
					: input.setAttribute('disabled', '')
				res.textContent = res.textContent === 'Edit' ? 'Done' : 'Edit'
			}
			if (res.closest('.btn-delete')) {
				const item = list.childNodes[res.dataset.index]
				item.remove()
			}
		})

	add$.subscribe(() => {
		list.appendChild(renderEmptyItem())
	})

	function renderEmptyItem() {
		const li = document.createElement('li')
		const index = list.childElementCount
		li.innerHTML = `
		    <input class="input-${index}" placeholder="item" disabled />
		    <button class="btn-edit" data-index=${index}>Edit</button>
		    <button class="btn-delete" data-index=${index}>Delete</button>
		`
		return li
	}
}
