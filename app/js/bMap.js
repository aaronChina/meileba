;~function () {
    var app = function () {
        this.bMap;
        this.lon;
        this.lat;
    };
    app.prototype.init = function () {
        var self = this;
        self.bMap = api.require('bMap');
    };
    /**
     * @获取用户当前位置经纬度
     * @param callback
     */
    app.prototype.getLocation = function ( callback ) {
        callback = typeof callback == 'function' ? callback : function(){};
        var self = this;
        self.bMap.getLocation({
            accuracy: '100m',
            autoStop: true,
            filter: 1
        }, function(ret, err){
            if(err) return self.error( err );
            if(!ret.status) return $.api.toast('定位出错，请手动选择地区');
            self.lon = ret.lon;
            self.lat = ret.lat;

            callback({
                lon : ret.lon ,
                lat : ret.lat
            });
        });
    };
    app.prototype.getNameFromCoords = function ( locat , callback) {
        callback = typeof callback == 'function' ? callback : function(){};

        var self = this;
        self.bMap.getNameFromCoords({
            lon: locat.lon,
            lat: locat.lat
        }, function(ret, err){
            if(err) return self.error( err );
            if(!ret.status) return $.api.toast('定位出错，请手动选择地区');
            self.lon = ret.lon;
            self.lat = ret.lat;
            callback({
                city : ret.city,
                address : ret.address,
                lat : self.lat,
                lon : self.lon
            });
        });
    };
    /**
     * @获取当前用的的地址
     * @param callback
     */
    app.prototype.name = function ( callback ) {
        callback = typeof callback == 'function' ? callback : function(){};
        var self = this;
        self.getLocation(function (ret) {
             self.getNameFromCoords( ret, callback );
        });
    };
    app.prototype.error = function (error) {
        if(typeof error != 'object') return $.api.toast('error:' + error);
        switch (error.code){
            case '0' :
                $.api.toast('error:' + error.msg);
                break;
            case '1' :
                $.api.toast('error:' + ( error.msg || '检索词有岐义' ) );
                break;
            case '2' :
                $.api.toast('error:' + ( error.msg || '检索地址有岐义' ) );
                break;
            case '3' :
                $.api.toast('error:' + ( error.msg || '没有找到检索结果' ) );
                break;
            case '4' :
                $.api.toast('error:' + ( error.msg || 'key错误' ) );
                break;
            case '5' :
                $.api.toast('error:' + ( error.msg || '网络连接错误' ) );
                break;
            case '6' :
                $.api.toast('error:' + ( error.msg || '网络连接超时' ) );
                break;
            case '7' :
                $.api.toast('error:' + ( error.msg || '还未完成鉴权，请在鉴权通过后重试' ) );
                break;
            default:
                $.api.toast('error:' + ( error.msg || '未知错误' ) );
        };
    };
    $.bMap = new app();
}();