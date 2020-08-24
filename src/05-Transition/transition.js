import { timer } from 'rxjs'

export default function transition(circle) {
	const { innerWidth, innerHeight } = window

	const circleRect = circle.getBoundingClientRect()

	let { posX, posY } = {
		posX: circleRect.left,
		posY: circleRect.top
	}
	const direct = {
		x: 1,
		y: 1
	}

	const circle$ = timer(1000, 1)

	circle$.subscribe(() => {
		if (posY >= innerHeight - circleRect.height) {
			direct.y = -1
		}
		if (posX >= innerWidth - circleRect.width) {
			direct.x = -1
		}
		if (posY <= 0) {
			direct.y = 1
		}
		if (posX <= 0) {
			direct.x = 1
		}
		circle.style.left = `${(posX += direct.x)}px`
		circle.style.top = `${(posY += direct.y)}px`
	})
}
