
/**
 * 
 * @ljw
 * @缓存处理
 * 采用: localStorage
 **/
;(function () {
	var app = function () {};
	
	/*
	 *
	 * @key  缓存健
	 * @value 缓存的值           如果这个值为对象就转成字符
	 * @exptime 缓存时间 秒
	 * 
	 * **/
	
	app.prototype.setItme = function (key,value,exptime) {
	 	var exptime		=exptime||28800;  //缓存时间 默认8个小时
	 	var timestamp   =parseInt(new Date().getTime()/1000)+exptime;
		try{
		    var str= (typeof value == 'object' ) ? JSON.stringify(value): value ; //转成字符保存
			localStorage.setItem(key,str);
			localStorage.setItem(key+'time',timestamp);
		}catch(oException){
			if(oException.name == 'QuotaExceededError'){
				localStorage.clear();
				localStorage.setItem(key,value);
				localStorage.setItem(key+'time',timestamp);
			}
		}
	};
	/**
	*获取缓存数据,缓存保存8个小时默认
	**/
	app.prototype.getItme = function (key) {
		  var exptime		=parseInt(localStorage.getItem(key+'time'));   
		  var timestamp  	=parseInt(new Date().getTime()/1000); 
		  if(exptime>=timestamp){
		  		var str=localStorage.getItem(key);
		  		return JSON.parse(str);//转化成数组
		  }else{
		  		localStorage.removeItem(key);
		  		return '';
		  }
	};
	/**
	* 移除数据
	**/
	app.prototype.removeItem = function (key) {
		localStorage.removeItem(key);
	};
	/**
	*获取缓存数据,缓存保存8个小时默认
	**/
	app.prototype.clear = function () {
		localStorage.clear();
	};
	return $.cache=new app();
}($ || ( $ = {} )));
