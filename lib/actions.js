"use strict";
var Ram = (function () {
    function Ram() {
        this.actions = {};
    }
    Ram.prototype.add = function (name, action) {
        if (!this.actions[name]) {
            this.actions[name] = action;
        }
        else {
            console.log("Warning: key \"" + name + "\" already exists on \"actions\".");
        }
    };
    return Ram;
}());
var ram = new Ram();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ram;
