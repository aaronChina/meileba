;(function () {
    var app = function () {

    };
    app.prototype.init = function () {
        $.app.openFNScanner();
    };
    var fn = new app();
    $.scannerWin = function () {
        fn.init();
    };
}());

;~function () {

    $.scanner = function () {
    };
}();