import io from 'socket.io-client';
import { END_ROUND, NEW_TASK } from './actions'

// https://gist.github.com/markerikson/3df1cf5abbac57820a20059287b4be58

export const socketMiddleware = url => {
  return store => {
    const socket = io(url);

    socket.on('new task', task => {
      store.dispatch({
        type: NEW_TASK,
        payload: task
      });
    });

    return next => action => {
      if (action.type === END_ROUND) {
        socket.emit('end round', action.payload);
      }
      return next(action);
    }
  }
}