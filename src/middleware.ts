import rat from './actions';

function createRatMiddleware() {
  return ({
    dispatch,
    getState
  }) => next => action => {
    if (typeof action === 'string') {
      // find registered action
      const a = rat.actions[action];
      // handle thunks
      if (typeof a === 'function') {
        return a(dispatch, getState);
        // normal actions
      } else if (typeof a === 'object') {
        return next(a);
      } else if (typeof a === 'undefined') {
        console.log(`rat action not in list of actions. Use "rat.add('ACTION_NAME')" to add new actions: ${a}`);
      } else {
        console.log(`rat: invalid action dispatched. Should be an object or function but was "${typeof a}" : ${a}`);
      }
    }
    // redux thunk
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    return next(action);
  };
}

const ratMiddleware = createRatMiddleware();
export default ratMiddleware;
