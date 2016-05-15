"use strict";
var actions_1 = require('./actions');
function createRatMiddleware() {
    return function (_a) {
        var dispatch = _a.dispatch, getState = _a.getState;
        return function (next) { return function (action) {
            var params = null;
            if (action.constructor === Array) {
                params = action.slice(1);
                action = action[0];
            }
            if (typeof action === 'string') {
                action = actions_1.default.actions[action];
                switch (typeof action) {
                    case 'object':
                        return next(action);
                    case 'function':
                        if (params && params.length) {
                            return next(action(dispatch, getState).apply(void 0, params));
                        }
                        return action(dispatch, getState);
                    case 'undefined':
                        console.log("rat action not in list of actions. Use \"rat.add('ACTION_NAME')\" to add new actions: " + action);
                        return;
                    default:
                        console.log("rat: invalid action dispatched. Should be an object or function but was \"" + typeof action + "\" : " + action);
                        return;
                }
            }
            if (typeof action === 'function') {
                return action(dispatch, getState);
            }
            return next(action);
        }; };
    };
}
var ratMiddleware = createRatMiddleware();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ratMiddleware;
