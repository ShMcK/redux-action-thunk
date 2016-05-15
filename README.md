# Redux Action Thunk

Move your actions & types into Redux middleware.

No more importing actions & types. Instead, register your actions on startup and call them by dispatching strings. Redux Action Thunk (RAT) allows you to write more [modular Redux code](https://github.com/ShMcK/modular-redux-style-guide).

### Without RAT

```js
// actions.js
import {ACTION_CALL} from './types';
export function actionCall() {
  return { type: 'ACTION_CALL' };
}

// component.js
import {actionCall} from '../../actions';

dispatch(actionCall);
```

### With RAT

Code becomes simplified, without relative paths linking to actions. You can now write redux code without loading store, actions or types in your files.

```js
// actions.js
import rat from 'redux-action-thunk';

rat.add('INCREMENT');
// creates action and type { type: 'INCREMENT '}

// component.js
dispatch('INCREMENT');
```


### Multiple Action Calls

Use thunks to dispatch multiple calls.

```js
rat.add('ADD_TWO', (dispatch, getState) => {
	dispatch('INCREMENT');
	dispatch('INCREMENT');
})
```

### Does not effect regular action calls

```js
rat.add('ACTION_CALL');

dispatch({ type: 'ACTION_CALL' }); // ✓
dispatch('ACTION_CALL'); // ✓
```

### Using params

Dispatch additional params inside of an array.

```js
rat.add('ADD_TOGETHER', (dispatch, getState) => (x, y) => {
	const total = x + y;
	return {
		type: 'ADD_TOGETHER',
		payload: {
			total
		}
	};
});

// dispatch an array including the param values
store.dispatch(['ADD_TOGETHER', 3, 4]);
```

## Setup

- Install the package.

`> npm install redux-action-thunk`

- load the Redux middleware

```js
// store.js
import {applyMiddleware, createStore} from 'redux';
import {ratMiddleware} from 'rat';
import reducer from '../reducers';

const store = createStore(
  reducer,
  applyMiddleware(ratMiddleware)
);

export default store;
```

- add actions

```js
// actions.js
import {rat} from 'redux-action-thunk';

rat.add('ACTION_CALL');
```

- dispatch actions

```js
store.dispatch('ACTION_CALL');
```
