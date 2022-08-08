"use strict";
exports.__esModule = true;
exports.Bool = void 0;
var if_1 = require("../operators/if");
var Bool = /** @class */ (function () {
    function Bool() {
        this.name = '';
        this.type = 'bool';
    }
    Bool.prototype.init = function (code) {
        if (code) {
            this.code = code;
            this.name = this.code.genVarName();
        }
        return this;
    };
    Bool.prototype.then = function (cb) {
        var _a, _b;
        (_a = this.code) === null || _a === void 0 ? void 0 : _a.write("if (".concat(this.name, ") {")).indent();
        cb();
        (_b = this.code) === null || _b === void 0 ? void 0 : _b.unindent().write("}");
        return new if_1.If();
    };
    return Bool;
}());
exports.Bool = Bool;
