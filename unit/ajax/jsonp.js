let connect = require("../connect");
let handleSendData = require("./ajaxData").setUrlencodedData;
let process = new connect();
const defaultConfig = {
    jsonp: 'callback',
    data: {},
    success: function(result) {
        console.dir(result);
    },
    headers: {
        charset: "utf-8",
        type: "text/javascript"
    },
    url: "",
    fail: function() {},
    error: function(err) {
        console.dir(err);
    }
};

// 创建唯一的callback函数的编号
let uniqueNumber = 1;

// 清空操作
let clear = function(data) {
    let js = data.js;
    let req = data.req;
    js.parentNode && js.parentNode.removeChild(js);
    delete window[req.data[req.jsonp]];
};

// 发送请求前的配置
let sendProcess = {
    init: function() {
        // 初始化需要处理的部分  
        process.use(this.setSendData);
        process.use(this.setHeader);
        process.use(this.loadEvent);
        process.use(this.errorEvent);

    },
    // 设置script属性
    setHeader: function(next, data) {
        let req = data.req;
        let js = data.js;
        let headers = req.headers;
        Object.keys(headers).forEach((key) => {
            js.setAttribute(key, headers[key]);
        });

        next();
    },
    // 设置返回事件
    loadEvent: function(next, data) {
        let req = data.req;
        window[req.data[req.jsonp]] = function(cb) {
            req.success(cb);
            clear(data);
        };
        next();
    },
    // 设置失败事件
    errorEvent: function(next, data) {
        let req = data.req;
        let js = data.js;
        js.onerror = (e) => {
            req.error(e);
            clear(data);
        };
        next();
    },
    // 设置传值
    setSendData: function(next, data) {
        let req = data.req;
        // 设置返回的毁掉函数 函数名每次唯一所以不存在缓存问题
        req.data[req.jsonp] = "my_jsonp_callback_" + (++uniqueNumber);

        handleSendData(data);
        next();
    }
};

let sendJsonp = function(data) {
    data = Object.assign({}, defaultConfig, data);
    let js = document.createElement("script");
    process.data.js = js;
    process.data.req = data;

    process.handle();

    js.src = `${data.url}?${data.sendData}`;
    document.getElementsByTagName("head")[0].appendChild(js);
};
sendProcess.init();
module.exports = sendJsonp;
