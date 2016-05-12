"use strict";
var Rat = (function () {
    function Rat() {
        this.actions = {};
    }
    Rat.prototype.add = function (name, action) {
        if (typeof action === 'undefined') {
            action = { type: name };
        }
        if (!this.actions[name]) {
            this.actions[name] = action;
        }
        else {
            console.log("Warning: key \"" + name + "\" already exists on \"actions\".");
        }
    };
    Rat.prototype.getTypes = function () {
        return Object.keys(this.actions);
    };
    Rat.prototype.getActions = function () {
        return this.actions;
    };
    return Rat;
}());
var rat = new Rat();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rat;
