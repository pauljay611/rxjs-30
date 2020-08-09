import alert from './alert'

describe('Alert testing', () => {
	it('trigger alert', () => {
		window.alert = jest.fn()
		const button = document.createElement('button')
		const input = document.createElement('input')
		const expectMessage = 'Errrrrr'

		alert(button, input)
		input.value = expectMessage

		if ('createEvent' in document) {
			// create custom event
			const evt = document.createEvent('HTMLEvents')
			evt.initEvent('change', false, true)
			input.dispatchEvent(evt)
		}
		// else input.fireEvent('onchange')

		button.click()
		expect(window.alert).toBeCalledWith(expectMessage)
	})
})
