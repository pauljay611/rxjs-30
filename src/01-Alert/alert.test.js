import alert from './alert'
import mockEvent from '../utils/mockEvent'

describe('Alert testing', () => {
	it('trigger alert', () => {
		window.alert = jest.fn()
		const button = document.createElement('button')
		const input = document.createElement('input')
		const expectMessage = 'Errrrrr'

		alert(button, input)
		input.value = expectMessage

		mockEvent('change', input)

		button.click()
		expect(window.alert).toBeCalledWith(expectMessage)
	})
})
