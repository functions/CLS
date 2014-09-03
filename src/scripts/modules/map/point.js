/**
 * 地图上的标记点
 */
define(function(require, exports, module) {
    var map = require('./map.js');

    var _options = {
        icon: "images/mark_point.png",
        position: new AMap.LngLat(116.405467,39.907761)
    };

    var point = {
        /**
         * 在地图上添加一个标记
         * @param  {[type]} opts [description]
         * @return {[type]}      [description]
         */
        new: function(opts) {
            this._options = $.extend(_options, opts);
            this.marker = new AMap.Marker(_options);
            this.marker.setMap(map);
        },

        /**
         * 修改地图上标记的位置
         * @param  {AMap.LngLat} position [description]
         * @return {[type]}      [description]
         */
        update: function(opts) {
            this.marker && 
            opts.position && 
            this.marker.setPosition(opts.position);

            this.marker && 
            opts.icon && 
            this.marker.setIcon(opts.icon);
        },

        /**
         * 把标记从地图上删除
         * @return {[type]} [description]
         */
        remove: function() {
            this.marker && this.marker.setMap(null);
        }

     };

     module.exports = point;
});