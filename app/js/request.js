/**
 * 
 * @ljw
 * @请求数据封装
 *
 * */
;(function () {

    var app = function () {
        	this.host = 'http://api.mlb.kfw001.com/';
    	    this.key = '!@#kfwljwzhuchaofengyang20160802434';
    };

    /****
     * 
     *
     * 本函数会调用ajax访问远程服务器，并缓存返回数据
     * 如果你需要从服务器拿数据请调用这个接口
     * @opts         json      
     * @opts.exptime  int      缓存时间，单位秒
     * @opts.cache   bolean    true 缓存到本地, 如果不需要缓存就传递  false
     * @opts.data    json      传递到服务器的参数json
     * @opts.url               服务器接口id
     * @opts.success(ret)      回调函数 ret  就是来自服务或者缓存的数据
     * @opts.error(ret)        回调函数 ajax 错误处理函数
     * 
     */
    app.prototype.getData=function (opts){
    		if( typeof opts != 'object' || !opts.url) return $.api.toast('参数错误');
    		opts.data=this.getUrlParam(opts.data);
    		var sign =this.getSign(opts.data);
    		var exptime=28800;
    		var cachedata=null;
    		//缓存时间，对远程访问没有用直接去除
    		if("exptime" in opts) {exptime=opts['exptime'];delete opts['exptime'];}
    		
    		if(opts.cache){cachedata=$.cache.getItme(sign);}
    		
    		if(opts.cache && cachedata){
    			//alert('getData cachedata');
    			opts.success(cachedata,'cache'); //直接处理缓存数据
    		}else{
    		   //alert('ajax getData');
    		   //发起远程访问
    		   opts.data=$.extend({'sign':sign,}, opts.data); //把加密串合并到参数中
    		   this.ajax(opts,
    		   			//缓存远程拿到的数据,等待下次使用
    		   			function (ret){
	    		   		$.cache.setItme(opts.data.sign,ret,exptime);
    		   		});
    		}
    		
    }
    /*获取加密数据 */
    app.prototype.getSign = function (param) {
			var url			=this.urlString(param)+this.key;
			var signature 	= api.require('signature');
			return signature.md5Sync({data:url});
	};
	 /* 
	 *将参数转成url字符	，在getSign 中被调用
     *@return string  url 字符串    key=value1&key=value2&...
     */
    app.prototype.urlString = function (param) {
    	var url='';
    	//排序处理
    	var keyArray=this.sort(param);
   		for(var key in keyArray){
				url=url+keyArray[key]+"="+$.trim(param[keyArray[key]])+'&';
		}
		return url.substring(0,url.length-1);
		
    };
    /***
	 *  将必须  要传递的参数组装，在 ajax中被调用
	 *  @return  
	 *  传入的参  param 合并到  必传参数中，然后返回
	 *  
	 */
	app.prototype.getUrlParam = function (param) {
			var baseParam	=this.getBaseParam();
			var opts 		=$.extend(baseParam,param);
			return opts;
    };
    
    /***
     *  ajax, 不建议直接使用 ，请使用getData
     *
     * @远程数据交互接口 ，传入一个json 参
     * @data  	为 给到远程服务的数据json
     * @success  为远程接口成功回调函数
     * @error  	为远程接口失败处理回调函数
     * 
     */
    app.prototype.ajax=function (opts,callback){
    		callback = typeof callback == 'function' ? callback:function(ret){};
    		opts = $.extend( {} , {
		    			'url'		: '',
			            'method' 	: 'post',
			            'data' 		: {},
			            'dataType'	: 'json',
			            'timeout' 	: 5,
			            'cache' 	: true,
			            'success' 	: function (ret) {},
			            'error' 	: function (err) {}
	        		} , opts);
	        //alert(JSON.stringify(opts.data) );
	        api.ajax({
			            url			: this.host + opts.url,
			            method		: opts.method ||'post',
			            dataType 	: opts.dataType||'json',
			            cache 		: opts.cache ||'true',
			            timeout 	: 5,
			            data: {
			                values: opts.data
			            }
	       		},
	       		function(ret, err){
	            if(err) return alert(JSON.stringify(err) ); ;   //需要处理网络错误
	            if(ret.status==100){
	            	//数据成功返回
	            	callback(ret);
	            	opts.success(ret);
	            }else{
	            	//数据返回失败处理
	            	opts.error(ret);
	            }
	        });
    }
   
    /* @对参数进行排序处理，只能处理一维数据如果是多维无法处理
     * @return 参数的排序后的健值数组
     **/
    app.prototype.sort=function (param){
    	if($.isArray(param)){
    		return param.sort();
    	}else{
	    	var myarray=new Array();
	    	for(var key in param){
				myarray.push(key);
			}
			myarray.sort();
			return myarray;
		}
	}
	/***
	*  远程访问必须传递的参数
	*  @return 
	*/
    app.prototype.getBaseParam = function () {
			var baseParam={
					token : localStorage.access_token || 0,    //用户登陆后保存的 access_token
					appid : api.appId || 0,					 //appi
					deviceId : api.deviceId || 0,				//设备信息
			};
			return baseParam;
    };
   
	return $.request=new app();
}($ || ( $ = {} )));
