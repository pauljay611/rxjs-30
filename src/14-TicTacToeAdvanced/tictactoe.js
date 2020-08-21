import { fromEvent } from 'rxjs'
import {
	withLatestFrom,
	takeWhile,
	scan,
	map,
	tap,
	merge
} from 'rxjs/operators'
import { userClick$ } from './action'
import { gameState$, initState } from './gameState'
import checkWinner from './checkWinner'

export default function tictactoe(board, player, blocks, reset) {
	const board$ = fromEvent(board, 'click')
	const reset$ = fromEvent(reset, 'click')
	player.textContent = initState.nextPlayer

	userClick$(board$.pipe(merge(reset$)))
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
	if (move < 0) return JSON.parse(JSON.stringify(initState))

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
