let slice = function(arg) {
    return [].slice.apply(arg);
};

// 扩展对象
let copy = function() {
    let arg = slice(arguments);
    return Object.assign.apply(Object, arg);
};

module.exports = {
    slice: slice,
    copy: copy
}
