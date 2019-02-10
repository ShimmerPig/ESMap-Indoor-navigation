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