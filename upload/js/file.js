// 读取文件
let readerFile = function(file, fn) {
    let reader = new FileReader();
    reader.onload = function(evt) {
        fn(evt.target.result);
    };
    reader.readAsBinaryString(file);
};

// 提交文件
let uploadFile = function(fileBinaryString) {
    let xhr = new XMLHttpRequest();
    // 过程
    xhr.upload.addEventListener("progress", function(e) {
        if (e.lengthComputable) {
            let percentage = Math.round((e.loaded * 100) / e.total);

        }
    }, false);

    // 完成
    xhr.upload.addEventListener("load", function(e) {

    }, false);
    xhr.open("POST", url);
    xhr.overrideMimeType('text/plain; charset=x-user-defined-binary');
    xhr.send(fileBinaryString);
};

// 处理文件
let handleFiles = function(files) {
    for (let i = 0; i < files.length; i++) {
        readerFile(files[i], uploadFile);
    }
};

export { handleFiles };
