var __dom = (function() {
    return {
        getDom: function(str) {
            return document.querySelector(str);
        }
    }
})();

dominate.dom = __dom;
