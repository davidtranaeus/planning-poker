import React from 'react';

const Task = ({ task, isFinished, endRound }) => {
  return <div className="task">
      <h1>{task}</h1>
      <button 
        className={`${isFinished ? "selected" : ""}`} 
        onClick={() => endRound(!isFinished)}>
          Done
      </button>
    </div>
}

export default Task;