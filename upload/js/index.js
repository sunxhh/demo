require("../css/index.styl");

let eventUnit = require("unit/event.js");
let dom = require("unit/dom.js");
import { handleFiles } from "./file.js";



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
        handleFiles(files);
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
};

let page = {
    init: function() {
        bindDrop();
    }
}
page.init();
