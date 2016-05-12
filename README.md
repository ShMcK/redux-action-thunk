# Redux Action Thunk

*Note: in Beta. Currently not yet published to NPM*

No more import types. Instead, register your actions on startup and call actions using middleware. Redux Action Thunk allows you to write more modular code, as you no longer have to import your store, action, or types. EVER.

### Before

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

### After Redux Action Thunk

```js
// actions.js
import rat from 'redux-action-thunk';

rat.add('increment', { type: 'INCREMENT'});

// component.js
dispatch('increment');
```


### Multiple Action Calls

```js
rat.add('addTwo', (dispatch, getState) => {
	dispatch('increment');
	dispatch('increment');
})
```

## Setup

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

// actions.js
import {rat} from 'redux-action-thunk';

rat.add('actionCall', { type: 'ACTION_CALL' });
```
