"use strict";
exports.__esModule = true;
exports.types = void 0;
var codegen_1 = require("../codegen");
var cell_1 = require("./cell");
var int_1 = require("./int");
var slice_1 = require("./slice");
var emptyCodegen = new codegen_1.Codegen();
var types = {
    Int: function (dimension, unsigned) {
        return new int_1.Int(dimension || 32, unsigned);
    },
    Slice: function () {
        return new slice_1.Slice();
    },
    Cell: function () {
        return new cell_1.Cell();
    }
};
exports.types = types;
