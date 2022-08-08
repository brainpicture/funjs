"use strict";
exports.__esModule = true;
exports.InMsgBody = void 0;
var int_1 = require("./types/int");
var InMsgBody = /** @class */ (function () {
    function InMsgBody(c) {
        this.code = c;
    }
    InMsgBody.prototype.loadUint = function (dimension) {
        var uint = new int_1.Int(dimension, true).init(this.code);
        return uint;
    };
    return InMsgBody;
}());
exports.InMsgBody = InMsgBody;
