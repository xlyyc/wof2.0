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

    _init: function(data){
        var _this = this;
        var node = eval('(new '+data.className+'())');
        node.setData(data);
        node.appendTo(this);
        function _setChild(child){
            var comp = child.getComponent();
            if(comp==null){
                child.setComponentName(_this.getClassName());
                console.log(child.getClassName());
            }
            for(var i=0; i<child.childNodes().length; i++){
                _setChild(child.childNodes()[i]);
            }

        }
        _setChild(node);
    },

    /**
     * Render 方法定义
     */

    _initRender: function () {
        var _this = this;

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
        var node = null;
        var data = null;
        jQuery.ajax({
            url: '/wof2.0/component/[BizClass].json',
            type: 'get',
            async: false,
            dataType:'json',
            success:function(data){
                node = wof$.create('[BizClass]',data);
                node.setWidth(50);
                node.setHeight(50);
            },
            error:function(e){
                alert('读取业务构件发生错误:'+e);
            }
        });
        return node;
    }

};