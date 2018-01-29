require("../css/index.styl");
let $ = require('jquery');
let sendAjax = require("../../unit/ajax/ajax.js").sendAjax;

sendAjax({
    url: "http://localhost:3000/test/test1",
    data: {
        test: "啊啊啊啊",
        "chexkout": "checkout"
    },
    success: function(res) {
        // console.log(res);
    },
    method: "post"
});

// $.ajax({
//     url: "http://localhost:3000/test/test1",
//     type: "post",
//     dataType: "json",
//     data: {
//         userID: "1",
//         b: "2"
//     },
//     success: function(response) {},
//     error: function() {}
// });
