import './index.css'
import tictactoe from './tictactoe'

const board = document.querySelector('.board')
const player = document.querySelector('.player')
const blocks = board.querySelectorAll('.block')
const reset = document.querySelectorAll('.reset')

tictactoe(board, player, blocks, reset)
