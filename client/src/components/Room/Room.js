import React from 'react';
import './Room.css'
import CardsContainer from '../../containers/CardsContainer';
import TaskContainer from '../../containers/TaskContainer';
import ButtonContainer from '../../containers/ButtonContainer';
import { GAME_VIEW } from '../../actions'
import ResultsContainer from '../../containers/ResultsContainer';

const Button = ({ currentView }) => {

  const view = currentView === GAME_VIEW
    ? (<div className="room">
        <TaskContainer />
        <CardsContainer />
        <ButtonContainer />
      </div>)
    : <ResultsContainer />

  return view
}

export default Button;