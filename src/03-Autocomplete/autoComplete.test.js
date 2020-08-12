import autoComplete, { getSelectionHTML, mockVal } from './autoComplete'
import mockEvent from '../utils/mockEvent'

describe('AutoComplete testing', () => {
	it('should return correct list on focus and blur', () => {
		window.alert = jest.fn()
		const input = document.createElement('input')
		const panel = document.createElement('div')
		panel.classList.add('panel')
		const expectText = 'er'
		const expectList = getSelectionHTML([
			mockVal(expectText, 1),
			mockVal(expectText, 2),
			mockVal(expectText, 3)
		])

		autoComplete(input, panel)

		input.value = expectText

		mockEvent('focus', input)

		setTimeout(function () {
			expect(panel.innerHTML).toEqual(expectList)
		}, 500)

		mockEvent('blur', input)
		expect(panel.innerHTML).toEqual('')
	})
})
