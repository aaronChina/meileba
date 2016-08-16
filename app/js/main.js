/**
 * @入口文件集合
 * @监听了所有含有data-event的HTMLElement
 * @再次之前回执行userinfo.js 
 * */

;(function () {
    var app = function () {
        //监听所有的按钮
        this.$container = $('.js-container');
        this.$container.on('click', '[data-event]' ,function () {
            var $this = $(this),
                $e = $this.data('event'),
                $p = $this.data('params') || false;
            $.app.switch( $e ,$p , $this);
        });
    };
    /* root 入口 */
    app.prototype.home = function () {
        $.home();
    };
    /* 首页主页 入口 */
    app.prototype.homeIndex = function () {
        $.homeIndex();
    };
    /* 首页积分商城入口 */
    app.prototype.homeCoin = function () {
        $.app.swipe();
    };
    /* 首页商品列表页入口*/
    app.prototype.homBeauty = function () {

    };
    /* 热点首页入口 */
    app.prototype.homeBbs = function () {
        $.bbs().switchNav();
    };
    /* 个人中心首页 */
    app.prototype.homePers = function () {

    };
    /* 二维码扫描器接口 */
    app.prototype.scannerWin = function () {
        $.scannerWin();
    };
    /* 二维码扫描器接口 */
    app.prototype.scanner = function () {
        $.scanner();
    };
    /* 店铺首页window 入口 */
    app.prototype.beautyHome = function () {
        $.app.openStoreHeadFrame(api.pageParam.id);
    };
    /* storeInfo 入口 */
    app.prototype.storeInfo = function () {
        var $container = $('.js-container');
        api.openFrameGroup ({
            name: 'storeInfoGroup',
            scrollEnabled: true,
            preload : 4,
            index : 0,
            rect: {
                marginLeft : 0 ,
                marginRight : 0,
                marginTop : $.api.statusSize() + $container.height(),
                marginBottom : 0
            },
            frames: [{
                name: 'storeInfo-1',
                url: 'widget://html/beauty/info.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'storeInfo-2',
                url: 'widget://html/beauty/service.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'storeInfo-3',
                url: 'widget://html/beauty/benefit.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'storeInfo-4',
                url: 'widget://html/beauty/business.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            }]
        });
    };
    /* url 入口 */
    app.prototype.url = function () {
        $.app.openUrlFrame(api.pageParam.url);
    };
    /* 商品详情页的入口wind */
    app.prototype.detailsWin = function () {
        $.app.openDetailsHomeFrame(api.pageParam.id || false);
    };
    /**
     * 我的积分收支详情
     * */
    app.prototype.coinWin = function () {
        $.app.openCoinDetailsFrame();
    };
    app.prototype.myCoin = function () {
        var coin = $.myCoin();
        coin.openFrameGroup();
        coin.listenerEvent();
    };
    app.prototype.myCoinLists = function () {
        $.myCoin().listsMain(api.pageParam.type);
    };

    app.prototype.orderWin = function () {
        $.app.openCoinOrderDetailsFrame();
    };
    app.prototype.coinOrder = function () {
        $.coinOrder();
    };
    app.prototype.chaseWin = function () {
        $.coinOrder().openChaseLists();
    };
    var main = new app();
    var fn = $('body').data('main');
    return $.main = main[fn] || function () {};
}());
