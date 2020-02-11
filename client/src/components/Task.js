import React from 'react';

const Task = ({ task, isFinished, hasSelected, endRound }) => {
  return <div className="task">
      <h1>{task}</h1>
      <button 
        className={`${isFinished ? "selected" : ""}`} 
        onClick={() => endRound(!isFinished)}
        disabled={!hasSelected}>
          {`${isFinished ? "Change vote" : "Finish"}`}
      </button>
    </div>
}

export default Task;