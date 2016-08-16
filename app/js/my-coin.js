~function () {
    var app = function () {
        this.status = $('.js-nav-bar');
    };
    app.prototype.init = function () {
    };
    app.prototype.switchMyCoin = function (i) {
        var self = this;
        i = i || 0;
        $.api.switchPageIndex('my-coin-group' , i , true);
        self.switchStatus(i);
    };
    app.prototype.switchStatus = function (i) {
        this.status.css({
            left : i * 50 + '%'
        })
    };
    app.prototype.listenerEvent = function () {
        var self = this;
        $.api.listenerEvent('switchMyCoinNavBar', function (ret) {
            self.switchStatus(ret.index);
        });
    };
    app.prototype.openFrameGroup = function () {
        api.openFrameGroup({
            name: 'my-coin-group',
            background: '#f2f2f2',
            scrollEnabled: true,
            rect: {
                x: 0,
                y: 85 + $.api.statusSize(),
                w: 'auto',
                h: 'auto'
            },
            index: 0,
            frames: [{
                name: 'my-coin-in',
                url: 'widget://html/coinShop/my-coin-lists.html',
                bgColor: '#f2f2f2',
                vScrollBarEnabled:false,
                hScrollBarEnabled:false,
                pageParam : {
                    type : true
                }
            }, {
                name: 'my-coin-out',
                url: 'widget://html/coinShop/my-coin-lists.html',
                bgColor: '#f2f2f2',
                vScrollBarEnabled:false,
                hScrollBarEnabled:false,
                pageParam : {
                    type : false
                }
            }]
        }, function(ret, err) {
            $.api.sendEvent('switchMyCoinNavBar',{
                index : ret.index
            });
        });
    };
    app.prototype.listsMain = function (type) {
        var self = this;

    };

    return $.myCoin = function () {
        return new app();
    };
}();