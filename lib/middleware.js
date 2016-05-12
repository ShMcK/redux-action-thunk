"use strict";
var actions_1 = require('./actions');
function createRamMiddleware() {
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) { return function (action) {
            if (typeof action === 'string') {
                var a = actions_1.default.actions[action];
                if (typeof a === 'function') {
                    return a(dispatch, getState);
                }
                else if (typeof a === 'object') {
                    return next(a);
                }
                else if (typeof a === 'undefined') {
                    console.log("ram action not in list of actions. Use ram.addAction to add new actions: " + a);
                }
                else {
                    console.log("ram: invalid action dispatched. Should be an object or function but was \"" + typeof a + "\" : " + a);
                }
            }
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            return next(action);
        }; };
    };
}
var ramMiddleware = createRamMiddleware();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ramMiddleware;
