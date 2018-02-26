require("../css/index.styl");
let $ = require('jquery');
let sendAjax = require("../../unit/ajax/ajax.js").sendAjax;
let sendJsonp = require("../../unit/ajax/jsonp.js");
sendJsonp({
    url: "http://localhost:3000/test/test1",
    data: {
        para: '{"jobNumber":"48205","headver":"1.41.1.1"}'
    },
    success: function(res) {
        console.log("成功了啊");
        console.log(res);
    }
});

// $.ajax({
//     url: "http://localhost:3000/test/test1",
//     type: "post",
//     dataType: "json",
//     data: {
//         userID: "&nbsp;",
//         b: "2"
//     },
//     success: function (response) {},
//     error: function () {}
// });
