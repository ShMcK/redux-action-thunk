// middleware
class Ram {
	constructor() {
		this.actions = {};
	}
	addAction(name, action) {
		if (!this.actions[name]) {
			this.actions[name] = action;
		} else {
			console.log(`Warning: key "${key}" already exists on "${target}".`);
		}
	}
}
const ram = new Ram();


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
				console.log(`ram error: action not in list of actions. Use ram.addAction to add new actions: ${a}`)
			} else {
				console.log(`ram error: invalid action dispatched. Should be an object or function but was "${typeof a}" : ${a}`);
			}
		}
		return next(action);
	};
}

const ramMiddleware = createRamMiddleware();

// actions

ram.addAction('increment', {
	type: 'INCREMENT'
});
ram.addAction('decrement', {
	type: 'DECREMENT'
});
ram.addAction('addTwo', (dispatch, getState) => {
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
	applyMiddleware(ramMiddleware)
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
