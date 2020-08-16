import './index.css'
import tictactoe from './tictactoe'

const board = document.querySelector('.board')
const player = document.querySelector('.player')
const reset = document.querySelector('.reset')

tictactoe(board, player, reset)
