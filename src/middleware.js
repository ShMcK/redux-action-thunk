function createRamMiddleware(extraArgument) {
	return ({
		dispatch,
		getState
	}) => next => action => {
		if (typeof action === 'string') {
			// find registered action
			const a = ram.actions[action];
			// handle thunks
			if (typeof a === 'function') {
				return a(dispatch, getState, extraArgument);
				// normal actions
			} else if (typeof a === 'object') {
				return next(a);
			} else if (typeof a === 'undefined') {
				console.log(`ram action not in list of actions. Use ram.addAction to add new actions: ${a}`)
			} else {
				console.log(`ram: invalid action dispatched. Should be an object or function but was "${typeof a}" : ${a}`);
			}
		}
		return next(action);
	};
}

const ramMiddleware = createRamMiddleware();
