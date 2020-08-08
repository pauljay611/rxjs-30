import { fromEvent, Subject } from 'rxjs'
import { map, filter } from 'rxjs/operators'

export default function todo(list, add) {
	const list$ = fromEvent(list, 'click')
	const add$ = fromEvent(add, 'click')
	const subject = new Subject()

	const observable = list$.pipe(
		filter((e) => e.target.matches('button')),
		map((e) => e.target)
	)
	observable.subscribe(subject)

	subject.pipe(filter((e) => e.closest('.btn-edit'))).subscribe((res) => {
		const input = list.querySelector('.input-' + res.dataset.index)
		input.getAttribute('disabled') === ''
			? input.removeAttribute('disabled')
			: input.setAttribute('disabled', '')
		res.textContent = res.textContent === 'Edit' ? 'Done' : 'Edit'
	})

	subject.pipe(filter((e) => e.closest('.btn-delete'))).subscribe((res) => {
		const item = list.querySelector('.el-' + res.dataset.index)
		item.remove()
	})

	add$.subscribe(() => {
		list.appendChild(renderEmptyItem())
	})

	let index = 0
	function renderEmptyItem() {
		const li = document.createElement('li')
		li.classList.add(`el-${index}`)
		li.innerHTML = `
		    <input class="input-${index}" placeholder="item" disabled />
		    <button class="btn-edit" data-index=${index}>Edit</button>
		    <button class="btn-delete" data-index=${index}>Delete</button>
        `
		index++
		return li
	}
}
