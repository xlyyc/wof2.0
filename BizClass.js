/**
 * @bizWidgetClass [BizClass] class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.[BizClass] = function () {
    this._version = '1.0';


};
wof.bizWidget.[BizClass].prototype = {


    /**
     * Render 方法定义
     */

    _initRender: function () {
        var _this = this;

        this.getDomInstance().css('background-color','black');

    },

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.bizWidget.[BizClass]_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {

        };
    },
    //----------必须实现----------
    setData: function (data) {

    },

    //创建新的[BizClass]
    createSelf: function(width, height){
        var node = wof$.create('[BizClass]');
        node.setWidth(50);
        node.setHeight(50);
        return node;
    }

};