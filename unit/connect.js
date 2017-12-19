class connect {
    constructor() {
        this.stack = [];
        this.data = {};
    }
    use(fn) {
        this.stack.push(fn);
    }
    handle() {
        let index = 0;
        let stack = this.stack;
        let data = this.data;
        let self = this;

        function next() {
            if (index >= stack.length) {
                return;
            }
            let curFn = stack[index];
            index++;
            curFn(next, data, self);
        }
        next();
    }
}

module.exports = connect;