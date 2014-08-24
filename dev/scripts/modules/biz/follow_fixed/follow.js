/**
 * 地图跟随
 */
define("modules/biz/follow_fixed/follow", [ "../../map/map", "../../map/geo" ], function(require, exports, module) {
    var map = require("../../map/map"), geo = require("../../map/geo").init();
    /**
     * 开始跟随
     */
    function startFollow() {
        geo.watchPosition(function(posData) {
            map.panTo(posData.position);
        });
    }
    function stopFollow() {
        geo.unwatchPosition();
    }
    module.exports = {
        startFollow: function() {
            startFollow();
        },
        stopFollow: function() {
            stopFollow();
        }
    };
});