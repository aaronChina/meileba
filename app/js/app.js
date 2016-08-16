(function () {
    var app = function () {

    };
    app.prototype.swipe = function () {
        var banner  = new Swipe( $('.js-slider')[0] , {
            startSlide: 0,
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index,el) {
                var all = $(el).siblings().length + 1;
                if(!index) index = all;
                $('.js-banner-bar').width( index * ( 100 / all ) + '%');
            }
        });
        return banner;
    };
    app.prototype.call = function ($tel) {
        confirm('是否拨打电话？', '确定致电： ' + $tel + ' ?' , function ($f) {
            if(!$f) return false;
            api.call({
                type: 'tel',
                number: $tel
            });
        });
    };
    /**
     * @打开商店首页
     * */
    app.prototype.openStoreWin = function (param) {
        param = param ? param : {};
        api.openWin({
            name: 'store',
            url: 'widget://html/beauty/index.html',
            bgColor : '#e65c7c',
            reload : 'true',
            pageParam : {
                id : param
            }
        });
    };
    /**
     * @打开链接窗口
     * */
    app.prototype.openUrlWin = function (param) {
        api.openWin({
            name: 'urlWin',
            url: 'widget://html/win/url.html',
            bgColor : '#e65c7c',
            reload : 'true',
            pageParam : {
                url : param
            }
        });
    };
    /* 打开链接 */
    app.prototype.openUrlFrame = function (url) {
        api.openFrame({
            name: 'urlFrame',
            url: url,
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2',
            pageParam :{

            }
        });
    };
    /**
     * @打开店铺首页头部
     * @param param [参数]
     */
    app.prototype.openStoreHeadFrame = function (param) {
        //打开头页面
        api.openFrame({
            name: 'storeHeader',
            url: 'widget://html/beauty/store.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2'
        });
    };
    /**
     * @打开详情页
     */
    app.prototype.openDetailsHomeWin = function () {
        api.openWin({
            name: 'detailsWin',
            url: 'widget://html/details/index.html',
            bgColor : '#e65c7c',
            reload : 'true',
            pageParam : {
                id : 1
            }
        });
    };
    /**
     * @详情组
     */
    app.prototype.openDetailsHomeFrame = function () {
        api.openFrame({
            name: 'detailsHome',
            url: 'widget://html/details/details.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2'
        });
    };
    /**
     * @打开二维码扫描器窗体
     * */
    app.prototype.openScannerWin = function () {
        api.openWin({
            name: 'scannerWin',
            url: 'widget://html/win/scanner.html',
            bgColor : '#e65c7c',
            reload : false
        });

    };
    /**
     * @打开二维码扫描器窗体
     * */
    app.prototype.openScannerFrame = function () {
        api.openFrame({
            name: 'scannerFrame',
            url: 'widget://html/scanner/index.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : 'widget://images/scanner.png'
        });
    };
    /**
     * @打开二维码扫描器，延迟打开覆盖物
     */
    app.prototype.openFNScanner = function () {
        var self = this;
        var FNScanner = api.require('FNScanner');
        FNScanner.closeView();
        FNScanner.openView({
            rect : {
                x: 0,
                y: $.api.statusSize()
            }
        },function (ret, err) {
            if(err) return alert(JSON.stringify(err));
            setTimeout(function () {
                self.openScannerFrame();
            },10);
        });

    };
    app.prototype.switchLight = function ($p) {
        var flag = $p ? 'on' : 'off';
        flag = flag ? 'off' : 'on';
        alert(flag)
        var FNScanner = api.require('FNScanner');
        FNScanner.switchLight({
            status: flag
        });
    };
    /*
    * @关闭窗口
    * */
    app.prototype.closeWin = function () {
        $.api.closeWin();
    };
    /**
     * @打开我的积分收支详情
     */
    app.prototype.openCoinDetails = function () {
        api.openWin({
            name: 'coin-win',
            url: 'widget://html/coinShop/coin-win.html',
            bgColor : '#e65c7c',
            reload : 'true'
        });
    };
    app.prototype.openCoinOrderDetails = function () {
        api.openWin({
            name: 'order-farme',
            url: 'widget://html/coinShop/order-win.html',
            bgColor : '#e65c7c',
            reload : 'true'
        });
    };
    app.prototype.openCoinDetailsFrame = function () {
        api.openFrame({
            name: 'CoinDetailsFrame',
            url: 'widget://html/coinShop/my-coin.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2'
        });
    };
    app.prototype.openCoinOrderDetailsFrame = function () {
        api.openFrame({
            name: 'CoinOrderDetailsFrame',
            url: 'widget://html/coinShop/my-coin-order.html',
            rect: {
                marginTop : $.api.statusSize(),
                marginLeft : 0,
                marginRight : 0,
                marginBottom : 0
            },
            bounces: false,
            vScrollBarEnabled: false,
            hScrollBarEnabled: false,
            bgColor : '#f2f2f2'
        });
    };
    /**
     * @按钮事件
     * @param $e 事件名称
     * @param $p 事件传参
     * @param $this 事件主体
     */
    app.prototype.switch = function ($e,$p,$this) {
        var self = this;
        switch ($e){
            case 'call':
                self.call($p);
                break;
            case 'bbsSwitchGroup' :
                console.log($p);
                $.bbs().sendEvent($p || 0);
                break;
            case 'openStoreWin':
                self.openStoreWin($p);
                break;
            case 'openUrl':
                self.openUrlWin($p);
                break;
            case 'openDetailsHome' :
                self.openDetailsHomeWin($p);
                break;
            case 'closeWin':
                self.closeWin($p);
                break;
            case 'openScanner' :
                self.openScannerWin();
                break;
            case 'switchLight':
                self.switchLight($p);
                break;
            case 'openCoinDetails':
                self.openCoinDetails();
                break;
            case 'openCoinOrderDetails':
                self.openCoinOrderDetails();
                break;
            case 'switchMyCoin' :
                $.myCoin().switchMyCoin($p);
                break;
            case 'deleteOrder':
                $.coinOrder().deleteOrder($p);
                break;
            case 'traceOrder':
                $.coinOrder().traceOrder($p);
                break;
        };
    };
    return $.app = new app();
}($ || ( $ = {} )));