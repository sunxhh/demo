// 设置urlencode传值
function setUrlencodedData(data) {
    let req = data.req || data;
    let oData = req.data;
    let sendData = "";
    if (oData instanceof FormData) {
        sendData = oData;
    } else {
        for (let key in oData) {
            sendData += encodeURIComponent(key) + '=' + encodeURIComponent(oData[key]) + '&';
        }
        sendData = sendData.slice(0, -1);
    }
    req.sendData = sendData;
}

function setJSONData(data) {
    let req = data.req;
    let oData = req.data || {};
    req.sendData = JSON.stringify(oData);
}

function setData(data) {
    let contentType = data.req.headers["content-type"];
    switch (contentType) {
        case "application/json":
            setJSONData(data);
            break;
        default:
            setUrlencodedData(data);
    }

}

module.exports = {
    setData,
    setUrlencodedData
};
