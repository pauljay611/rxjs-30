import { filter, map, withLatestFrom, tap } from 'rxjs/operators'
import { gameState$ } from './gameState'

export const userClick$ = (board$) =>
	board$.pipe(
		map((val) => val.target.dataset.index - 1),
		withLatestFrom(gameState$),
		filter(([pos, state]) => state.board[pos] === '' || pos < 0),
		map(([pos]) => pos)
	)
