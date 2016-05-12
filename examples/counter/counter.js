class Rat {
	constructor() {
		this.actions = {};
	}
	add(name, action) {
		if (!this.actions[name]) {
			this.actions[name] = action;
		} else {
			console.log(`Warning: key "${name}" already exists on "actions".`);
		}
	}
}
const rat = new Rat();

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
				console.log(`rat action not in list of actions. Use rat.addAction to add new actions: ${a}`);
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


// actions

rat.add('increment', {
	type: 'INCREMENT'
});
rat.add('decrement', {
	type: 'DECREMENT'
});
rat.add('addTwo', (dispatch, getState) => {
	dispatch('increment');
	dispatch('increment');
})


// reducer

function counter(state, action) {
	if (typeof state === 'undefined') {
		return 0
	}

	switch (action.type) {
		case 'INCREMENT':
			return state + 1
		case 'DECREMENT':
			return state - 1
		default:
			return state
	}
}


// store

var applyMiddleware = Redux.applyMiddleware
var store = Redux.createStore(
	counter,
	applyMiddleware(ratMiddleware)
)
var valueEl = document.getElementById('value')

// view

function render() {
	valueEl.innerHTML = store.getState().toString()
}

render()
store.subscribe(render)

document.getElementById('increment')
	.addEventListener('click', function() {
		store.dispatch('increment')
	})

document.getElementById('decrement')
	.addEventListener('click', function() {
		store.dispatch('decrement')
	})

document.getElementById('thunkDispatch')
	.addEventListener('click', function() {
		store.dispatch('addTwo')
	})

document.getElementById('incrementAsync')
	.addEventListener('click', function() {
		setTimeout(function() {
			store.dispatch('increment')
		}, 1000)
	})
