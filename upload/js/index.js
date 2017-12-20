let eventUnit = require("unit/event.js");
let dom = require("unit/dom.js");
require("../css/index.styl");

let bindDrop = function() {
    let div = dom.getDom("#drop_area");
    eventUnit.addEvent(div, "dragenter", function(e) {
        this.style.border = "1px solid #333";
    });
    eventUnit.addEvent(div, "dragleave", function(e) {
        this.style.border = "1px dashed #dbdbdb";
    });

    eventUnit.addEvent(div, "drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        let dt = e.dataTransfer;
        let files = dt.files;
        fileObj.handleFiles(files);
    });

    /**
     * 阻止浏览器默认打开文件
     */
    eventUnit.addEvent(document, "dragenter", function(e) {
        e.preventDefault();
    });
    eventUnit.addEvent(document, "dragleave", function(e) {
        e.preventDefault();
    });

    eventUnit.addEvent(document, "drop", function(e) {
        e.preventDefault();
    });
    eventUnit.addEvent(document, "dragover", function(e) {
        e.preventDefault();
    });
    /**
     * 阻止浏览器默认打开文件
     */
}
let fileObj = {
    handleFiles: function(files) {
        for (let i = 0; i < files.length; i++) {
            this.handleFile(files[i]);
        }
    },
    handleFile: function(file) {

    },
    fileUpload: function(file, url) {
        let reader = new FileReader();
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
        reader.onload = function(evt) {
            xhr.send(evt.target.result);
        };
        reader.readAsBinaryString(file);
    }
}
let page = {
    init: function() {
        bindDrop();
    }
}
page.init();
