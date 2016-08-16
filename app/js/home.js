/**
 * @root窗口操作事件
 * @ 1. 在切换热点时，发送事件 'bbsSwitchNav' , param = ret.index
 * @ 2. 监听了切换事件 'bbsSwitchGroup'  param = ret.index
 *
 *
 *
 *
 * */





;(function () {
    var fn = function () {
        this.foot = $('footer').find('.footer-item');
        this.bbs = true;      //判断当前bbs页面 默认为true == bbsIndex
    };
    fn.prototype.init = function () {
        var self = this;
        self.openFramGroup();
        self.listenerFoot();
        self.listenerHeaderSwitchEvent();
        

    };

    /**
     * @监听脚部事件
     */
    fn.prototype.listenerFoot = function () {
        var self = this;
        self.foot.on('click' , function () {
            self.switchFoot($(this));
        });
    };
    /**
     * @打开首页窗口组
     */
    fn.prototype.openFramGroup = function () {
        api.openFrameGroup ({
            name: 'homeGroup',
            scrollEnabled: false,
            preload : 4,
            index : 0,
            rect: {
                marginLeft : 0 ,
                marginRight : 0,
                marginTop : $.api.statusSize(),
                marginBottom : 45,
            },
            frames: [{
                name: 'homeIndex',
                url: 'widget://html/index.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'shopIndex',
                url: 'widget://html/coinShop.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'beautyIndex',
                url: 'widget://html/beauty.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbsIndex',
                url: 'widget://html/bbs.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'personalIndex',
                url: 'widget://html/pers.html',
                bounces: false,
                bgColor : '#ededed',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            }]
        });
    };
    /**
     * @切换脚部样式
     * */
    fn.prototype.switchFoot = function ($this) {
        var self = this,
            $i = $this.index();
        //切换颜色
        $this.addClass('active').siblings().removeClass('active');
        //切换图标
        var $icon = $this.find('.icon');
        $.each( self.foot.find('.icon') ,function (i , ic) {
            $(ic).attr('class' , 'icon ' + $(ic).data('icon') );
        });
        $icon.attr('class' , 'icon ' + $icon.data('active-icon'));
        //更改窗口
        $.api.switchPageIndex( 'homeGroup' , $i);
        if($i == 3) return self.openBbsGroup();
        $.api.hidePageGroup('bbsGroup');
    };

    /**
     * @热点组
     * */
    fn.prototype.openBbsGroup = function () {
        api.openFrameGroup ({
            name: 'bbsGroup',
            scrollEnabled: true,
            index : 0,
            rect: {
                marginLeft : 0 ,
                marginRight : 0,
                marginTop : $.api.statusSize() + 89,
                marginBottom : 45,
            },
            frames: [{
                name: 'bbs-1',
                url: 'widget://html/bbs/index.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-2',
                url: 'widget://html/bbs/index.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-3',
                url: 'widget://html/bbs/index.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-4',
                url: 'widget://html/bbs/index.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-5',
                url: 'widget://html/bbs/index.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-6',
                url: 'widget://html/bbs/published.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-7',
                url: 'widget://html/bbs/published.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            },{
                name: 'bbs-8',
                url: 'widget://html/bbs/published.html',
                bounces: false,
                bgColor : '#f2f2f2',
                vScrollBarEnabled: false,
                hScrollBarEnabled: false
            }]
        },function ( ret , err) {
            /**
             * @发送切换
             * */
            $.api.sendEvent('bbsSwitchNav',{
                index : ret.index
            });
        });
    };
    /**
     * @监听热点切换事件
     * */
    fn.prototype.listenerHeaderSwitchEvent = function () {
        $.api.listenerEvent('bbsSwitchGroup' , function (ret) {
            $.api.switchPageIndex('bbsGroup' , ret.index , true);
        });
    };
    $.home = function () {
        new fn().init();
    };
}());