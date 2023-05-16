export function getAWinner (board) {
  const ROWS = board.length // 8
  const COLS = board[0].length // 7

  // Verifica si hay un ganador en las filas
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const cell = board[r][c]
      if (cell && cell === board[r][c + 1] && cell === board[r][c + 2] && cell === board[r][c + 3]) {
        return cell
      }
    }
  }

  // Verifica si hay un ganador en las COLUMN
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = board[r][c]
      // console.log('board:', { r }, { c })
      if (cell && cell === board[r + 1][c] && cell === board[r + 2][c] && cell === board[r + 3][c]) {
        return cell
      }
    }
  }

  // Verifica si hay un ganador en las diagonales ascendentes
  for (let r = 3; r < ROWS; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const cell = board[r][c]
      if (cell && cell === board[r - 1][c + 1] && cell === board[r - 2][c + 2] && cell === board[r - 3][c + 3]) {
        return cell
      }
    }
  }

  // Verifica si hay un ganador en las diagonales descendentes
  for (let r = 0; r < ROWS - 3; r++) {
    for (let c = 0; c < COLS - 3; c++) {
      const cell = board[r][c]
      if (cell && cell === board[r + 1][c + 1] && cell === board[r + 2][c + 2] && cell === board[r + 3][c + 3]) {
        return cell
      }
    }
  }

  // No hay ganador todavía
  return null
}

export const checkEndGame = (board) => {
  const isLeftSpace = board.map(row => {
    return row.every((e) => e !== null)
  })
  return isLeftSpace.every((e) => e === true)
}
