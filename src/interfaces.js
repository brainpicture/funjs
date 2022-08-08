"use strict";
exports.__esModule = true;
exports.wrap = exports.isTypeArray = exports.isType = void 0;
function isType(object) {
    if (object instanceof Object) {
        return 'name' in object && 'type' in object;
    }
    return false;
}
exports.isType = isType;
function wrap(arg) {
    if (isType(arg)) {
        return arg.name;
    }
    return arg;
}
exports.wrap = wrap;
function isTypeArray(object) {
    return Array.isArray(object);
}
exports.isTypeArray = isTypeArray;
