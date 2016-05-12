import ram from './actions';

function createRamMiddleware() {
  return ({
    dispatch,
    getState
  }) => next => action => {
    if (typeof action === 'string') {
      // find registered action
      const a = ram.actions[action];
      // handle thunks
      if (typeof a === 'function') {
        return a(dispatch, getState);
        // normal actions
      } else if (typeof a === 'object') {
        return next(a);
      } else if (typeof a === 'undefined') {
        console.log(`ram action not in list of actions. Use ram.addAction to add new actions: ${a}`);
      } else {
        console.log(`ram: invalid action dispatched. Should be an object or function but was "${typeof a}" : ${a}`);
      }
    }
    // redux thunk
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

const ramMiddleware = createRamMiddleware();
export default ramMiddleware;
