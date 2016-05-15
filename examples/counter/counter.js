class Rat {
	constructor() {
		this.actions = {};
	}
	add(name, action) {

		// default action type
		if (typeof action === 'undefined') {
			action = Object.assign({}, {
				type: name
			}, action)
		}

		// add actions & types
		if (!this.actions[name]) {
			this.actions[name] = action;
		} else {
			console.log(`Warning: key "${name}" already exists on "actions".`);
		}
	}
	types() {
		return Object.keys(this.actions).sort();
	}
}
const rat = new Rat();


function createRatMiddleware() {
	return ({
		dispatch,
		getState
	}) => next => action => {
		// handle params
		let params = null;
		if (action.constructor === Array) {
			params = action.slice(1)
			action = action[0];
		}
		if (typeof action === 'string') {
			let a = rat.actions[action]

			// handle thunks
			if (typeof a === 'function') {
				// has params
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
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}
		return next(action);
	};
}

const ratMiddleware = createRatMiddleware();


// actions

// default example
rat.add('INCREMENT');
rat.add('DECREMENT');
// thunk example
rat.add('ADD_TWO', (dispatch, getState) => {
	dispatch('INCREMENT');
	dispatch('INCREMENT');
});
// params example
rat.add('ADD_TOGETHER', (dispatch, getState) => (x, y) => {
	const total = x + y;
	return {
		type: 'ADD_TOGETHER',
		payload: {
			total
		}
	};
});

console.log(rat.types())

// reducer

function counter(state, action) {
	if (typeof state === 'undefined') {
		return 0
	}

	switch (action.type) {
		case 'ADD_TOGETHER':
			return state + action.payload.total;
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
		store.dispatch('INCREMENT')
	})

document.getElementById('decrement')
	.addEventListener('click', function() {
		store.dispatch('DECREMENT')
	})

document.getElementById('thunkDispatch')
	.addEventListener('click', function() {
		store.dispatch('ADD_TWO')
	})

document.getElementById('withParams')
	.addEventListener('click', function() {
		store.dispatch(['ADD_TOGETHER', 3, 4]);
	})

document.getElementById('incrementAsync')
	.addEventListener('click', function() {
		setTimeout(function() {
			store.dispatch('INCREMENT')
		}, 1000)
	})
