/* eslint-disable react/prop-types */
export function Square ({ children, updateBoard, index, isSelected }) {
  const className = `square ${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (

    <div onClick={handleClick} className={className}>
      {children}
    </div>

  )
}
