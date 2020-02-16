import React from 'react';
import './Results.css'

const Results = ({ results, task, endResults, hasEndedResults }) => {

  const groupedResults = results.reduce((groups, result) => {
    if (groups.some(g => g.selectedCard === result.selectedCard)) {
      return groups.map(g => {
        if (g.selectedCard === result.selectedCard) {
          return {
            ...g,
            voters: [...g.voters, result.name]
          }
        } else return g
      })
    } else {
      return [...groups, { 
        selectedCard: result.selectedCard,
        voters: [result.name]
      }]
    }
  }, [])

  const resultList = groupedResults.map((r, id) => {
    return (
      <li key={id} className="group">
        <div className="group--title">{r.selectedCard}</div>
        {r.voters.map((name, id) => <div key={id}>{name}</div>)}
      </li>)
  })

  return (
    <div className="results">
      <div className="task">
        Results: {task}
      </div>
      <ul>{resultList}</ul>
      <button 
        className={`${hasEndedResults ? "button--pressed" : "button--unpressed"}`} 
        onClick={() => endResults(!hasEndedResults)}>
          {`${hasEndedResults ? "Waiting for other players" : "Next task"}`}
      </button>
    </div>
  )
}

export default Results;