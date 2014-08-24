/**
 * 工具栏UI
 */
define("modules/ui/toolbar", [ "../biz/follow_fixed/follow", "../map/map", "../map/geo" ], function(require, exports, module) {
    var followFixed = require("../biz/follow_fixed/follow");
    /**
     * toolbar 浮出
     */
    function slideUp(selector) {
        var element = $(selector), height = element.height();
        element.animate({
            bottom: 0,
            opacity: 1
        }, 500, "ease-in");
    }
    /**
     * toolbar 沉下
     */
    function slideDown(selector) {
        var element = $(selector), height = element.height();
        element.animate({
            bottom: -height + "px",
            opacity: 0
        }, 500, "ease-out");
    }
    /**
     * [followClick description]
     * @return {[type]} [description]
     */
    function followClick() {
        slideUp("#toolbar_follow");
    }
    function followReturnClick() {
        followFixed.stopFollow();
        slideDown("#toolbar_follow");
    }
    function followFixedClick() {
        followFixed.startFollow();
    }
    /**
     * 绑定主 toolbar 的点击事件
     */
    $(document).on("click", "#toolbar_main .toolbar-item", function(e) {
        var id = e.target.getAttribute("data-btn-id");
        if (id === "follow") {
            followClick();
        } else if (id === "auto") {
            alert("click auto");
        }
    });
    /**
     * 绑定跟随定点的按钮点击事件
     */
    $(document).on("click", "#toolbar_follow .toolbar-item", function(e) {
        var id = e.target.getAttribute("data-btn-id");
        if (id === "fol_return") {
            followReturnClick();
        } else if (id === "fol_fixed") {
            followFixedClick();
        } else if (id === "fol_save") {}
    });
});