import './index.css'
import tictactoe from './tictactoe'

const board = document.querySelector('.board')
const player = document.querySelector('.player')
const winner = document.querySelector('.winner')

tictactoe(board, player, winner)
