import { fromEvent } from 'rxjs'
import { withLatestFrom, takeWhile, scan, map, tap } from 'rxjs/operators'
import { userClick$ } from './action'
import { gameState$ } from './gameState'
import checkWinner from './checkWinner'

const initPlayer = 'O'

export default function tictactoe(board, player, blocks) {
	const board$ = fromEvent(board, 'click')

	player.textContent = initPlayer

	userClick$(board$)
		.pipe(
			// compare prev state and next state
			scan(updateState, gameState$.value),
			tap((state) => gameState$.next(state)),
			takeWhile(({ finished }) => !finished, true)
		)
		.subscribe((e) => {
			player.textContent = e.nextPlayer
			draw(e.board, blocks)
			if (e.winner) {
				window.confirm(`${e.winner} win!! next?`)
				return
			}
			if (e.finished) {
				window.confirm('Tie next?')
				return
			}
		})
}

const updateState = (state, move) => {
	const updatedBoard = state.board
	updatedBoard[move] = state.nextPlayer
	const winner = checkWinner(move, updatedBoard, state.nextPlayer)
		? state.nextPlayer
		: null
	const finished = updatedBoard.every((pos) => pos !== '') || winner !== null

	return {
		board: updatedBoard,
		nextPlayer: state.nextPlayer === 'X' ? 'O' : 'X',
		finished,
		winner
	}
}

function draw(board, blocks) {
	blocks.forEach((b, i) => {
		b.textContent = board[i]
	})
}
