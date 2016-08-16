;(function () {
	var app = function () {};
	app.prototype.getCityCode = function () {
		/* 调用bMap */
		$.bMap.init();
		$.bMap.name(function (ret) {
			alert(JSON.stringify(ret));
		});
	};
	//写入html
   	var main = new app();
    $.homeIndex = function () {
		$.app.swipe();
    	/*var cityid=87; //上线后修改成正式的，读取目前的位置
    	//获取广告
        $.homeData.exec('ads',{'area':cityid,'position':1},function(){
			$.app.swipe();
		});*/
		/*
        //品牌推荐
        $.homeData.exec(
        	'brands',
        	{'area':cityid,'position':2},
        	function(){}
        );
        //同城和大家都在买
        $.homeData.exec(
        	'bill',
        	{'area':cityid,'position':3},
        	function(){$.app.swipe();}
        );
        //获取附近店铺
        $.homeData.exec(
        	'shop',
        	//{'cityid':87,'latitude':,'longitude':,'shopid':0}  
        	{'cityid':cityid,'shopid':0} , 
        	function(){$.app.swipe();}
        );*/
    };
    
    
}());