/**
 * 异步加载高德地图
 */
define(function(require, exports, module) {
    
    var url = 'http://webapi.amap.com/maps?v=1.3' + 
                '&key=f20baa61fd06c83e468e9a396e9825fb' + 
                '&callback=_amapInit';

    window._amapInit = _amapInit;

    // 加载地图脚本
    function init () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = url;
        document.body.appendChild(script);
    }

    // 地图初始化完成后的回调函数
    function _amapInit(){
        var amap = new AMap.Map("main");
        //在地图中添加ToolBar插件
        // amap.plugin(["AMap.ToolBar"], function(){        
        //  var toolBar = new AMap.ToolBar();
        //     amap.addControl(toolBar);
        // });

        amap.plugin('AMap.Geolocation', function () {  
            var geolocation = new AMap.Geolocation({  
                enableHighAccuracy: true,//是否使用高精度定位，默认:true  
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大  
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0  
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true  
                showButton: true,        //显示定位按钮，默认：true  
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角  
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)  
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true  
                showCircle: false,       //定位成功后用圆圈表示定位精度范围，默认：true  
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true  
                zoomToAccuracy: false    //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false  
            });
            amap.addControl(geolocation);
            geolocation.watchPosition();
            geolocation.getCurrentPosition();

            AMap.event.addListener(geolocation, 'complete', onInitComplete);//返回定位信息  
            AMap.event.addListener(geolocation, 'error', onInitError);      //返回定位出错信息
        });
        
        function onInitComplete(data) {
            amap.setZoomAndCenter(18, data.position);
        }

        function onInitError(data) {
            var str = '定位失败：';
            switch(data.info) {  
                case 'PERMISSION_DENIED':  
                    str += '浏览器阻止了定位操作；请在"设置"->"隐私"->"定位服务"中打开此浏览器的定位服务。';  
                    break;
                case 'POSITION_UNAVAILBLE':  
                    str += '无法获得当前位置。';  
                    break;
                case 'TIMEOUT':  
                    str += '定位超时，请确认网络是否正常。';  
                    break;
                default:  
                    str += '未知错误';  
                    break;
            }
            alert(str);
        }
    };

    module.exports.init = init;
});