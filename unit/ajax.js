var connect = function() {

}

var __ajax = (function() {
    var sendAjax = function(data) {
        var xhr = new XMLHttpRequest();
        var async = data.async === false ? data.async : true;
        xhr.open(data.method.toLocaleUpperCase(), data.url, async);

        var timeout = 10 * 60 * 1000;
        xhr.timeout = data.timeout || timeout;

        // 设置头部
        var headers = {};
        if (headers = data.headers) {
            for (let key of headers) {
                xhr.setRequestHeader(key, headers[key]);
            }
        }

        var success = data.success || function() {};
        var fail = data.fail || function() {};
        xhr.onreadystatechange = function() {
            //指定onreadystatechange事件句柄对应的函数
            if (xhr.readyState == 4) {
                //4代表服务器返回完成
                if (xhr.status == 200) {
                    //200代表成功了
                    document.getElementById("text1").value = xhr.responseText;
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
}());
dominate.ajax = __ajax;
