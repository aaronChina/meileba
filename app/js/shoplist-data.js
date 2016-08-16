/****
 *
 * 首页数据处理了类
 * 
 * @auther   ljw
 * @addtime   2016年0806
 *  
 */
;(function () {
	$.shoplist = function (){
		var shop =new app();
		var shopid=0;
		shop.loadData();  //加载数据
	}
	var app = function () {
		this.cityid=87;  //上线后需要传递
		this.end_shopid=0;//本次加载的最后一个店铺ID 
		this.alias={
			'shop'	:{'fn':'listHtml',  'url'	:'/shop/index/index'},//附近美容院
		};
		
	};
	
	
	/***
	*默认执行 
	*/
	app.prototype.loadData = function () {
		//获取附近店铺
        this.exec(
        	'shop',
        	//{'cityid':87,'latitude':,'longitude':,'shopid':0}  
        	{'cityid':this.cityid,'shopid':$.cache.getItme('shopidlist') || 0} 
        	
        );
	}
	/***
	*获取当前最大Id 
	*/
	app.prototype.maxShopId = function () {
		return this.end_shopid;
	}
	
	app.prototype.exec = function (url,data,callback,exptime,cache) {
	
			//alert('exec');
			//alert(JSON.stringify(this) );
			
			var p	=this.alias[url] || null;
			var fn	=this[p['fn']] || function(ret,t){};;
			
			
			
			if(p){
				var opts={
						'url' 		:p['url'],
		        		'data'		:data ||{},
		        		'exptime'	:exptime || 100,
						'cache'		:cache || false,  //上线修改为 true
		        		success:function(ret) {
		        		//alert(JSON.stringify(ret) );
		        			fn(ret,callback);
	        			},
	        			error:function(err) {callback();},
	        	};
	        	$.request.getData(opts);
	        	callback = typeof callback == 'function' ? callback:function(){};
	    		callback();
	    		
			}
    };
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
        	
			if(info){
			    for(var i in info){
			        //this.end_shopid=info[i].id; //保存最后shopid
			        html+='<div class="list-item"  data-event="openStoreWin"  data-params="'+info[i].id+'">';
                         
                         // start list-item-left 
                         html+='<div class="list-item-left">';
		                         if(info[i].thumb){
		                         		html+='<img src="'+info[i].thumb+'"  />';
		                         }else{ 
		                         	html+='<img src="../images/home-beauty.jpg"  />';
		                         }
	                     html+='</div>';
	                     //end  list-item-left 
	                     
	                     
	                     //start list-item-right
                         html+='<div class="list-item-right">';
                         
                         			//start list-item-title
                                    html+='<div class="list-item-title">';
                                        html+='<span>'+info[i].name+'</span>';
                                        var tips=info[i].tips || null;
                                        for(var j in tips){
                                        	 html+='<span class="benefit '+tips[j].classname+'">'+tips[j].name+'</span>';
                                        }
                                     html+='</div>';
                                     //end list-item-title
                                    html+='<div class="list-item-info">'+info[i].description+'</div>';
                                    
                                    // start  list-item-addr
                                    html+='<div class="list-item-addr">';
                                        html+='<div class="addr-left">'+info[i].address+'</div>';
                                        html+='<div class="addr-right">';
                                            html+='<i class="icon-place"></i>';
                                            html+='<span>&lt;'+info[i].distance+'</span>';
                                        html+='</div>';
                                    html+='</div>';
                                    // end list-item-addr
                                    
                                    // list-item-review
                                    html+='<div class="list-item-review">';
	                                    var star=info[i].star||0;
			                            var star2=5-star;
			                            for(var j=1;j<=star;j++){
			                            	html+='<i class="icon-star"></i>';
			                            }
			                            for(var j=1;j<=star2;j++){
			                            	html+='<i class="icon-star gray"></i>';
			                            }    
                                        
                                        html+='<span>'+info[i].bbs_count+'人评价</span>';
                                    html+='</div>';
                                    //end list-item-review
                                    
                                html+='</div>';
                                //end list-item-right
                            html+='</div>';   //list-item
                            
	
                 }
			    if(html){
			     	$('.list-group').html(html);
        			callback();	
			    }
			}
		}	
    }
    
   
}());