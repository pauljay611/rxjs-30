import { filter, map, withLatestFrom, tap } from 'rxjs/operators'
import { gameState$ } from './gameState'

export const getClickPosition$ = (board$) =>
	board$.pipe(map((val) => val.target.dataset.index - 1))

export const userClick$ = (board$) =>
	getClickPosition$(board$).pipe(
		withLatestFrom(gameState$),
		filter(([pos, state]) => state.board[pos] === ''),
		map(([pos]) => pos)
	)
