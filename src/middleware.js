function createMiddleware() {
	return ({
		action, // string action name
		dispatch,
		getState
	}) => next => a => {
		if (typeof a === 'function') {
			return action(action, dispatch, getState);
		}
		return next(red.actions[a]);
	};
}

const middleware = createMiddleware();
export default middleware;
