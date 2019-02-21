/*
 * index container
 */

window.$index = {
	$container: $('div.index-container'), //index 框架
	$search: $('#searchButton-module'), //search 搜索框
	$poiInfo: $('#poiInfo-control'), //poi poi详情展示
	$startEndPoint: $('#startEndPoint-module'), //start_end 选择起点终点
	$startNav: $('#startNav-control'), //start_nav 开始导航按钮
	$animNavi: $(".anim-btn"), //模拟导航开始按钮
	$endNavi: $(".end-btn"), //结束导航按钮
	$floorTip:$(".floor-tip")  //楼层提示框
};
/*
 * search container
 */
window.$search = {
	$container: $('div.search-container'), //search 框架
	$head: $('#head-module'), //head 顶部搜索模块
	$result: $('#sResult-control'), //result 搜索结果
	$history: $('#sHistory-control'), //history 历史记录
	$facility: $('#facility-control'), //facility 公共设施
};
/*
 * variable 常用变量
 */
window.$variable = {
	$startPOI: null, //起点  poi信息
	$endPOI: null, //终点  poi信息
	$startPoint: {}, //起点  坐标/楼层索引
	$endPoint: {}, //终点  坐标/楼层索引
	$navSelectPointType: '', //导航选点类型
	$navSelectPointText: '', //导航选点文本
	$queryFloorID: '', //搜索楼层ID
	$queryKeyName: '', //查询key
	$POI_Cache: [], //搜索结果 poiID为key值
	$FLOOR_TIPS:null
};
/*
 * nav state 导航状态
 */
window.$state = {
	MAP_READY: false, //地图是否已加载
	IS_SEARCH_ING: false, //是否搜索中
	IS_NAV_SEARCH_SHOW: false, //是否导航搜索模式
	MAP_CLICK: true, //地图是否可以点击查询poi信息
	ANIM_NAVING: false, //模拟导航状态
	FLOOR_TIPED:false
};
//检查当前hash值
hashChange();
//初始化搜索模块
_init_search_container();
//初始化首页
_init_index_container();

//hash change
function hashChange() {
	switch (location.hash) {
		case "#search":
			$search.$container.addClass('show');
			//进入搜索页，取消搜索状态 (用户操作搜索结果之后再开启搜索状态)
			$state.IS_SEARCH_ING = false;
			//导航搜索模式
			if ($state.IS_NAV_SEARCH_SHOW) {

				$search.$facility.hide();

				$search.$result.find('ul').addClass('showBtn').find('li')
					.find('.btn').removeClass('start').removeClass('end').addClass($variable.$navSelectPointType).text($variable.$navSelectPointText);

				if ($variable.$queryKeyName != '') {
					$search.$head.find('.input-box').removeClass('showSearch').addClass('showSearch2');
				}

			} else {

				$search.$facility.show();

				$search.$result.find('ul').removeClass('showBtn').find('li')
					.find('.btn').removeClass('start').removeClass('end');

				if ($variable.$queryKeyName != '') {
					$search.$head.find('.input-box').removeClass('showSearch2').addClass('showSearch');
					$search.$facility.hide();
				}
			}

			break;

		default:

			$search.$container.removeClass('show');

			if ($state.MAP_READY && !$state.IS_SEARCH_ING) {

				if ($state.IS_NAV_SEARCH_SHOW) {} else {
					$extend.fn_resetInitMap();
				}
			}
			//取消导航搜索模式
			$state.IS_NAV_SEARCH_SHOW = false;
			break;
	}
}
/*
 * init search function
 */
function _init_search_container() {
	// head
	$search.$head
		/*返回首页*/
		.on('click', '.back-button', function () {
			history.back();
		})
		/*显示搜索楼层选择*/
		.on('click', '.floor-box', function () {
			$(this).find('.ul').toggleClass('show');
		})
		/*搜索楼层选择*/
		.on('click', '.floor-box .ul li', function () {

			$(this).addClass('active').siblings().removeClass('active');

			$(this).parent().siblings().attr('floor-id', $(this).attr('floor-id')).text($(this).text());

			$variable.$queryFloorID = $(this).attr('floor-id');

			if ($variable.$queryKeyName != '') {
				$extend.fn_keyQueryParser($variable.$queryKeyName);
			}

		})
		/*input改变*/
		.on('input propertychange', '.input-box input', function () {
			//同时绑定input和propertychange事件，兼容IE
			var value = $(this).val();

			if (value.trim() == '') {
				$extend.fn_resetDefaultSearch();
			} else {
				$extend.fn_keyQueryParser(value);
			}
		})
		/*清除*/
		.on('click', '.input-box .close', function () {
			$extend.fn_resetDefaultSearch();
		})
	//历史记录
	$search.$history
		/*列表点击*/
		.on('click', 'li', function () {
			var value = $(this).text();
			$search.$head.find('.input-box').find('input').val(value);
			$extend.fn_keyQueryParser(value);
		})
		/*清空列表*/
		.on('click', '.empty-btn.on', function () {
			AlertLayer({
				content: "<p style='color:#fd3d3c'>确认清空搜索历史吗？</p>",
				button: [{
						name: "取消"
					},
					{
						name: "确认清空",
						callback: function () {
							$extend.removeHistory();
							$extend.resetHistory();
						}
					}
				]
			});

		});
	//poi详情
	$index.$poiInfo
		/*关闭*/
		.on('click', '.close', function () {
			$index.$poiInfo.hideControl(function () {
				if ($index.$startEndPoint.hasClass('show')) {
					$index.$startNav.showControl();
				}
			});
		})
		/*返回*/
		.on('click', '.btn-back', function () {
			if ($index.$allPoiList.hasClass('view')) {
				$index.$allPoiList.showControl();
			} else {
				location.hash = 'search';
			}
		})
		/*到这去*/
		.on('click', '.goBtn', function () {
			var poiInfo = $index.$poiInfo.data('poiInfo');
			$extend.fn_setNavStartAndEndPoint(poiInfo, 'end');
		})
		/*设为起点*/
		.on('click', '.btn-start', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var poiInfo = $index.$poiInfo.data('poiInfo');
			$extend.fn_setNavStartAndEndPoint(poiInfo, 'start');
		})
		/*设为终点*/
		.on('click', '.btn-end', function (e) {
			e.preventDefault();
			e.stopPropagation();
			var poiInfo = $index.$poiInfo.data('poiInfo');
			$extend.fn_setNavStartAndEndPoint(poiInfo, 'end');
		})


	//搜索结果  
	$search.$result
		/*列表点击*/
		.on('click', 'li', function () {
			//处于搜索状态
			$state.IS_SEARCH_ING = true;
			var poiInfo = null,
				poiID = $(this).attr('poi-id');
			if ($state.IS_NAV_SEARCH_SHOW) {
				poiInfo = $variable.$POI_Cache[poiID];
				$extend.fn_setNavStartAndEndPoint(poiInfo, $variable.$navSelectPointType);
			} else {
				
				poiInfo = $variable.$POI_Cache[poiID];
				drawPoint(poiInfo.x, poiInfo.y, poiInfo.fnum);
				
				//最终要搜素的房间
//				{x: 12636763.9341173, y: 2539335.3432394, fnum: 1, FloorName: "F1", name: "F1-房间2"}
				console.log("domInit--poiInfo:");
				console.log(poiInfo);
				
				map.changeFocusFloor(poiInfo.fnum);
				map.moveTo({
					x: Number(poiInfo.x),
					y: Number(poiInfo.y),
					FloorNum: poiInfo.fnum,
					time: 0.5
				});
				showNavDiv(poiInfo);
			}
			history.back();
			$search.$head.find('.input-box').find('input').val(poiInfo.name);
			$extend.fn_keyQueryParser(poiInfo.name);
			$extend.resetHistory(poiInfo.name);
			$index.$search.find('input').val(poiInfo.name).siblings('.close').show();
		});
		
	
//	//二维码测试
//	$("#mytest").click(function(){
//		var poiInfo={};
//		poiInfo.x=12636763.9341173;
//      poiInfo.y=2539335.3432394;
//      poiInfo.fnum=1;
//      poiInfo.FloorName="F1";
//      poiInfo.name="F1-房间2";
//
//		drawPoint(poiInfo.x, poiInfo.y, poiInfo.fnum);
//		map.changeFocusFloor(poiInfo.fnum);
//		map.moveTo({
//			x: Number(poiInfo.x),
//			y: Number(poiInfo.y),
//			FloorNum: poiInfo.fnum,
//			time: 0.5
//		});
//		//显示下面的设置起点与终点
//		showNavDiv(poiInfo);
//	});
	
	
	//公共设施
	$search.$facility
		.on('click', '.moveBtn', function () {
			if ($(this).hasClass('show')) {
				$(this).removeClass('show').siblings().removeClass('show');
			} else {
				$(this).addClass('show').siblings().addClass('show');
			}
		})
		.on('click', '.itemBtn', function () {
			var title = $(this).find('span').text();
			$search.$head.find('.input-box').find('input').val(title);
			$extend.fn_keyQueryParser(title);
		});
}

function _init_index_container() {
	//首页搜索框点击
	$index.$search.on('click', function () {
			location.hash = 'search';
		})
		/*close*/
		.on('click', '.close', function (e) {
			e.stopPropagation();
			$extend.fn_resetInitMap();
		});
	//顶部 选择起点终点模块  
	$index.$startEndPoint
		/*返回*/
		.on('click', '.btn-back .btn', function () {
			$index.$startEndPoint.removeClass('show');
			$index.$poiInfo.hideControl();
			$index.$startNav.hideControl();
			$index.$startEndPoint.find('.show-box').find('.start-box').find('input').val('');
			$index.$startEndPoint.find('.show-box').find('.end-box').find('input').val('');
			resetNaviInfos();
		})
		/*切换*/
		.on('click', '.btn-change .btn', function () {
			$extend.fn_exchangeStartEndPoint();
		})
		/*选择起点*/
		.on('click', '.show-box .start-box', function () {
			$extend.fn_navSelectPoint('start');
		})
		/*选择终点*/
		.on('click', '.show-box .end-box', function () {
			$extend.fn_navSelectPoint('end');
		});
	//模拟导航
	$index.$animNavi
		.on("click", function () {
			startAnimNavi();
		});
	//真实导航 
	$index.$startNav
		.on('click', '.real-btn', function (e) {
			startRealNavi();
		})
	//结束导航
	$index.$endNavi
		.on("click", function (e) {
			endNavi();
		})
}