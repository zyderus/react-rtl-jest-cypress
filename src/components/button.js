import React from 'react'

const Button = ({ onClick, children }) => {
  return (
    <button dataTestId="show" onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
