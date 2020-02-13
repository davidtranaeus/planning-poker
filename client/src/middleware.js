import io from 'socket.io-client';
import { END_TASK, RECEIVE_TASK, RECEIVE_RESULTS, END_RESULTS } from './actions'

export const socketMiddleware = url => {
  return store => {
    const socket = io(url);

    socket.on('new task', task => {
      store.dispatch({
        type: RECEIVE_TASK,
        task
      });
    });

    socket.on('results', results => {
      store.dispatch({
        type: RECEIVE_RESULTS,
        results
      })
    })

    return next => action => {
      if (action.type === END_TASK) {
        socket.emit('end task', {
          isFinished: action.isFinished,
          selectedCard: action.isFinished ? store.getState().cards.find(c => c.selected).value : "None"
        });
      }

      if (action.type === END_RESULTS) {
        socket.emit('end results', {
          isFinished: action.isFinished
        })
      }
      return next(action);
    }
  }
}