/* eslint-disable react/prop-types */
export function Square ({ children, updateBoard, index, indexF, indexC, isSelected }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(indexC, indexF)
    // updateBoard(index)s
  }

  return (

    <div onClick={handleClick} className={className}>
      {children}
    </div>

  )
}
