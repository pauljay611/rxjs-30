import { BehaviorSubject } from 'rxjs'

export const initState = {
	board: Array(9).fill(''),
	nextPlayer: 'O',
	finished: false,
	winner: null
}

//proxy subject needed to break cicrcular dependency.
export const gameState$ = new BehaviorSubject(initState)
