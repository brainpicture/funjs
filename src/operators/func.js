"use strict";
exports.__esModule = true;
exports.Func = void 0;
var interfaces_1 = require("../interfaces");
var Func = /** @class */ (function () {
    function Func(code, cb, opts) {
        var _a, _b;
        this.code = code;
        this.callback = cb;
        this.opts = opts;
        if ((_a = this.opts) === null || _a === void 0 ? void 0 : _a["export"]) {
            this.name = this.opts["export"][0];
        }
        else {
            this.name = ((_b = this.opts) === null || _b === void 0 ? void 0 : _b.name) || code.genFuncName();
        }
    }
    Func.prototype.callable = function () {
        var _this = this;
        return function () {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (!_this.ret) { // not compiled
                _this.code.start().indent();
                _this.ret = _this.callback.apply(_this, args);
                var optsLine = '';
                if ((_a = _this.opts) === null || _a === void 0 ? void 0 : _a.inline) {
                    optsLine += 'inline ';
                }
                if ((_b = _this.opts) === null || _b === void 0 ? void 0 : _b["export"]) {
                    optsLine += 'method_id ';
                }
                _this.compileReturn();
                _this.code.unindent();
                var argsStr_1 = [];
                args.forEach(function (a) {
                    argsStr_1.push(a.type + ' ' + a.name);
                });
                _this.code.prepend("(".concat(_this.compileReturnTypes(), ") ").concat(_this.name, "(").concat(argsStr_1.join(', '), ") ").concat(optsLine, "{"));
                _this.code.write("}");
                _this.code.commit();
            }
            else {
                if ((0, interfaces_1.isType)(_this.ret)) {
                    _this.ret = _this.ret.spawn(); // reassign new variable every time
                }
                else if ((0, interfaces_1.isTypeArray)(_this.ret)) {
                    var retParams_1 = [];
                    _this.ret.forEach(function (a) {
                        retParams_1.push(a.spawn());
                    });
                    _this.ret = retParams_1;
                }
            }
            var argsStr = [];
            args.forEach(function (a) {
                argsStr.push(a.name);
            });
            var retStr = '';
            if (_this.ret) {
                if ((0, interfaces_1.isType)(_this.ret)) {
                    retStr = 'var ' + _this.ret.name + ' = ';
                }
                else if (Array.isArray(_this.ret)) {
                    var varsStr_1 = [];
                    _this.ret.forEach(function (a) {
                        varsStr_1.push(a.name);
                    });
                    retStr = 'var (' + varsStr_1.join(', ') + ') = ';
                }
            }
            _this.code.write("".concat(retStr).concat(_this.name, "(").concat(argsStr.join(', '), ");"));
            return _this.ret;
        };
    };
    Func.prototype.compileReturnTypes = function () {
        if (!this.ret) {
            return '';
        }
        var args = [];
        if (Array.isArray(this.ret)) {
            this.ret.forEach(function (el) {
                args.push(el.type);
            });
        }
        else if ((0, interfaces_1.isType)(this.ret)) {
            return this.ret.type;
        }
        return args.join(', ');
    };
    Func.prototype.compileReturn = function () {
        if (!this.ret) {
            return;
        }
        if (Array.isArray(this.ret)) {
            var retNames_1 = [];
            this.ret.forEach(function (el) {
                retNames_1.push(el.name);
            });
            this.code.write("return (".concat(retNames_1.join(', '), ");"));
        }
        else if ((0, interfaces_1.isType)(this.ret)) {
            this.code.write("return ".concat(this.ret.name, ";"));
        }
    };
    return Func;
}());
exports.Func = Func;
