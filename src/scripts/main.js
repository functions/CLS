/**
 * seajs 的配置
 */
seajs.config({
    alias: {
        'modules': 'src/scripts/modules'
    }
});

/**
 * 程序入口
 */

seajs.use( ['modules/map/map', 'modules/map/geo'], function(map, geo) {
    // 地图加载完成后默认定位到当前位置
    AMap.event.addListener(map, 'complete', function() {
        setTimeout(function(){
            map.setZoom(18);
            geo.getPosition(
                function(posData){
                    map.panTo(posData.position);
                }
            );
        }, 500);
    });
});

seajs.use('modules/ui/toolbar');