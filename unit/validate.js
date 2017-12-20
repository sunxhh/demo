/**
 * 验证是否是数组
 */
let isArray = function(value) {
    if (!value) {
        return false;
    }
    if (value instanceof Array ||
        (!(value instanceof Object) &&
            (Object.prototype.toString.call((value)) == '[object Array]') ||
            typeof value.length == 'number' &&
            typeof value.splice != 'undefined' &&
            typeof value.propertyIsEnumerable != 'undefined' &&
            !value.propertyIsEnumerable('splice'))) {
        return true;
    }
    return false;
}

module.exports = {
    isArray: isArray
}
