/**
 * 工具栏UI
 */
define(function(require, exports, module) {

    var map = require('../map/map.js');
    var followFixed = require('../biz/follow_fixed/follow.js');
    var pointer = require('../map/point.js');

    /**
     * toolbar 浮出
     */
    function slideUp (selector) {
        var element = $(selector)
        ,   height = element.height()
        ;
        element.animate({
            bottom: 0,
            opacity: 1
        }, 500, 'ease-in');
    }
    /**
     * toolbar 沉下
     */
    function slideDown (selector){
        var element = $(selector)
        ,   height = element.height()
        ;
        element.animate({
            bottom: -height + 'px',
            opacity: 0
        }, 500, 'ease-out');
    }

    /**
     * 点击跟随定点按钮
     */
    function followClick(){
        // 开始跟随
        followFixed.startFollow();
        // 显示定点跟随的操作界面
        slideUp('#toolbar_follow');
    }

    /**
     * 定点跟随--返回
     */
    function followReturnClick(){
        followFixed.stopFollow();
        slideDown ('#toolbar_follow');
    }

    /**
     * 定点按钮
     */
    function followFixedClick () {
        // 添加标记点
        pointer.new({
            position: map.getCenter()
        });
    }

    /**
     * 绑定主 toolbar 的点击事件
     */
    $(document).on('click', '#toolbar_main .toolbar-item', function(e) {
        var id = e.target.getAttribute('data-btn-id');
        if(id === 'follow'){
            followClick ();
        }
        else if(id === 'auto'){
            
        }
    });

    /**
     * 绑定跟随定点的按钮点击事件
     */
    $(document).on('click', '#toolbar_follow .toolbar-item', function(e) {
        var id = e.target.getAttribute('data-btn-id');
        if(id === 'fol_return'){
            followReturnClick();
        }
        else if(id === 'fol_fixed'){
            followFixedClick();
        }
        else if(id === 'fol_save'){

        }
    });

});
