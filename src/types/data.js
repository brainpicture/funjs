"use strict";
exports.__esModule = true;
exports.Data = void 0;
var parser_1 = require("./parser");
var Data = /** @class */ (function () {
    function Data() {
    }
    Data.prototype.init = function (code) {
        if (code) {
            this.code = code;
            this.name = this.code.genVarName();
        }
        return this;
    };
    Data.prototype.beginParse = function () {
        if (!this.code)
            throw new Error('data should be inited');
        var parser = new parser_1.Parser().init(this.code);
        this.code.write("var ".concat(parser.name, " = ").concat(this.name, ".begin_parse();"));
        return parser;
    };
    return Data;
}());
exports.Data = Data;
