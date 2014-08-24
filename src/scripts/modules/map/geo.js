/**
 * 定位模块
 */
define(function(require, exports, module) {
    /**
     * 当前模块私有属性和方法
     */
    var _map         = require('./map.js')
    ,   _geolocation = null
    ,   _posSucCalls = []
    ,   _posErrCalls = []
    ,   _watSucCalls = []
    ,   _watErrCalls = []
    ,   _watchNumber = -1
    ,   ERROR_INFO   = {
        'PERMISSION_DENIED': '浏览器阻止了定位操作',
        'POSITION_UNAVAILBLE': '无法获得当前位置',
        'TIMEOUT': '定位超时',
        'OTHER': '未知错误'
    }
    ;

    /**
     * 定位成功的回调
     * @param  {[type]} posData [description]
     * @return {[type]}         [description]
     */
    function onComplete (posData) {
        var i = 0;
        for(; i < _posSucCalls.length; i++){
            _posSucCalls[i](posData);
            _posSucCalls.splice(i, 1);
        }
        var j = 0;
        for(; j < _watSucCalls.length; j++){
            _watSucCalls[j](posData);
        }
    }

    /**
     * 定位失败的回调
     * @param  {[type]} errData [description]
     * @return {[type]}         [description]
     */
    function onError (errData) {
        var i = 0
        ,   len = _posErrCalls.length
        ;
        errData['msg'] = errData.info ? ERROR_INFO[errData.info] : ERROR_INFO.OTHER;
        for(; i < _posErrCalls.length; i++){
            _posErrCalls[i](errData);
            _posErrCalls.splice(i, 1);
        }
        var j = 0;
        for(; j < _watErrCalls.length; j++){
            _watErrCalls[j](errData);
        }
    }

    /**
     * 当前模块公共属性和方法
     */
    var fn = {
        init: function() {
            this.getInstance();
            return this;
        },
        /**
         * 获取定位对象
         * @param  {Function} callback [description]
         * @return {[type]}            [description]
         */
        getInstance: function(callback) {
            if(_geolocation){
                callback && typeof(callback)==='function' && callback(_geolocation);
            }
            else{
                _map.plugin('AMap.Geolocation', function () {
                    _geolocation = new AMap.Geolocation({
                        enableHighAccuracy: true,               //是否使用高精度定位，默认:true
                        buttonOffset: new AMap.Pixel(10, 60),   //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                        showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                        showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                    });
                    _map.addControl(_geolocation);
                    AMap.event.addListener(_geolocation, 'complete', onComplete);//返回定位信息
                    AMap.event.addListener(_geolocation, 'error', onError);      //返回定位出错信息
                    callback && typeof(callback)==='function' && callback(_geolocation);
                });
            }
            return this;
        },

        /**
         * 获取当前位置
         * @param  {function} success 获取位置成功
         * @param  {function} error   获取位置失败
         * @return {null}         无
         */
        getPosition: function(success, error) {
            this.getInstance(function(geoObj) {
                if(success && typeof success === 'function'){
                    _posSucCalls.push(success);
                }
                if(error && typeof error === 'function'){
                    _posErrCalls.push(error);
                }
                geoObj.getCurrentPosition();
            });
        },

        /**
         * 监听位置变化
         * 会不断调用 complete 函数
         * @return {null} 无
         */
        watchPosition: function(success, error) { 
            this.getInstance(function(geoObj) {
                if(success && typeof success === 'function'){
                    _watSucCalls.push(success);
                }
                if(error && typeof error === 'function'){
                    _watErrCalls.push(error);
                }
                _watchNumber = geoObj.watchPosition();
            });
        },

        /**
         * 取消位置监听
         */
        unwatchPosition: function() {
             this.getInstance(function(geoObj) {
                if(_watchNumber > 0){
                    geoObj.clearWatch(_watchNumber);
                    _watchNumber = -1;
                }
            });
        }
    };

    module.exports = fn;

});