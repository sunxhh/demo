var dominate = {
    slice: function(arg) {
        return [].slice.apply(arg);
    },
    print: function(txt) {
        console.log(txt);
    },
    isArray: function(value) {
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
};

// 扩展对象
dominate.copy = function(target, source) {
    var arg = dominate.slice(arguments);
    if (!source) {
        arg.splice(0, 0, dominate);
    }
    Object.assign.apply(this, arg);
}
