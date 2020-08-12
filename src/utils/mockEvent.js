export default function mockEvent(eventName, node) {
	if (!document.createEvent) return
	// create custom event
	const evt = document.createEvent('HTMLEvents')
	evt.initEvent(eventName, false, true)
	node.dispatchEvent(evt)
}
