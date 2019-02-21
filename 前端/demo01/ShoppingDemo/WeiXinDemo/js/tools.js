! function (window, document) {
    function setOptions(opts1, opts2) {
        for (var i in opts2) {
            opts1[i] = opts2[i];
        }
        return opts1;
    }
    window.LoadingLayer = {
        _layer: null,
        show: function (content, element) {
            element = element || document.body;
            if (LoadingLayer2._layer) {
                LoadingLayer2._layer.parentNode.removeChild(LoadingLayer2._layer);
                LoadingLayer2._layer = null;
            }
            if (LoadingLayer._layer) {
                LoadingLayer._layer.parentNode.removeChild(LoadingLayer._layer);
            }
            LoadingLayer._layer = document.createElement("div");
            LoadingLayer._layer.className = "loading-layer-container";
            LoadingLayer._layer.innerHTML = "<div class='box'><div class='spinner'></div><div class='content'>" + (content ? content : '请稍等...') + "</div></div>";
            element.appendChild(LoadingLayer._layer);
            window.setTimeout(function () {
                LoadingLayer._layer.className = LoadingLayer._layer.className + " show";
            }, 10);
        },
        hide: function () {
            if (!LoadingLayer._layer) return;
            LoadingLayer._layer.className = LoadingLayer._layer.className.replace(/show/g, "");
            window.setTimeout(function () {
                if (!LoadingLayer._layer) return;
                LoadingLayer._layer.parentNode.removeChild(LoadingLayer._layer);
                LoadingLayer._layer = null;
            }, 200);
        }
    };
    window.LoadingLayer2 = {
        _layer: null,
        _closeCallee: null,
        show: function (content, element, callback) {
            element = element || document.body;
            LoadingLayer2._closeCallee = callback || function () {};
            if (LoadingLayer._layer) {
                LoadingLayer._layer.parentNode.removeChild(LoadingLayer._layer);
                LoadingLayer._layer = null;
            }
            if (LoadingLayer2._layer) {
                LoadingLayer2._layer.parentNode.removeChild(LoadingLayer2._layer);
            }
            LoadingLayer2._layer = document.createElement("div");
            LoadingLayer2._layer.className = "loading-layer-container loading-layer-container2";
            LoadingLayer2._layer.innerHTML = "<div class='box'><div class='spinner'></div><div class='content'>" + (content ? content : '请稍等...') + "</div><div class='close' onclick='LoadingLayer2._close()'></div></div>";
            element.appendChild(LoadingLayer2._layer);
            window.setTimeout(function () {
                LoadingLayer2._layer.className = LoadingLayer2._layer.className + " show";
            }, 10);
        },
        hide: function () {
            if (!LoadingLayer2._layer) return;
            LoadingLayer2._layer.className = LoadingLayer2._layer.className.replace(/show/g, "");
            window.setTimeout(function () {
                if (!LoadingLayer2._layer) return;
                LoadingLayer2._layer.parentNode.removeChild(LoadingLayer2._layer);
                LoadingLayer2._layer = null;
            }, 200);

        },
        _close: function () {
            LoadingLayer2.hide();
            LoadingLayer2._closeCallee();
        }
    };
    window.MaskLayer = {
        _layer: null,
        show: function (element) {
            element = element || document.body;
            if (MaskLayer._layer && MaskLayer._layer.parentNode) {
                MaskLayer._layer.parentNode.removeChild(MaskLayer._layer);
            }
            MaskLayer._layer = document.createElement("div");
            MaskLayer._layer.className = "mask-layer-container";
            // element.appendChild(MaskLayer._layer);
            element.append(MaskLayer._layer);
            window.setTimeout(function () {
                MaskLayer._layer.className = MaskLayer._layer.className + " show";
            }, 10);
        },
        hide: function () {
            if (!MaskLayer._layer) return;
            MaskLayer._layer.className = MaskLayer._layer.className.replace(/show/g, "");
            window.setTimeout(function () {
                if (!MaskLayer._layer) return;
                MaskLayer._layer.parentNode.removeChild(MaskLayer._layer);
                MaskLayer._layer = null;
            }, 200);
        }
    };
    window.AlertLayer = function (options, element) {
        element = element || document.body;
        var _options = {
            showMaskLayer: true,
            content: "hello!",
            button: [{
                    name: "取消",
                    color: '#333333',
                    callback: function () {}
                },
                {
                    name: "确认",
                    color: '#333333',
                    callback: function () {}
                }
            ]
        }
        var _opts = setOptions(_options, options);
        var $mask = document.createElement("div");
        $mask.className = "mask-layer-container";

        var $layer = document.createElement("div");
        $layer.className = "alert-layer-container";

        var $content = document.createElement("div");
        $content.className = "alert-content";
        $content.innerHTML = _opts.content;

        var $button = document.createElement("div");
        $button.className = "alert-button";
        for (var i = 0; i < _opts.button.length; i++) {
            var _btn = _opts.button[i];
            var $btn = document.createElement("a");
            $btn.style.color = _btn.color;
            $btn.innerHTML = _btn.name;
            $btn._callback = _btn.callback || function () {};
            $btn.addEventListener("click", function (e) {
                e.preventDefault();
                _close();
                this._callback.apply($btn);

            }, false);
            $button.appendChild($btn);
        }
        $layer.appendChild($content);
        $layer.appendChild($button);
        if (_opts.showMaskLayer)
            element.appendChild($mask);
        element.appendChild($layer);
        window.setTimeout(function () {
            $mask.className = $mask.className + " show";
            $layer.className = $layer.className + " show";
        }, 10);

        //close
        function _close() {
            $layer.className = $layer.className.replace(/show/g, "");
            $mask.className = $mask.className.replace(/show/g, "");
            window.setTimeout(function () {
                if ($layer.parentNode) {
                    $layer.parentNode.removeChild($layer);
                }
                if (_opts.showMaskLayer && $mask.parentNode) {
                    $mask.parentNode.removeChild($mask);
                }
            }, 200);
        }
        return {
            close: function () {
                _close();
            }
        }
    };
    LoadingLayer.show();
}(window, document);

function initNavView() {
    clearPoints('point');
    $(".navi-tip").css("margin-top","170px");
    $(".navi-dis").text("请保持手机平稳");
    esmap.ESMapUtil.playAudio("开始导航")
    $index.$startEndPoint.removeClass('show');
    $index.$search.hide();
    $index.$endNavi.show();
    $index.$animNavi.hide();
}

function resetNaviInfos() {
    navi.clearMarkers(); //清除起点终点
    navi.clearNaviLines(); //清除导航线
    $variable.$startPOI = null;
    $variable.$endPOI = null;
    $variable.$startPoint = {};
    $variable.$endPoint = {};
}

//sdk地图重复画点方法.
function drawPoints(x, y, fnum, type) {
    var floor = map.getFloor(fnum);
    var layer = floor.getOrCreateLayerByName(type + "Point", esmap.ESLayerType.IMAGE_MARKER);
    var url = 'images/start.png';
    if (type == 'end')
        url = 'images/end.png';
    var im = new esmap.ESImageMarker({
        x: Number(x),
        y: Number(y),
        height: markheight,
        url: url,
        size: 64
    });
    layer.addMarker(im);
    floor.addLayer(layer);
}
//清除点 eg: clearName=['point','points','navPoints']
function clearPoints(clearName) {
    pointNode = [];
    var fnums = map.floorNums;
    for (var i = 0; i < fnums.length; i++) {
        var floorLayer = map.getFloor(fnums[i]);
        floorLayer.removeLayersByNames(clearName); //删除一个或者多个name的图层。
    }
}

//创建导航
function createNavi() {
    if (!map.mapService.sourceData.navs || !map.mapService.sourceData.navs[0] || map.mapService.sourceData.navs[0].Nodes.length == 0) {
        console.log("地图导航数据信息不存在！");
        return;
    }
    if (!navi) {
        //初始化导航对象
        navi = new esmap.ESNavigation({
            map: map,
            locationMarkerUrl: 'images/pointer.png',
            locationMarkerSize: 150,
            speed: 1,
            followAngle: true,
            offsetHeight: markheight + 0.6,
            followPosition: true,
            followGap: 3,
            tiltAngle: 40,
            scaleLevel: 1,
            audioPlay: true,
            mode: 1, //1：人行  2：车行
            // 设置导航线的样式
            lineStyle: {
                color: '#33cc61',
                lineWidth: 6,
                //设置边线的颜色   
                godEdgeColor: '#920000',
                //设置箭头颜色
                godArrowColor: "#99ff99",
                smooth: true,
                curvature :0.1,
                //设置线为导航线样式
                lineType: esmap.ESLineType.ESARROW,
                alpha: 0.8,
                offsetHeight: markheight + 0.1,
                noAnimate: false //控制箭头动画
            },
            maxEnd: 0.5,
            scaleAnimate: true
        });
    }
}
function getUrlById(id,up){
    var arr = $variable.$FLOOR_TIPS;
    for(var i=0;i<arr.length;i++){
        if(arr[i].points.indexOf(id)>=0){
            var url = arr[i].url
            return up?url.up:url.down
        }
    }
    return null
}
function initSearchFloor() {
    var _html = "<li floor-id='0' class='active'>全部</li>";
    var floors = map.floorNames;
    for (var i = 0; i < floors.length; i++) {
        var floor = floors[i];
        _html += "<li floor-id='" + (i + 1) + "'>" + floors[i] + "</li>";
    }
    window.$search.$container.find('#floorlist').append(_html);
}

//显示路径数据
function cardInfo(data) {
    //距终点的距离
    var distance = data.remain;
    //路线提示信息
    var info = navi.naviDescriptions[data.index];
    var f = info[0] + parseInt(data.distanceToNext) + info[2];
    //过电梯提示
    isOpenFloorTip && floorTip(info[2],data);
    //普通人每分钟走80米。
    var time = distance / 80;
    // var m = parseInt(time)<=0?"":parseInt(time)+"分钟";
    var m = parseInt(time);
    var s = Math.floor((time % 1) * 60);
    $('.navi-dis').html(f);
    $(".info-box .p3").text('距终点' + distance.toFixed(1) + ' 米' + '大约需要' + (m <= 0 ? "" : (m + "分钟")) + (s <= 0 ? "" : (s + "秒")))
};
function floorTip(text,data){
    if(text&&text.indexOf("乘梯")>0&&data.distanceToNext<=5){
        if(!$state.FLOOR_TIPED){
          var _id = navi.naviDescriptionsData[data.index]["endPoint"]["id"];
          var url = 'data/'+esmapID+"/"+getUrlById(_id,text.indexOf("上行")>0);
          $index.$floorTip.children(".f-img").css("background-image","url("+url+")");
          $index.$floorTip.css("margin-top",0);
          $index.$floorTip.find("h4").text(navi.naviDescriptions[data.index+1]);
          $state.FLOOR_TIPED = true;
        }
      }else{
        if($state.FLOOR_TIPED){
          $index.$floorTip.find("h4").text("");
          $index.$floorTip.css("margin-top","-16rem");
          $state.FLOOR_TIPED = false;
        }
      }
}


//#######################################################################
//#######################################################################
//#######################################################################

//创建导航
function createNavi() {
	if(!map.mapService.sourceData.navs || !map.mapService.sourceData.navs[0] || map.mapService.sourceData.navs[0].Nodes.length == 0) {
		console.log("地图导航数据信息不存在！");
		return;
	}
	if(!navi) {
		//初始化导航对象
		navi = new esmap.ESNavigation({
			map: map,
			locationMarkerUrl: 'images/pointer.png',
			locationMarkerSize: 150,
			speed: 1,
			followAngle: true,
			offsetHeight: markheight + 0.6,
			followPosition: true,
			followGap: 3,
			tiltAngle: 40,
			scaleLevel: 1,
			audioPlay: true,
			mode: 1, //1：人行  2：车行
			// 设置导航线的样式
			lineStyle: {
				color: '#33cc61',
				lineWidth: 6,
				//设置边线的颜色   
				godEdgeColor: '#920000',
				//设置箭头颜色
				godArrowColor: "#99ff99",
				smooth: true,
				curvature: 0.1,
				//设置线为导航线样式
				lineType: esmap.ESLineType.ESARROW,
				alpha: 0.8,
				offsetHeight: markheight + 0.1,
				noAnimate: false //控制箭头动画
			},
			maxEnd: 0.5,
			scaleAnimate: true
		});

	}
	navi.on("walking", function(data) {
		showDis(data)
		//定位旋转
		lm.rotateTo(-data.angle);
	})
	navi.on("complete", function() {
		//$('#description').html("到达终点")
		console.log("到达终点导航停止")
	})
}

function createLocMarker() {
	lm = new esmap.ESLocationMarker({
		url: 'images/pointer.png',
		size: 150,
		height: 30
	});
	map.addLocationMarker(lm);
	lm.setPosition({
		x: 12636729.2273013,
		y: 2539292.1068505,
		floornum: 1,
		zOffset: 1 //离地面的偏移量
	})
	//为navi对象绑定定位标注
	navi.locationMarker = lm;
}
//显示路径数据
function showDis(data) {
	//距终点的距离
	distance = data.remain;
	//路线提示信息
	var info = navi.naviDescriptions[data.index];
	var f = info[0] + parseInt(data.distanceToNext) + info[2];
	// //当距离小于距离终点的最大距离时结束导航
	// if (distance < maxEndDistance) {
	//   distance = 0;
	//   f = '到达终点';
	// }
	//普通人每分钟走80米。
	var time = distance / 80;
	var m = parseInt(time);
	var s = Math.floor((time % 1) * 60);
	$('#description').html('<p>距终点：' + distance.toFixed(1) + ' 米</p><p>大约需要：  ' + m + '  分钟   ' + s +
		'   秒</p><p>路线提示：' + f + ' </p>');
};

function setStartEnd() {
	if(navi) {
		navi.setStartPoint({
			x: 12636729.2273013,
			y: 2539292.1068505,
			fnum: 1,
			height: 1,
			url: 'images/start.png',
			size: 64
		});
		navi.setEndPoint({
			x: 12636723.3994618,
			y: 2539298.9451783,
			fnum: 1,
			height: 1,
			url: 'images/end.png',
			size: 64
		});
		// 画导航线
		navi.drawNaviLine();
	};
}

//function startCount() {
//	countID = setInterval(function() {
//		count++;
//	}, 10);
//}

function watchAcceleration() {
	accelerationID = plus.accelerometer.watchAcceleration(function(a) {
		motionHandler({
			x: a.xAxis,
			y: a.yAxis,
			z: a.zAxis
		});
	}, function(e) {
		console.log("获取加速度失败 " + e.messae);
	}, 10);
}

function watchOrientation() {
	orientationID = plus.orientation.watchOrientation(function(o) {
//		console.log("Orientation 方向\nAlpha:" + o.alpha + "\nBeta:" + o.beta + "\nGamma:" + o.gamma);
		if(first_orietation) {
			lastDegree = o.alpha;
			first_orietation = false;
		} else {
			currentDegree = o.alpha;
			if(Math.abs(currentDegree - lastDegree) > 1) {
				console.log("绝对角 " + currentDegree + "  转换地图角：" + ((90.0 + 360.0 - lastDegree) % 360));
				degree = lastDegree;
				//改变方向
				lastDegree = currentDegree; //这里是-的角度，注意
			}
		}

	}, function(e) {
		console.log("Orientation error: " + e.message);
	}, 10);

}

function stopNavi() {
	plus.accelerometer.clearWatch(accelerationID);
	plus.orientation.clearWatch(orientationID);
	//clearInterval(countID);
	//	clearInterval(naviID);
}

function rad(d) {
	return d * Math.PI / 180.0;
}

function updateUI() {
	degreeSub = (90.0 + 360.0 - lastDegree) % 360; //相对地球竖直向上↑的角度差 角度从逆时针算
	console.log("绝对角度 :" + degreeSub);
	var lenStep = 0.75; //走的距离 需要转换 ,假定1.0
	var dia = rad(degreeSub);
	var sinStepY = lenStep * Math.sin(dia)
	var cosStepX = lenStep * Math.cos(dia)
	var curX = lastPos.x + cosStepX;
	var curY = lastPos.y + sinStepY;
	updateCoord(curX, curY);
	//更新到CustomApplcation
	lastPos.x = curX, lastPos.y = curY;

}

function initVar() {
	data = []; //用来记录数据的
	arr = []; //记录△
	status = 0; //是否为开车
	min = 0.5,max = 1.552188;
	temp = {
		X: 0,
		Y: 0,
		Z: 0
	};
	point = 0;
	data.push(temp);
	//获取传感器上加速器的数据
	count = 0;
	//存放三轴数据
	oriValues = [];
	//当前传感器的值
	gravityNew = 0;
	//上次传感器的值
	gravityOld = 0;
	//上次波峰的时间
	timeOfLastPeak = 0;
	//此次波峰的时间
	timeOfThisPeak = 0;
	//波峰波谷时间差
	TimeInterval = 250;
	//当前的时间
	timeOfNow = 0;
	//波峰值
	peakOfWave = 0;
	//初始阈值
	ThreadValue = 2.0;
	//动态阈值需要动态的数据，这个值用于这些动态数据的阈值
	InitialValue = 1.3;
	count1 = 0;
	//上一点的状态，上升还是下降
	lastStatus = false;
	//是否上升的标志位
	isDirectionUp = false;
	//持续上升次数
	continueUpCount = 0;
	//上一点的持续上升的次数，为了记录波峰的上升次数
	continueUpFormerCount = 0;
	//波谷值
	valleyOfWave = 0;
	//用于存放计算阈值的波峰波谷差值
	ValueNum = 4;
	tempValue = new Array(ValueNum);
	tempCount = 0;
}

function startNavi() {
	//临时确定一个起点终点
	lastPos.x=12636729.2273013;
	lastPos.y=2539292.1068505;
	/******初始化所有变量****/
	//	count = 0;
	//	step = 0;
	//	lastStep = 0;
	//	aid = 0;
	//	xyzlen = 0;
	//	alpha = -1;
	//	first_orietation = true;
	//	lastDegree = 0;
	//	currentDegree = 0;
	//	points = [];
	initVar();
	/**********/

	coordIndex = 0;
	//	startCount();
	watchAcceleration()
	watchOrientation();

	navi.start();
	navi.on("reRouting", function() {
		$('#description').text("路径偏移，重新规划路径")
	})
	//	updateCoord() //直接开始导航。
	//改为每隔一段时间就取出加速度和方向数据拉更新UI

	/*********************************************/
	//注意初始化lastPos
	/********************************************/
	//	naviID = setInterval(function() {
	//		degreeSub = (90.0 + 360.0 - lastDegree) % 360; //相对地球竖直向上↑的角度差 角度从逆时针算
	//		console.log("绝对角度 :" + degreeSub);
	//
	//		stepSub = 0;
	//		if((stepSub = (step - lastStep)) != 0) { //减去之前的步数 
	//			var tx;
	//			var ty;
	//			if(stepSub < 0) { //感觉不会<0
	//				tx = lastPos.x;
	//				ty = lastPos.y;
	//				console.log("step 差 小于 0 啦？？");
	//			} else {
	//				console.log("md 有更新吗？？");
	//				var lenStep = stepSub * 0.5; //走的距离 需要转换 ,假定步长0.5
	//				var dia = rad(degreeSub);
	//				var sinStepY = lenStep * Math.sin(dia)
	//				var cosStepX = lenStep * Math.cos(dia)
	//				var curX = lastPos.x + cosStepX;
	//				var curY = lastPos.y + sinStepY;
	//				updateCoord(curX, curY);
	//				//更新到CustomApplcation
	//				lastPos.x = curX, lastPos.y = curY;
	//				laseStep = step;
	//			}
	//
	//		}
	//	}, 1000);

}

//画单个点
function drawPoint(x, y, fnum) {
    if (!fnum) return;
    var fnums = map.floorNums;
    for (var i = 0; i < fnums.length; i++) {
        var floorLayer = map.getFloor(fnums[i]);
        floorLayer.removeLayersByNames('point'); //删除一个或者多个name的图层。
    }
    var floor = map.getFloor(Number(fnum));
    var dyMarkerLayer = floor.getOrCreateLayerByName("point", esmap.ESLayerType.IMAGE_MARKER);
    var url = "images/user.png";
    var im = new esmap.ESImageMarker({
        x: Number(x),
        y: Number(y),
        height: markheight+1,
        url: url,
        size: 64
    });
    dyMarkerLayer.addMarker(im);
    floor.addLayer(dyMarkerLayer);
}
function mydrawPoint(x, y, fnum) {
    var floor = map.getFloor(Number(fnum));
    var dyMarkerLayer = floor.getOrCreateLayerByName("point", esmap.ESLayerType.IMAGE_MARKER);
    var url = "images/loc.png";
    var im = new esmap.ESImageMarker({
        x: Number(x),
        y: Number(y),
        height: markheight+1,
        url: url,
        size: 64
    });
    dyMarkerLayer.addMarker(im);
    floor.addLayer(dyMarkerLayer);
}

//定位真实导航坐标
function updateCoord(curX, curY) {
	//	var points = [];
	//	timer = setInterval(function() {
	//		if(coordIndex >= coordsData.length) {
	//			clearInterval(timer)
	//			return;
	//		}
	//		var coord = coordsData[coordIndex];
	//		navi.walkTo(coord);
	//		points.push(coord);
	//		drawLine(points);
	//		coordIndex++;
	//	}, 1000)

	var coord = {
		x: curX,
		y: curY,
		z: 26,
		fnum: 1
	};
	navi.walkTo(coord);
	points.push(coord);
	console.log("画点点！！！！！！！！！！！！！！！！！")

	//将点的信息存到缓存里
	//mydrawPoint(coord.x,coord.y,coord.fnum);
	//app.setCoord(coord);
	console.log(coord.x);
	console.log(coord.y);
	console.log(coord.fnum);
	console.log("~~~~~~~~~~~~~~~~~~~~~~");
	drawLine(points);

}

//改成蓝蓝的标标在动
function drawLine(points) {
	if(points.length && points.length <= 1) return;
	//drawPoint(points);
	map.clearLineMarkById("routes")
	//配置线标注样式
	var lineStyle = {
		lineWidth: 6,
		alpha: 0.8,
		offsetHeight: 0,
		lineType: esmap.ESLineType.FULL
	}

	//创建线标注对象
	line = new esmap.ESLineMarker("routes", points, lineStyle)
	//调用地图的画线方法
	map.drawLineMark(line);
	line.o3d_.visible = lineVisible;
}