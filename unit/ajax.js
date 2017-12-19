// 超时时间
const timeout = 10 * 60 * 1000;
// 发送异步请求
const async = true;

let sendAjax = function(data) {
    let xhr = new XMLHttpRequest();
    let async = data.async === false ? data.async : async;

    xhr.open(data.method.toLocaleUpperCase(), data.url, async);
    xhr.timeout = data.timeout || timeout;

    // 设置头部
    let headers = {};
    if (headers = data.headers) {
        for (let key of headers) {
            xhr.setRequestHeader(key, headers[key]);
        }
    }

    let success = data.success || function() {};
    let fail = data.fail || function() {};
    xhr.onreadystatechange = function() {
        //指定onreadystatechange事件句柄对应的函数
        if (xhr.readyState == 4) {
            //4代表服务器返回完成
            if (xhr.status == 200) {
                //200代表成功了
                //responsetext表示服务器返回的文本,还有一种方式是responseXML是为了获取服务器返回的xml
            } else {
                fail(xhr);
            }
        }
    }
    xhr.onerror = function() {
        fail(xhr);
    }
    xhr.send(data.data);
    return xhr;
}

module.exports = {
    sendAjax: sendAjax
}
