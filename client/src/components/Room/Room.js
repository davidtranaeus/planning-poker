import React from 'react';
import './Room.css'
import CardsContainer from '../../containers/CardsContainer';
import TaskContainer from '../../containers/TaskContainer';
import ButtonContainer from '../../containers/ButtonContainer';
import { GAME_VIEW } from '../../actions'
import ResultsContainer from '../../containers/ResultsContainer';
import TaskForm from '../TaskForm/TaskForm';

const Room = ({ currentView, taskExists, submitTask }) => {

  let view;

  if (currentView === GAME_VIEW) {
    if (taskExists) {
      view = <>
        <TaskContainer />
        <CardsContainer />
        <ButtonContainer />
      </>
    } else {
      view = "Please submit a task"
    }
  } else {
    view = <ResultsContainer />
  }

  return (
    <div className="room">
      <div className="top-container">
        {view}
      </div>
      <TaskForm onSubmit={submitTask}/>
    </div>
  )
}

export default Room;