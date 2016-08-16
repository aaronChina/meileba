'use strict';


/**
 * @基于api的方法封装
 * @return $.api
 * */

;(function () {
    var app = function () {
        this.host = 'http://api.mlb.kfw001.com';
        this.md5 = 'kfw001_com';
    };
    /**
     * @将任意一个自定义事件广播出去，该事件可在任意页面通过Listener 监听收到。
     * @param name 自定义事件名称
     * @param extra 自定义事件发送的数据
     * @returns {boolean}
     */
    app.prototype.sendEvent = function (name , extra) {
        if(!name ) return false;
        extra = extra ? extra : '';
        api.sendEvent({
            name : name ,
            extra : extra
        });
    };
    /**
     * @listenerEvent
     * @该事件可监听任意页面的自定义事件广播。
     * @param name 自定义事件名称
     * @param callback 自定义事件触发的回调函数
     */
    app.prototype.listenerEvent  = function (name , callback) {
        if(!name) return false;
        callback = typeof callback == 'function' ? callback : function () {};
        api.addEventListener({ name: name }, function (ret) {
            callback(ret.value);
        });
    };
    /**
     * @获得当前操作系统是否需要额外的上边距
     * @returns {number} [需要返回20，不需要返回0]
     */
    app.prototype.statusSize = function () {
        var size = 0;
        var sysType = api.systemType;
        var sysVersion = api.systemVersion;

        if(sysType == 'ios'){
            var numSV = parseInt( sysVersion , 10 );
            var fullScreen = api.fullScreen;
            var iOS7StatusBarAppearance = api.iOS7StatusBarAppearance;
            if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                size = 20 ;
            };
        };
        if(sysType == 'android'){
            sysVersion = parseFloat(sysVersion);
            if(sysVersion >= 4.4){
                return size = 20;
            };
        };
        return size;
    };
    /**
     * @切换指定窗口组当前显示的窗口
     * @param name 需要切换的窗口组的名称
     * @param index 切换序号 默认 -> 0
     * @param scroll 是否拥有切换动画，默认 -> 无
     * @returns {boolean}
     */
    app.prototype.switchPageIndex = function (name , index , scroll ) {
        if( !name ) return false;
        index = typeof index == 'number' ? index : 0 ;
        api.setFrameGroupIndex({
            name: name,
            index: index,
            scroll: scroll || false
        });
    };
    app.prototype.hidePageGroup = function (name) {
        if(!name) return false;
        api.setFrameGroupAttr({
            name: name,
            hidden: true
        });
    };
    /**
     * @弹出系统提示
     * @param msg 系统提示内容
     * @param duration 存在事件ms
     * @param location 弹出位置
     * @returns {boolean}
     */
    app.prototype.toast = function (msg , duration , location) {
        if(!msg) return false;
        api.toast({
            msg: msg,
            duration: duration || 2000,
            location: location || 'bottom'
        });
    };
    /**
     * @打开一个新的窗口
     * */
    app.prototype.closeWin = function (name , url , param) {
        if(!name) return api.closeWin();
        api.closeWin({
            name : name
        });
    };
    /**
     *
     * */

    $.api = new app();
}($ || ( $ = {} )));

/**
 * @重写$.ajax
 * */
;(function () {
    
    $.ajax = function (opts) {
        if( typeof opts != 'object' || !opts.url) return $.api.toast('参数错误');
        opts = $.extend( {} , {
            url : '',
            method : 'post',
            data : {
                
            },
            dataType : 'json',
            timeout : 5,
            cache : true,
            success : function () {

            },
            error : function () {

            }
        } , opts);
        api.ajax({
            url: $.api.host + opts.url,
            method: opts.method,
            dataType : opts.dataType,
            cache : opts.cache,
            timeout : 5,
            data: {
                values: opts.data
            }
        },function(ret, err){
            if(err) return opts.error(err);
            opts.success(ret)
        });
    };
}());
