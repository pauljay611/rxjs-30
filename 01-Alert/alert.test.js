import alert from './alert'

describe('Alert testing', () => {
	it('trigger alert', () => {
		window.alert = jest.fn()
		const message = 'Errrrrr'
		const button = document.createElement('button')
		alert(button, message)
		button.click()
		expect(window.alert).toBeCalledWith(message)
	})
})
