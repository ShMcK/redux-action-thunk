# Redux Action Thunk

No more import types. Instead, register your actions on startup and call actions using middleware. Redux Action Thunk allows you to write more modular code, as you no longer have to import your store, action, or types. EVER.

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

```js
rat.add('ADD_TWO', (dispatch, getState) => {
	dispatch('INCREMENT');
	dispatch('INCREMENT');
})
```

### Does not effect regular action calls

```js
rat.add('ACTION_CALL');

dispatch({ type: 'ACTION_CALL' }); // works
dispatch('ACTION_CALL'); // works
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
