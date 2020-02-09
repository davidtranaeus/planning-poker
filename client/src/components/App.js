import React from 'react';
import './App.css';
import CardsContainer from '../containers/CardsContainer'
import TaskContainer from '../containers/TaskContainer'

const App = () => {
  return (
    <div className="app">
      <TaskContainer />
      <CardsContainer />
    </div>
  );
}

export default App;
