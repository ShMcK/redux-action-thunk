import rat from './actions';

function createRatMiddleware() {
  return ({
    dispatch,
    getState
  }) => next => action => {

    // handle any params
    let params: any[] = null;
    if (action.constructor === Array) {
      params = action.slice(1);
      action = action[0];
    }

    // dispatch uses RAT
    if (typeof action === 'string') {
      action = rat.actions[action];

      switch (typeof action) {

        case 'object':
          return next(action);

        case 'function':
          if (params && params.length) {
            return next(action(dispatch, getState)(...params));
          }
          return action(dispatch, getState);

        case 'undefined':
          console.log(`rat action not in list of actions. Use "rat.add('ACTION_NAME')" to add new actions: ${action}`);
          return;

        default:
          console.log(`rat: invalid action dispatched. Should be an object or function but was "${typeof action}" : ${action}`);
          return;
      }
    }
    // redux thunk
    if (typeof action === 'function') {
      return action(dispatch, getState);
    }
    // normal dispatch, do nothing
    return next(action);
  };
}
const ratMiddleware = createRatMiddleware();
export default ratMiddleware;
