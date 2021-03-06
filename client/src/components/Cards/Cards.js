import React from 'react';
import './Cards.css'

const Cards = ({ cards, selectCard, isFinished }) => {

  return <ul className="cards">
    {cards.map((card, listId) => {
      return <li 
        className={`card ${card.selected ? "card--selected" : "" }`} 
        key={listId} 
        onClick={() => {
          if (!isFinished) selectCard(card.id)
        }}
        disabled={isFinished}>
          {card.value}
        </li>
    })}
  </ul>
}

export default Cards;