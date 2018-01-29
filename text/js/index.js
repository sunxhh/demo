require("../css/index.styl");
let sendAjax = require("../../unit/ajax.js").sendAjax;

sendAjax({
    url: "",
    data: {
        test: "text",
        "chexkout": "checkout"
    },
    success: function (res) {
        console.log(res);
    },
    method: "post"
})