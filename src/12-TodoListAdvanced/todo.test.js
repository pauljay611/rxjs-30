import todo, { renderEmptyItem } from './todo'

describe('Todo testing', () => {
	let list
	let buttonAdd

	beforeEach(() => {
		list = document.createElement('ul')
		buttonAdd = document.createElement('button')
		buttonAdd.classList.add('btn-add')
		todo(list, buttonAdd)
	})

	it('add new item', () => {
		buttonAdd.click()
		let index = 0
		const expectList = document.createElement('ul')
		expectList.appendChild(renderEmptyItem(index))
		expect(list.innerHTML).toEqual(expectList.innerHTML)
	})
	it('remove item', () => {
		buttonAdd.click()
		buttonAdd.click()
		const buttonDelete = list.querySelector('.btn-delete')
		buttonDelete.click()
		expect(list.childNodes.length).toEqual(1)
	})
	it('edit item', () => {
		buttonAdd.click()
		const buttonEdit = list.querySelector('.btn-edit')
		buttonEdit.click()
		const input = list.querySelector(`.input-${buttonEdit.dataset.index}`)
		expect(input.getAttribute('disabled')).toEqual(null)
		expect(buttonEdit.textContent).toEqual('Done')
		buttonEdit.click()
		expect(input.getAttribute('disabled')).toEqual('')
		expect(buttonEdit.textContent).toEqual('Edit')
	})
})
