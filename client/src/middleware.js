import io from 'socket.io-client';
import { END_TASK, 
  END_RESULTS,
  receiveResults,
  receiveTask,
  SUBMIT_TASK, } from './actions'

export const socketMiddleware = url => {
  return store => {
    const socket = io(url);

    socket.on('no tasks', () => {
      store.dispatch(receiveTask(false))
    })

    socket.on('new task', task => {
      console.log(task)
      store.dispatch(receiveTask(task))
    });

    socket.on('results', results => {
      store.dispatch(receiveResults(results))
    })

    return next => action => {
      
      if (action.type === SUBMIT_TASK) {
        socket.emit('submit task', {
          task: action.task
        })
      }

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