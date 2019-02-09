//定义全局map变量

var map;
var esmapID =  "test666";
// 40002
var navi; //导航对象
var floorControl; //楼层控制控件对象
//判断url中是否传bid参数
var markheight = 0.1;
var curfnum = null;
var name;
var isClickMap = false; //是否 点在地图里面
var notpaned = false;
var mapCoord = {
    x: 0,
    y: 0
};
var isOpenFloorTip = false;  //是否开启过电梯提示
//地图操作
function mapDowork() {
    //楼层控制控件配置参数
    var ctlOpt = new esmap.ESControlOptions({
        position: esmap.ESControlPositon.RIGHT_TOP,
        imgURL: "images/wedgets/",
        //size:"normal",
        offset: {
            x: 0,
            y: 113
        }
        // allLayer: map.options.visibleFloors ? false : true
    });
    map = new esmap.ESMap({
        container: document.getElementById('map-container'), //渲染dom
        mapDataSrc: 'data', //地图数据位置
        mapThemeSrc: 'data/theme', //主题数据位置
        focusAlphaMode: false, //对不可见图层启用透明设置 默认为true
        focusAnimateMode: true, //开启聚焦层切换的动画显示
        focusAlpha: 0.3, //对不聚焦图层启用透明设置，当focusAlphaMode = true时有效
        viewModeAnimateMode: true, //开启2维，3维切换的动画显示
//    token: 'escopedunhangguoji',
		token:"zhuzhu199822",
//		token: 'test666',
        compassOffset: [20, 100], //指南针 位置
        focusFloor:1,
        //visibleFloors: 'all',          //显示所有楼层
        moveToAnimateMode: true //开启moveTo动画效果
        // perspective:true,
        // isRandom:false
    });
    //打开地图数据
    map.openMapById(esmapID); //sceneId
    map.showCompass = true;
    map.panorama = false;
    //地图加载完成事件
    map.on('loadComplete', function () {
    	$("title").html(map.Name);
        // map.gestureController.enableMapZoom = false
        LoadingLayer.hide();
        bingingEvents(); //绑定按钮点击事件
        //加载导航对象
        createNavi();
        //创建楼层，放大、缩小控件              
        floorControl = new esmap.ESScrollFloorsControl(map, ctlOpt);
        //创建楼层，放大、缩小控件              
        map.viewMode = esmap.ESViewMode.MODE_3D; //2维模式   
        initSearchFloor();
        $state.MAP_READY = true;
        curfnum = map.focusFloorNum;
        isOpenFloorTip&& $.getJSON("data/"+esmapID+"/liftsConfig.json",function(data){
            $variable.$FLOOR_TIPS = data.data;
        });
    });
    map.on('mapClickNode', function (event) {
        console.log(event)
        notpaned = true;
        isClickMap = event.nodeType ? true : false;
        switch (event.nodeType) {
            case esmap.ESNodeType.MODEL:
                markheight = event.data_.RoomHigh,
                    curfnum = event.FloorNum,
                    name = event.name;
                break;
            case esmap.ESNodeType.FLOOR:
                curfnum = event.floor,
                    markheight = 0.5,
                    name = "位置点";
                break;
                //case ...
        }
        if (event.hitCoord) { //获取点击的地图坐标
            mapCoord.x = event.hitCoord.x || 0;
            mapCoord.y = event.hitCoord.y || 0;
        }
    });
}
//dom事件绑定
function bingingEvents() {
    //为模型填充div添加移动端点击结束事件
    $('#map-container')[0].ontouchend = bindClick;
    //为模型填充div添加点击事件
    $('#map-container')[0].onclick = bindClick;
    // //2维显示事件
    $("#btn2D").click(function () {
        $(this).css("display", "none");
        $(this).siblings().css("display", "block")
        map.viewMode = esmap.ESViewMode.MODE_3D; //2维模式     
    })
    //3维显示事件
    $("#btn3D").click(function () {
        $(this).css("display", "none");
        $(this).siblings().css("display", "block");
        map.viewMode = esmap.ESViewMode.MODE_2D; //3维模式     
    });
    $(".bottom-module").click(function (e) {
        e.preventDefault();
        e.stopPropagation();
    })
    //兼容css :active@?
    document.addEventListener("touchstart", function () {
        $("input").blur()
    }, false);
    window.onhashchange = function (e) {
        hashChange();
    };

}
//点击地图显示设置起始点的按钮
function showNavDiv(poiInfo) {
    $index.$poiInfo.data('poiInfo', poiInfo).showControl(function () {
        var _nameHtml = poiInfo.name + " " + poiInfo.FloorName + "层";
        $index.$poiInfo.find('.info-box').find('.p1').text(_nameHtml);
    });
}

function bindClick() {
    var fnum = curfnum;
    if (!fnum || $state.ANIM_NAVING  || !notpaned) return;
    if (isClickMap) {
        drawPoint(mapCoord.x, mapCoord.y, fnum);
        var e = {
            x: mapCoord.x,
            y: mapCoord.y,
            fnum: fnum,
            FloorName: map.getFloor(fnum).data_.NameEn,
            name: name
        }
        showNavDiv(e);
    }
    notpaned = false;
}