import React from 'react';

const Task = ({ task, finished, hasSelectedCard, endRound }) => {
  return (
    <div className="task">
      <h1>{task}</h1>
      <button 
        className={`${finished ? "selected" : ""}`} 
        onClick={() => endRound()}>
          Done
      </button>
    </div>)
}

export default Task;