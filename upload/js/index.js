var bindDrop = function() {
    var div = dominate.dom.getDom("#drop_area");
    dominate.event.addEvent(div, "dragenter", function(e) {
        this.style.border = "1px solid #333";
    });
    dominate.event.addEvent(div, "dragleave", function(e) {
        this.style.border = "1px dashed #dbdbdb";
    });

    dominate.event.addEvent(div, "drop", function(e) {
        e.preventDefault();
        e.stopPropagation();
        var dt = e.dataTransfer;
        var files = dt.files;
        fileObj.handleFiles(files);
    });

    /**
     * 阻止浏览器默认打开文件
     */
    dominate.event.addEvent(document, "dragenter", function(e) {
        e.preventDefault();
    });
    dominate.event.addEvent(document, "dragleave", function(e) {
        e.preventDefault();
    });

    dominate.event.addEvent(document, "drop", function(e) {
        e.preventDefault();
    });
    dominate.event.addEvent(document, "dragover", function(e) {
        e.preventDefault();
    });
    /**
     * 阻止浏览器默认打开文件
     */
}
var fileObj = {
    handleFiles: function(files) {
        for (var i = 0; i < files.length; i++) {
            this.handleFile(files[i]);
        }
    },
    handleFile: function(file) {

    },
    fileUpload: function(file, url) {
        var reader = new FileReader();
        var xhr = new XMLHttpRequest();
        // 过程
        xhr.upload.addEventListener("progress", function(e) {
            if (e.lengthComputable) {
                var percentage = Math.round((e.loaded * 100) / e.total);

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
var page = {
    init: function() {
        bindDrop();
    }
}
page.init();
