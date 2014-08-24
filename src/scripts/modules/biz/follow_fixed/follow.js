/**
 * 地图跟随
 */
define(function(require, exports, module) {
    var map = require('../../map/map.js')
    ,   geo = require('../../map/geo.js').init()
    ;

    /**
     * 开始跟随
     */
    function startFollow () {
        geo.watchPosition(
            function(posData){
                map.panTo(posData.position);
            }
        );
    }

    function stopFollow(){
        geo.unwatchPosition();
    }

    module.exports = {
        startFollow: function() {
            startFollow();
        },
        stopFollow: function() {
            stopFollow();
        }
    }
});