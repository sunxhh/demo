let connect = require("../connect");
let handleSendData = require("./ajaxData").setData;
let process = new connect();

// 超时时间
const timeout = 10 * 60 * 1000;
// 发送异步请求
const async = true;

// 发送请求前的配置
let sendProcess = {
    init: function() {
        // 初始化需要处理的部分
        process.use(this.setHeader);
        process.use(this.loadEvent);
        process.use(this.errorEvent);
        process.use(this.processEvent);
        process.use(this.setSendData);
    },
    // 设置header
    setHeader: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;
        let defaultContentType = 'application/x-www-form-urlencoded';
        let headers = req.headers;

        if (!headers) {
            req.headers = headers = {};
        }
        if (!headers["content-type"]) {
            headers["content-type"] = defaultContentType;
        }
        Object.keys(headers).forEach((key) => {
            xhr.setRequestHeader(key, headers[key]);
        });
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
        };

        next();
    },
    // 设置失败事件
    errorEvent: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;

        let fail = req.fail || function() {};

        xhr.onerror = function() {
            fail(getRes(xhr), xhr);
        };

        next();
    },
    // 上传过程
    processEvent: function(next, data) {
        let req = data.req;
        let xhr = data.xhr;

        let process = req.process || function() {};
        xhr.upload.addEventListener("progress", function(e) {
            process(e, xhr);
        }, false);
        next();
    },
    // 设置传值
    setSendData: function(next, data) {
        handleSendData(data);
        next();
    }
};

// 获取返回值
let getRes = function(xhr) {
    let responseText = xhr.responseText;
    try {
        responseText = JSON.parse(responseText);
    } catch (e) {

    }
    return responseText;
};

/**
 * 发送ajax请求
 * @param {*} data
 * url  地址
 * timeout 超时 默认10分钟
 * async 请求同异步默认true
 * data 请求参数
 * success 请求成功 
 * fail 请求失败
 * method 请求类型
 * process 请求过程
 * headers 设置头部
 */
let sendAjax = function(data) {
    let xhr = new XMLHttpRequest();
    process.data.xhr = xhr;
    process.data.req = data;
    xhr.open(data.method.toLocaleUpperCase(), data.url, data.async === false ? data.async : async);

    xhr.timeout = data.timeout || timeout;

    process.handle();

    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    console.log(data.sendData);
    xhr.send(data.sendData);
    return xhr;
};

sendProcess.init();

module.exports = {
    sendAjax: sendAjax,
    process: process
}
