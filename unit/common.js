let slice = function(arg) {
    return [].slice.apply(arg);
}

let print = function(txt) {
    console.log(txt);
}

// 扩展对象
let copy = function(target, source) {
    var arg = slice(arguments);
    if (!source) {
        arg.splice(0, 0, dominate);
    }
    return Object.assign.apply(Object, arg);
}

module.exports = {
    slice: slice,
    print: print,
    copy: copy
}
