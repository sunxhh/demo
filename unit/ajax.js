let connect = require("./connect");
let process = new connect();

// 超时时间
const timeout = 10 * 60 * 1000;
// 发送异步请求
const async = true;

// 发送请求前的配置
let sendProcess = {
    init: function() {
        process.use(this.setHeader);
        process.use(this.loadEvent);
        process.use(this.errorEvent);
    },
    // 设置header
    setHeader: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;

        let headers = {};
        if (headers = req.headers) {
            for (let key of headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }
        next();
    },
    // 设置返回事件
    loadEvent: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;

        let success = req.success || function() {};
        let fail = req.fail || function() {};

        xhr.onreadystatechange = function() {
            //指定onreadystatechange事件句柄对应的函数
            if (xhr.readyState == 4) {
                //4代表服务器返回完成
                if (xhr.status == 200) {
                    success(getRes(xhr), xhr);
                } else {
                    fail(getRes(xhr), xhr);
                }
            }
        }

        next();
    },
    // 设置失败事件
    errorEvent: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;

        let fail = req.fail || function() {};

        xhr.onerror = function() {
            fail(getRes(xhr), xhr);
        }

        next();
    }
}

// 获取返回值
let getRes = function(xhr) {
    var responseText = xhr.responseText;
    try {
        responseText = JSON.parse(responseText);
    } catch (e) {

    }
    return responseText;
}

let sendAjax = function(data) {
    let xhr = new XMLHttpRequest();
    process.data.xhr = xhr;
    process.data.req = data;

    let async = data.async === false ? data.async : async;
    xhr.open(data.method.toLocaleUpperCase(), data.url, async);
    xhr.timeout = data.timeout || timeout;

    process.handle();

    xhr.send(data.data);
    return xhr;
}

sendProcess.init();

module.exports = {
    sendAjax: sendAjax,
    process: process
}
