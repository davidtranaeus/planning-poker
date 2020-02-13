import React from 'react';

const Results = ({ results, endResults, hasEndedResults }) => {

  const resultList = results.map((r, id) => {
    return <li key={id}>{r.name}: {r.selectedCard}</li>
  })

  return (
    <div>
      <ul>{resultList}</ul>
      <div onClick={() => endResults(!hasEndedResults)}>Next task</div>
      {hasEndedResults && (
        <div>Pressed</div>
      )}
    </div>
  )
}

export default Results;