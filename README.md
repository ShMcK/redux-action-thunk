# Redux Action Middleware (RAM)

*Note: in Beta. Currently not yet published to NPM*

No more import types. Instead, register your actions on startup and call actions using middleware. Redux Action Middleware allows you to write more modular code, as you no longer have to import your store, action, or types. EVER.

### Before Action Middleware

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

### After Redux Action Middleware

```js
// actions.js
import ram from './ram';

ram.addAction('increment', { type: 'INCREMENT'});

// component.js
dispatch('increment');
```


### Multiple Action Calls

```js
ram.addAction('addTwo', (dispatch, getState) => {
	dispatch('increment');
	dispatch('increment');
})
```

## Setup

```js
// store.js
import { applyMiddleware, createStore } from 'redux';
import {ramMiddleware} from 'ram';
import reducer from '../reducers';

const store = createStore(
  reducer,
  applyMiddleware(...ramMiddleware)
);

export default store;

// actions.js
import {ram} from 'ram';

ram.addAction('actionCall', { type: 'ACTION_CALL' });
```
