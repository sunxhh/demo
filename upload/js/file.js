const sendAjax = require("../../unit/ajax").sendAjax;

const pieceSize = 1024 * 1024 * 1000;
let uploadFile = function(fileBinaryString, file) {
    let index = 0;
    let curBinaryString;
    let failCount = 0;
    let maxFailCount = 5;

    function upload() {
        let curIndex = index * pieceSize;
        if ((curIndex + pieceSize) >= fileBinaryString.length) {
            curBinaryString = fileBinaryString.slice(curIndex);
        } else {
            curBinaryString = fileBinaryString.slice(curIndex, (curIndex + pieceSize));
        }
        let fd = new FormData();
        fd.append('file', file);
        fd.append('fileName', 'fileName');
        fd.append('index', index);
        sendAjax({
            method: "post",
            url: "http://localhost:3000/upload/uploadFile",
            data: fd,
            success: function(data) {
                console.log(data);
                if ((curIndex + pieceSize) <= fileBinaryString.length) {
                    index++;
                    failCount = 0;
                    upload();
                    return;
                }

            },
            fail: function(data) {
                console.log(data);
                failCount++;
                if (failCount >= maxFailCount) {
                    return false;
                }
                upload();
            },
            process: function(e) {
                console.log(e);
            }
        });
    }
    upload();
};

// 读取文件
let readerFile = function(file, fn) {
    let reader = new FileReader();
    reader.onload = function(evt) {
        fn(evt.target.result, file);
    };
    reader.readAsBinaryString(file);
};

// 处理文件
let handleFiles = function(files) {
    for (let i = 0; i < files.length; i++) {
        readerFile(files[i], uploadFile);
    }
};

export { handleFiles };
