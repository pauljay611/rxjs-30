import { fromEvent } from 'rxjs'
import { filter, map, takeWhile } from 'rxjs/operators'

const winnerList = createWinnerAdjList()

export default function tictactoe(board, player, winner) {
	const initPlayer = 'O'
	const board$ = fromEvent(board, 'click')
	player.textContent = initPlayer
	board$
		.pipe(
			map((b) => b.target),
			filter(
				(fb) =>
					fb.classList.contains('block') &&
					fb.textContent.length === 0
			),
			takeWhile(() => winner.textContent.length === 0)
		)
		.subscribe((e) => {
			const curGame = board.querySelectorAll('.block')
			e.textContent = player.textContent
			if (checkWinner(e.dataset.index - 1, curGame, player.textContent)) {
				window.alert('winnnnnnnnn')
				winner.textContent = player.textContent
			}
			if (Array.from(curGame).every((b) => b.textContent.length > 0)) {
				window.alert('Tie')
				winner.textContent = 'Tie'
			}
			player.textContent = player.textContent === 'X' ? 'O' : 'X'
		})
}

function checkWinner(index, blockList, player) {
	for (let i = 0; i < winnerList[index].length; i++) {
		const hasLine = winnerList[index][i].every(
			(n) => blockList[n - 1].textContent === player
		)
		if (hasLine) return true
	}
	return false
}

function createWinnerAdjList() {
	const list = []

	for (let i = 1, j = 1; i < 4; i++, j += 3) {
		const vertical = [i, i + 3, i + 6]
		const horizontal = [j, j + 1, j + 2]
		list.push(vertical.join(''))
		list.push(horizontal.join(''))
	}

	list.push('159', '357')

	const adjList = new Array(9)

	for (let i = 0; i < 9; i++) {
		adjList[i] = list
			.filter((item) => item.includes(String(i + 1)))
			.map((f) => f.split('').filter((w) => w !== String(i + 1)))
	}

	return adjList
}
