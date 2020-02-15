import React from 'react';

const Button = ({ isFinished, isDisabled, finish }) => {
  // Flytta upp hasSelected och döp om till typ isDisabled så button blir mer generell
  return (
    <button 
      className={`${isFinished ? "selected" : ""}`} 
      onClick={() => finish(!isFinished)}
      disabled={isDisabled}>
        {`${isFinished ? "Change vote" : "Finish"}`}
    </button>
  )
}

export default Button;