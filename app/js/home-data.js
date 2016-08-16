/****
 *
 * 首页数据处理了类
 * 
 * @auther   ljw
 * @addtime   2016年0806
 *  
 */
;(function () {
	var app = function () {
		
		this.alias={
			'ads'	:{'fn':'bannerHtml','url'	:'/ads/index/index'}, //首页顶部广告
			'brands':{'fn':'brandsHtml', 'url'	:'/ads/index/index'}, //品牌推荐广告
			'bill'	:{'fn':'billHtml',  'url'	:'/ads/index/index'}, //同城品质推荐广告
			'shop'	:{'fn':'listHtml',  'url'	:'/shop/index/index'},//附近美容院
		};
		this.shopid=0;//本次加载的最后一个店铺ID 
		
	};
	
	
	app.prototype.exec = function (url,data,callback,exptime,cache) {
			var p	=this.alias[url] || null;
			var fn	=this[p['fn']] || function(ret,t){};
			
			if(p){
				var opts={
						'url' 		:p['url'],
		        		'data'		:data ||{},
		        		'exptime'	:exptime || 100,
						'cache'		:cache || false,  //上线修改为 true
		        		success:function(ret) {
	        				fn(ret,callback);
	        			},
	        			error:function(err) {callback();},
	        	};
	        	$.request.getData(opts);
	      }
    };
	/***
	*  首页顶部广告
	* @param {Object} data     info{thumb(图片),click_link(点击后链接)}
 	* @param {Object} callback
	* 
	**/
	app.prototype.bannerHtml = function (data,callback) {
		//alert(JSON.stringify(data) ); 
		callback = typeof callback == 'function' ? callback:function(){};
		if(data.status==100){
        	var info=data.data.info;
        	var html='';
        	if(info){
			    for(var i in info){
					html += '<div class="banner-item" style="background-image: url('
					html += info[i].thumb;
					html += ')" data-event="openUrl" data-params="https://baidu.com"></div>';
					html += '<div class="banner-item" style="background-image: url(../images/home-index-banner.jpg)" data-event="openUrl" data-params="https://baidu.com"></div>';
			     };
				if(html){
					$('.banner-group').html(html);
					callback();
				};
			}
		}	
     }
    /***
    *  首页 品牌推荐 
    *
    * @param {Object} data{thumb(图片)}
 	* @param {Object} callback
    */ 
    app.prototype.brandsHtml = function (data,callback) {
    	//alert(JSON.stringify(data) ); 
		callback = typeof callback == 'function' ? callback:function(){};
		if(data.status==100){
        	var info=data.data.info;
        	var html='';
        	//alert(JSON.stringify(info) ); 
			if(info){
			    for(var i in info){
			         html+="<div class='brands-item'>";
	                 html+="<img src='"+info[i].thumb+"'/>";
	                 html+="</div>";
                 }
			     if(html){
			     	
			     	$('.brands-group').html(html);
        			callback();	
			     }
			}
		}	
     }
    /***
    * 同城品质区域
    * 
    * 
 	* @param {Object} data{name(名称),thumb（图片）}
 	* @param {Object} callback
    */ 
    app.prototype.billHtml = function (data,callback) {
    	//alert(JSON.stringify(data) ); 
		callback = typeof callback == 'function' ? callback:function(){};
		if(data.status==100){
        	var info=data.data.info;
        	var html='';
        	//alert(JSON.stringify(info) ); 
			if(info){
			    for(var i in info){
			    	html+='<div class="bill-item">';
                    html+='<div class="bill-title">'+info[i].name+'</div>';
                    html+='<div class="bill-context"><img src="'+info[i].thumb+'" /></div>';
                    html+='</div>';
                 }
			     if(html){
			     	$('.bill-group').html(html);
        			callback();	
			     }
			}
		}	
     }
   
    /***
    * 首页店铺列表信息
 	* @param {Object} data 
 	* @info {id,thumb（logo）,name（名称）,tips(促,减,折),
 	* @		description(描述),address（地址）,distance（距离）,star（星）,
 	* @		bs_count（点评）
 	* @		}
 	* @param {Object} callback
    */ 
    app.prototype.listHtml = function (data,callback) {
    	
		callback = typeof callback == 'function' ? callback:function(){};
		if(data.status==100){
        	var info=data.data.info;
        	var html='';
        	//alert(JSON.stringify(info) ); 
			if(info){
			    for(var i in info){
			    	$.cache.setItme('shopid',info[i].id);
			    	//shopid=info[i].id;
			    	html+='<div class="list-item" data-event="openStoreWin" data-params="'+info[i].id+'">';
                    	   if(info[i].thumb){
                    			html+="<div class='list-item-left'><img src='"+info[i].thumb+"' /></div>";
                    		}else{
                    			html+='<div class="list-item-left"><img src="../images/home-beauty.jpg" /></div>';
                    		}
                    	    html+='<div class="list-item-right">';
                                    // start list-item-title
                                    html+='<div class="list-item-title">';
                                    	html+='<p>'+info[i].name+'</p>';
                                        var tips=info[i].tips || null;
                                        if(tips){
                                          html+='<div class="tips-group">';
                                          	for(var j in tips){
                                          		html+='<div class="'+tips[j].classname+'">'+tips[j].name+'</div>';
                                          	 }
                                          html+='</div>';
                                        }
                            		html+='</div>'; //end list-item-title
                                   
                            		html+='<div class="list-item-info">'+info[i].description+'</div>';
                                 
		                            // start  list-item-addr         
		                            html+='<div class="list-item-addr">';
		                                            html+='<div class="addr-left">'+info[i].address+'</div>';
		                                            html+='<div class="addr-right">';
		                                            	html+='<i class="icon-place"></i>';
		                                            	html+='<span>&lt;'+info[i].distance+'</span>';
		                                            html+='</div>';
		                            html+='</div>';
		                            //end list-item-addr          
                             
		                             // start  list-item-review
		                             html+='<div class="list-item-review">';
		                                        var star=info[i].star||0;
		                                        var star2=5-star;
		                                        	for(var j=1;j<=star;j++){
		                                        		html+='<i class="icon-star active"></i>';
		                                        	}
		                                        	for(var j=1;j<=star2;j++){
		                                        		html+='<i class="icon-star"></i>';
		                                        	}
		                                         html+='<span>'+info[i].bbs_count+'人评价</span>';
		                                         
		                              html+='</div>';
		                              //end list-item-review
                                     
                                     
                           html+='</div>';//end list-item-right
                                    
                      html+='</div>'; //end list-item
                 }
			     if(html){
			     	$('.list-group').html(html);
        			callback();	
			     }
			}
		}	
     }
   return $.homeData= new app(); 
}());