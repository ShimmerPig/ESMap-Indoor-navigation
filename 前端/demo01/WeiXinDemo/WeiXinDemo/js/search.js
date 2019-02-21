
window.$extend = {};

// 执行extend
_search_extend();

/*
 * extend function
 */
function _search_extend(){
	//查询回调自增索引
	var _query_callback_index = 1;
	//关键字查询结果分布  wwj
	$extend.fn_keyQueryParser = function(value, callback){
		//暂存搜索key
		$variable.$queryKeyName = value;
		
		//打印出搜索栏里面的文字
		//F
		//F1-房间2
		console.log("value:");
		console.log(value);
		
		//导航搜索模式
		if($state.IS_NAV_SEARCH_SHOW){
			$search.$head.find('.input-box').removeClass('showSearch').addClass('showSearch2');
		}else{
			$search.$head.find('.input-box').removeClass('showSearch2').addClass('showSearch');
		}
		$search.$facility.hide();
		$search.$history.hide();
		$search.$result.show().find('.tips').text('搜索中...');
		
        var param = {
            types:["model"],
            keyword: value
        };
		var fnum = $variable.$queryFloorID
		
		//打印为空
		console.log("fnum:");
		console.log(fnum);
		
        if(!fnum){
        	fnum="all";
        }else{
        	fnum=Number(fnum);
        }
        //模糊查询poi信息 根据名字
        esmap.ESMapUtil.search(map, fnum,param, function (mapdatas) {
        	$search.$result.find('ul').empty();
        	
        	//模糊搜索结果的数组
//      	0:{data_: {…}, FloorNum: 1, ID: 48535, name: "F1-房间2", typeID: 70001, …}
//			length:1
//			__proto__:Array(0)
        	console.log("mapdatas:");
        	console.log(mapdatas);
        	
        	//数组长度：1
       		console.log("mapdatas.length:");
       		console.log(mapdatas.length);
        	
        	if(mapdatas.length >= 1){
				var html = '', reg = new RegExp(value,'gi');
				for(var i = 0; i < mapdatas.length; i++){
					var item = mapdatas[i];
					var floorName=map.getFloor(item.FloorNum).data_.NameEn;
					var id = item.ID;
					
					var poiInfo={};
					poiInfo.x=item.mapCoord.x;
			        poiInfo.y=item.mapCoord.y;
			        poiInfo.fnum=item.FloorNum;
			        poiInfo.FloorName=floorName;
			        poiInfo.name=item.name;
			        
			        console.log("item:");
			        console.log(item);
			        console.log("floorName:");
			        console.log(floorName);
			        console.log("id:");
			        console.log(id);
			        console.log("poiInfo:");
			        console.log(poiInfo);
			        
					$variable.$POI_Cache[id]=poiInfo;
					var _name = item.name.replace(reg,function (key) {
						return "<font>"+key+"</font>";
			        });
					var _nameHtml = floorName+"层  "+_name;
					html += "<li poi-id='" +id + "'>"+ _nameHtml + "<a class='btn "+$variable.$navSelectPointType+"'>"+$variable.$navSelectPointText+"</a></li>";
				}
				$search.$result.find('ul').append(html);
				$search.$result.find('.tips').hide();
        	}else{
        		$search.$result.find('.tips').show().text('暂未搜索到任何相关信息');
        	}
        });
	};
	//恢复搜索页初始状态
	$extend.fn_resetDefaultSearch = function(){
		
		$variable.$queryKeyName = '';
		
		$search.$result.hide().find('ul').empty();
		
		$search.$head.find('.input-box').removeClass('showSearch').removeClass('showSearch2').find('input').val('');
		
		$search.$history.show();
		
		if($state.IS_NAV_SEARCH_SHOW){
			
			return;
		}
		
		$search.$facility.show();
	};
	
	
	
	//存入key历史记录
	$extend.addHistory = function(keyName){
		var _history = localStorage.getItem("esmap_history");
		var _strArr = [];
		if(_history){
			_strArr = JSON.parse(_history);
		}
		if(!_strArr.includes(keyName)){
			_strArr.push(keyName);
			localStorage.setItem("esmap_history",JSON.stringify(_strArr));
		}
	};
	
	//get历史记录
	$extend.getHistory = function(){
		var _strArr = localStorage.getItem("esmap_history");
		return JSON.parse(_strArr);
	};
	
	//删除历史记录
	$extend.removeHistory = function(){
		localStorage.removeItem("esmap_history");
	};
	
	//更新历史记录(触发dom变化)
	$extend.resetHistory = function(value){
		value && $extend.addHistory(value);
		if($extend.getHistory()){
			var list = $extend.getHistory(), html = '';
			for(var i = list.length - 1; i >= 0; i--){
				html += "<li>"+list[i]+"</li>";
			}
			$search.$history.find('.list').empty().append(html);
			$search.$history.find(".empty-btn").addClass("on").text("清空搜索历史");
		}
		else{
			$search.$history.find('.list').empty();
			$search.$history.find(".empty-btn").removeClass("on").text("您暂未搜索任何记录!");
		}
	};
	$extend.resetHistory();
}

