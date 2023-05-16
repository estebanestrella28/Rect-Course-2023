import './App.css'
import { TURN, COLUMN } from './constants'
import { useState } from 'react'
import { Square } from './components/square'
import { GameResult } from './components/gameResult'
import { getAWinner, checkEndGame } from './logic/board'
import { saveGameToStorage, resetGameStorage } from './logic/storage'
import confetti from 'canvas-confetti'
import { v4 as uuidv4 } from 'uuid'

function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return COLUMN
  })

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURN.RED
  })

  const [winner, setWinner] = useState(null)

  const updateBoard = (indexF, indexC) => {
    if (getTokenPosition(indexC) === -1 || winner) return

    // dubuja la ficha en el tablero
    const newBoard = [...board]
    newBoard[getTokenPosition(indexC)][indexC] = turn
    setBoard(newBoard)

    // change turn
    const newTurn = turn === TURN.RED ? TURN.BLUE : TURN.RED
    setTurn(newTurn)

    // comprueba si hay ganador o hay empate
    const newWinner = getAWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
    }

    // save game storage
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })

    // debug
    const tile = board[indexF][indexC]
    console.log({ indexF }, { indexC }, { tile }, { newWinner }, { newBoard })
  }

  const getTokenPosition = (indexC) => {
    // obtener el tablero 2d array
    const boardToCheck = [...board]

    // recorre cada fila y devuelve un cada elemento cuyo indice sea igual al indexC
    const fila = boardToCheck.map((col) => col[indexC])

    const correctTile = fila.findLastIndex((el) => el === null)
    // console.log({ indexC }, { fila }, { correctTile })
    if (correctTile !== null) {
      return (correctTile)
    }
    return null
  }

  const handleReset = () => {
    console.log(board)
    setBoard([
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null]
    ])
    setTurn(TURN.RED)
    setWinner(null)

    resetGameStorage()
  }

  return (

    <main className='board'>
      <h1>Connect-4</h1>

      <button onClick={handleReset}>Reiniciar Juego</button>

      <section className='game'>
        {
          board.map((subarray, indexC) => {
            return (
              subarray.map((square, indexF) => {
                return (
                  <Square updateBoard={updateBoard} indexC={indexC} indexF={indexF} key={uuidv4()}>
                    {square}
                  </Square>
                )
              })

            )
          })

        }
      </section>

      <section className='turn'>

        <Square isSelected={turn === TURN.RED}>{TURN.RED}</Square>
        <Square isSelected={turn === TURN.BLUE}>{TURN.BLUE}</Square>

      </section>

      <section>
        <GameResult handleReset={handleReset} winner={winner} />
      </section>

    </main>
  )
}

export default App
