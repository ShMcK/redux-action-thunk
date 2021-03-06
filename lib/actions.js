"use strict";
var Rat = (function () {
    function Rat() {
        this.actions = {};
    }
    Rat.prototype.add = function (name, action) {
        if (typeof action === 'undefined') {
            action = { type: name };
        }
        if (this.actions[name]) {
            console.log("Warning: key \"" + name + "\" already exists on \"actions\".");
        }
        else {
            this.actions[name] = action;
        }
    };
    Rat.prototype.types = function () {
        return Object.keys(this.actions).sort();
    };
    return Rat;
}());
var rat = new Rat();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = rat;
