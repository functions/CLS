/**
 * 地图模块
 */
define("modules/map/map", [], function(require, exports, module) {
    var config = {
        zooms: [ 1, 19 ]
    };
    var map = new AMap.Map("map_ctn", config);
    /**
     * 提供公共方法
     */
    module.exports = map;
});