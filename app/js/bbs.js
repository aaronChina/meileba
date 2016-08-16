;~function () {

    var app = function () {
        this.nav = $('.nav-item');
        this.navGroup = $('[data-selector="nav"]');
        this.title = $('[data-selector="title"]');
    };
    app.prototype.switchNav = function () {
        var self = this;
        $.api.listenerEvent('bbsSwitchNav' , function (ret) {
            self.switchNavItem(ret.index);
        });
    };
    app.prototype.switchNavItem = function (i) {
        var self = this;
        var navNum = self.navGroup.eq(0).find('.nav-item').length;
        self.nav.removeClass('active').eq(i).addClass('active');
        self.navGroup.removeClass('show');
        self.title.removeClass('active');
        i = Math.floor(i / navNum);
        self.navGroup.eq(i).addClass('show');
        self.title.eq(i).addClass('active');
    };
    app.prototype.sendEvent = function (i) {
        var self = this;
        $.api.sendEvent('bbsSwitchGroup' ,{
            index : i
        });
    };
    $.bbs = function () {
        return new app();
    };
}();