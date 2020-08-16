import { fromEvent } from 'rxjs'
import { filter, map, takeWhile } from 'rxjs/operators'

const winnerList = createWinnerTable()
const initPlayer = 'O'
let keepGoing = true

export default function tictactoe(board, player, reset) {
	const board$ = fromEvent(board, 'click')
	const reset$ = fromEvent(reset, 'click')
	player.textContent = initPlayer
	board$
		.pipe(
			map((b) => b.target),
			filter(
				(fb) =>
					fb.classList.contains('block') &&
					fb.textContent.length === 0
			),
			takeWhile(() => keepGoing)
		)
		.subscribe((e) => {
			const curGame = board.querySelectorAll('.block')
			e.textContent = player.textContent
			if (checkWinner(e.dataset.index - 1, curGame, player.textContent)) {
				keepGoing = window.confirm(
					player.textContent + ' winnnnnnnnn, next?'
				)
				keepGoing ??
					resetBlock(player, board.querySelectorAll('.block'))
			}
			if (Array.from(curGame).every((b) => b.textContent.length > 0)) {
				keepGoing = window.confirm('tietietie, next?')
				keepGoing ??
					resetBlock(player, board.querySelectorAll('.block'))
			}
			player.textContent = player.textContent === 'X' ? 'O' : 'X'
		})
	reset$.pipe(takeWhile(() => keepGoing)).subscribe(() => {
		resetBlock(player, board.querySelectorAll('.block'))
	})
}

function resetBlock(player, blocks) {
	player.textContent = initPlayer
	blocks.forEach((block) => {
		block.textContent = ''
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

function createWinnerTable() {
	const list = []

	for (let i = 1, j = 1; i < 4; i++, j += 3) {
		const vertical = [i, i + 3, i + 6]
		const horizontal = [j, j + 1, j + 2]
		list.push(vertical.join(''))
		list.push(horizontal.join(''))
	}

	list.push('159', '357')

	const winTable = new Array(9)

	for (let i = 0; i < 9; i++) {
		winTable[i] = list
			.filter((item) => item.includes(String(i + 1)))
			.map((f) => f.split('').filter((w) => w !== String(i + 1)))
	}

	return winTable
}
