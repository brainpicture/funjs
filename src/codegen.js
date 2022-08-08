"use strict";
exports.__esModule = true;
exports.Codegen = void 0;
var nl = "\n";
var Writer = /** @class */ (function () {
    function Writer() {
        this.body = '';
        this.tab = 0;
    }
    return Writer;
}());
var Codegen = /** @class */ (function () {
    function Codegen() {
        this.varNum = 0;
        this.funcNum = 0;
        this.tab = 0;
        this.body = '';
        this.stack = [];
    }
    Codegen.prototype.indent = function () {
        if (!this.stack.length) {
            throw new Error('Code stack is empty');
        }
        this.stack[0].tab++;
        return this;
    };
    Codegen.prototype.unindent = function () {
        if (!this.stack.length) {
            throw new Error('Code stack is empty');
        }
        this.stack[0].tab--;
        return this;
    };
    Codegen.prototype.write = function (code) {
        if (!this.stack.length) {
            return this;
        }
        var spaces = "  ".repeat(this.stack[0].tab);
        this.stack[0].body += spaces + code + nl;
        return this;
    };
    Codegen.prototype.prepend = function (code) {
        if (!this.stack.length) {
            throw new Error('Code stack is empty');
        }
        var spaces = "  ".repeat(this.stack[0].tab);
        this.stack[0].body = spaces + code + nl + this.stack[0].body;
        return this;
    };
    Codegen.prototype.start = function () {
        this.stack.unshift(new Writer());
        return this;
    };
    Codegen.prototype.commit = function () {
        var _a;
        this.body += nl + ((_a = this.stack.shift()) === null || _a === void 0 ? void 0 : _a.body);
    };
    Codegen.prototype.genVarName = function () {
        this.varNum += 1;
        return "v".concat(this.varNum);
    };
    Codegen.prototype.genFuncName = function () {
        this.funcNum += 1;
        return "f".concat(this.funcNum);
    };
    Codegen.prototype.compile = function () {
        return this.body;
    };
    return Codegen;
}());
exports.Codegen = Codegen;
