import rat from './actions';

function createRatMiddleware() {
  return ({
    dispatch,
    getState
  }) => next => action => {
    // handle params
    let params = null;
    if (action.constructor === Array) {
      params = action.slice(1);
      action = action[0];
    }
    if (typeof action === 'string') {
      let a = rat.actions[action];

      // handle thunks
      if (typeof a === 'function') {
        // handle params
        if (params && params.length) {
          a = a(dispatch, getState)(...params);
          return next(a);
        }
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
    return next(action);
  };
}
const ratMiddleware = createRatMiddleware();
export default ratMiddleware;
