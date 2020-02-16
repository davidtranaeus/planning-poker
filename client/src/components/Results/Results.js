import React from 'react';
import './Results.css'

const Results = ({ results, task, endResults, hasEndedResults }) => {
  const groupedResults = results.reduce((groups, result) => {
    const idx = groups.findIndex(g => g.selectedCard === result.selectedCard);
    if (idx > -1) {
      groups[idx].voters = [
        ...groups[idx].voters, 
        result.name
      ]
    } else {
      groups = [...groups, { 
        selectedCard: result.selectedCard,
        voters: [result.name]
      }]
    }
    return groups;
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