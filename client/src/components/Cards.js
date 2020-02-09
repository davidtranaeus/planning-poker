import React from 'react';

const Cards = ({ cards, selectCard }) => {
  return <ul className="cards">
    {cards.map((card, listId) => {
      return <li 
        className={`card ${card.selected ? "selected" : "" }`} 
        key={listId} 
        onClick={() => selectCard(card.id)}>
          {card.value}
        </li>
    })}
  </ul>
}

export default Cards;