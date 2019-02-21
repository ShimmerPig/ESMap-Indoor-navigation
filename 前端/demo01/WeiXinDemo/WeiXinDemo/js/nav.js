/*
 * extend object
 */
//执行extend
_index_extend();
//设为起点、终点的公共方法
$extend.fn_setNavStartAndEndPoint = function (poiInfo, type) {
	var _$start = $index.$startEndPoint.find('.show-box').find('.start-box'),
		_$end = $index.$startEndPoint.find('.show-box').find('.end-box');
	//设为起点
	function _setStartCallee(poi) {
		_$start.find('input').val(poi.name + " " + poi.FloorName);
		$variable.$startPOI = poi;
		$variable.$startPoint = {
			x: poi.x,
			y: poi.y,
			fnum: poi.fnum
		};
		clearPoints(['point', 'startPoint']);
		drawPoints(poi.x, poi.y, poi.fnum, type);
	}
	//设为终点
	function _setEndCallee(poi) {
		_$end.find('input').val(poi.name + " " + poi.FloorName);
		$variable.$endPOI = poi;
		$variable.$endPoint = {
			x: poi.x,
			y: poi.y,
			fnum: poi.fnum
		};
		clearPoints(['point', 'endPoint']);
		drawPoints(poi.x, poi.y, poi.fnum, type);
	}
	//设置起点
	if (type == 'start') {
		_setStartCallee(poiInfo);
	}
	//设置终点
	else if (type == 'end') {
		_setEndCallee(poiInfo);
	}
	//规划路径
	$extend.fn_requestRoute();
	if (navi.startData && navi.endData) {
		if (navi.outcome) {
			//显示开始导航按钮
			$index.$startNav.showControl();
			//显示
			$index.$startEndPoint.addClass('show');
			$index.$poiInfo.hide()
		} else {
			$index.$poiInfo.hide()
			AlertLayer({
				content: "<p style='color:#fd3d3c'>无法到达，请重新选点</p>",
				button: [{
					name: "确定",
					callback: function () {
						$index.$poiInfo.show();
						resetNaviInfos();
					}
				}]
			});
		}
	}
	mapCoord = {
		x: 0,
		y: 0
	};
};

function _index_extend() {
	// 切换起点终点
	$extend.fn_exchangeStartEndPoint = function () {
		var s = $variable.$startPOI;
		$variable.$startPOI = $variable.$endPOI;
		$variable.$endPOI = s;
		var p = $variable.$startPoint;
		$variable.$startPoint = $variable.$endPoint;
		$variable.$endPoint = p;
		var showBox = $index.$startEndPoint.find('.show-box');
		var b1 = showBox.find(".start-box input");
		var b2 = showBox.find(".end-box input");
		var tex = b1.val();
		b1.val(b2.val());
		b2.val(tex);
		$extend.fn_requestRoute();
	};
	// 规划路径
	$extend.fn_requestRoute = function () {
		//已设置起点终点
		if ($variable.$startPOI && $variable.$endPOI) {
			navi.clearMarkers(),
				navi.clearNaviLines();
			clearPoints(['point', 'endPoint', 'startPoint']);
			navi.setStartPoint({
				x: $variable.$startPoint.x,
				y: $variable.$startPoint.y,
				fnum: $variable.$startPoint.fnum,
				height: markheight,
				url: 'images/start.png',
				size: 64
			});
			navi.setEndPoint({
				x: $variable.$endPoint.x,
				y: $variable.$endPoint.y,
				fnum: $variable.$endPoint.fnum,
				height: markheight,
				url: 'images/end.png',
				size: 64
			});
			navi.drawNaviLine();
			//切换开始导航按钮ui
			$index.$startNav.removeClass('off').find('.info-box')
				.find('.p1').text($variable.$endPOI.name + " " + $variable.$endPOI.FloorName + '层');
			var startFloor = $variable.$startPoint.fnum;
			var endFloor = $variable.$endPoint.fnum;
			//规划路径
			var _distance = Math.floor(navi.navidistance),
				str = "";
			if (startFloor < endFloor) {
				str = "需上行至" + $variable.$endPOI.FloorName + "层";
			} else if (startFloor > endFloor) {
				str = "需下行至" + $variable.$endPOI.FloorName + "层";
			}
				$index.$startNav.find('.info-box').find('.p2').text("全长" + _distance + "米" + (str == '' ? '' : ', ' + str));
			var plat = esmap.ESMapUtil.getPlatform();
			$index.$animNavi.show();
		} else {
			//			//切换开始导航按钮ui
			$index.$startNav.addClass('off');
		}
	};
	//导航选点
	$extend.fn_navSelectPoint = function (type) {
		if (type == 'start') {
			$variable.$navSelectPointType = 'start';
			$variable.$navSelectPointText = '选为起点';
		} else {
			$variable.$navSelectPointType = 'end';
			$variable.$navSelectPointText = '选为终点';
		}
		//开启导航搜索模式
		$state.IS_NAV_SEARCH_SHOW = true;
		location.hash = 'search';
	};

	//导航完成之后 恢复初始状态
	$extend.fn_navOverResetMap = function () {
		$variable.$startPOI = null;
		$variable.$endPOI = null;
		$variable.$startPoint = {};
		$variable.$endPoint = {};
		//清除路径
		$index.$search.show();
		//允许地图点击
		$state.MAP_CLICK = true;
	}
	//恢复初始地图状态
	$extend.fn_resetInitMap = function () {
		$extend.fn_navOverResetMap();
		//隐藏首页 底部模板
		$index.$search.find('input').val('').siblings('.close').hide();
		$variable.$POI_Cache = [];
		//搜索页恢复
		$extend.fn_resetDefaultSearch();
	};
	/************************************
	 * jquery 扩展
	 ***********************************/

	var _showOut = null,
		_hideOut = null;
	//显示下方  设置起点 终点 div
	$.fn.showControl = function (callback) {
		var that = this;
		function _callee() {
			$(that).show().siblings().hide();
			callback && callback.apply(that);
		}
		_callee();
		return $(that);
	};
	//隐藏下方  设置起点 终点 div 
	$.fn.hideControl = function (callback) {
		var that = this;
		if (!$(that).is(':hidden')) {
			_hideOut = window.setTimeout(function () {
				$(that).hide();
				callback && callback.apply(that);
			}, 200);
		}
		return $(that);
	}
}

function startAnimNavi() {
	//开始模拟导航
	$state.ANIM_NAVING = true, //模拟导航状态
	initNavView();
	navi.on("walking", function (data) {
		cardInfo(data);
	})
	curfnum = null;
	setTimeout(function () {
		navi.simulate();
	}, 100)
	navi.on("complete", function () {
		navi.off("walking"); //注销walking事件
		$(".navi-dis").text("您已到达目的地");
		MaskLayer.show()
		$(".bottom-module").css("z-index", 900);
		curfnum = map.focusFloorNum
	})
	navi.on("crossFloor", function (e) {
		floorControl.changeFocusFloor(e)
	})
}

function endNavi() {
	//结束导航，同时控制模拟和真实导航
	if ($state.ANIM_NAVING) {
		$state.ANIM_NAVING = false;
		navi.stop();
	} 
	navi.clearLocationMarker();
	$index.$startNav.hideControl(function () {
		$index.$endNavi.hide();
		$index.$animNavi.show();
	});
	$(".navi-dis").text("");
	$(".navi-tip").css("margin-top", "46px");
	$index.$search.show();
	$index.$startNav.find(".p2").text("");
	$index.$startNav.find(".p3").text("");
	$index.$startEndPoint.removeClass("show");
	$(".bottom-module").css("z-index", 10);
	navi.clearMarkers(); //清除起点终点
	navi.clearNaviLines(); //清除导航线
	MaskLayer.hide();
	curfnum = map.focusFloorNum;
}