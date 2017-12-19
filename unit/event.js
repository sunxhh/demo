let dominate = require('./common.js');
/**
 * 存储已绑定的map
 * 格式{
 *      [dom]:{
 *         "click":{
 *              [fn]:true    
 *          }
 *      }
 * }
 */
const bindedMap = new Map();

let addMap = function (dom, type, fn) {
    let map = bindedMap.get(dom);
    if (!map) {
        map = {};
        map[type] = new Map();
    }
    let fnMap = map[type];
    fnMap.set(fn, true);
}

let removeMap = function (dom, type, fn) {
    let map = bindedMap.get(dom);
    if (!map) {
        return;
    }

    let fnMap = map[type];
    if (!fnMap) {
        return;
    }

    if (fn) {
        fnMap.delete(fn);
    } else {
        fnMap.clear();
    }
}

/**
 * 绑定单个事件
 * @param {*} dom 
 * @param {*} type 
 * @param {*} fn 
 */
let addEventOne = function (dom, type, fn) {
    var arg = dominate.slice(arguments);
    dom.addEventListener(type, fn, false);
    this.addMap.apply(arg);
}

/**
 * 移除单个事件
 * @param {*} dom 
 * @param {*} type 
 * @param {*} fn 
 */
let removeEventOne = function (dom, type, fn) {
    if (fn) {
        dom.removeEventListener(type, fn);
        this.removeMap(dom, type, fn);
    } else {
        for (let key of map.keys()) {
            dom.removeEventListener(type, key);
        }
        this.removeMap(dom, type);
    }
}

/**
 * 绑定事件
 */
let addEvent = function (dom, type, fn) {
    var arg = dominate.slice(arguments);
    if (dominate.isArray(dom)) {
        for (let i = 0; i < dom.length; i++) {
            this.addEventOne(dom[i], type, fn);
        }
    } else {
        this.addEventOne.apply(this, arg);
    }
}

/**
 * 移除事件
 */
let removeEvent = function (dom, type, fn) {
    var arg = dominate.slice(arguments);
    if (dominate.isArray(dom)) {
        for (let i = 0; i < dom.length; i++) {
            this.removeEventOne(dom[i], type, fn);
        }
    } else {
        this.removeEventOne.apply(this, arg);
    }
}

module.exports = {
    addEvent: addEvent,
    removeEvent: removeEvent
}