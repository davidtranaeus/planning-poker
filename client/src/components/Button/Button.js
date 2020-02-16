import React from 'react';
import './Button.css'

const Button = ({ isFinished, isDisabled, finish }) => {
  return (
    <button 
      className={`${isFinished ? "button--pressed" : "button--unpressed"}`} 
      onClick={() => finish(!isFinished)}
      disabled={isDisabled}>
        {`${isFinished ? "Change vote" : "Finish"}`}
    </button>
  )
}

export default Button;