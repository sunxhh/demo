var __event = (function() {
    const bindedMap = new Map();
    return {
        addMap: function(dom, type, fn) {
            let map = bindedMap.get(dom);
            if (!map) {
                map = {};
                map[type] = new Map();
            }
            let fnMap = map[type];
            fnMap.set(fn, true);
        },
        removeMap: function(dom, type, fn) {
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
        },
        addEventOne: function(dom, type, fn) {
            var arg = dominate.slice(arguments);
            dom.addEventListener(type, fn, false);
            this.addMap.apply(arg);
        },
        addEvent: function(dom, type, fn) {
            var arg = dominate.slice(arguments);
            if (dominate.isArray(dom)) {
                for (let i = 0; i < dom.length; i++) {
                    this.addEventOne(dom[i], type, fn);
                }
            } else {
                this.addEventOne.apply(this, arg);
            }
        },
        removeEventOne: function(dom, type, fn) {
            if (fn) {
                dom.removeEventListener(type, fn);
                this.removeMap(dom, type, fn);
            } else {
                for (let key of map.keys()) {
                    dom.removeEventListener(type, key);
                }
                this.removeMap(dom, type);
            }
        },
        removeEvent: function(dom, type, fn) {
            var arg = dominate.slice(arguments);
            if (dominate.isArray(dom)) {
                for (let i = 0; i < dom.length; i++) {
                    this.removeEventOne(dom[i], type, fn);
                }
            } else {
                this.removeEventOne.apply(this, arg);
            }
        }
    }
}());

dominate.event = __event;
