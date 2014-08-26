/**
 * @widgetClass Submit class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.Submit = function () {
    this._version = '1.0';

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.functionWidget.Submit_mousedown', method:'this._onMousedown(message);'});
    this.setOnReceiveMessage(onReceiveMessage);

};

wof.functionWidget.Submit.prototype = {

    _btn: null,

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _queryString: null,


    /**
     * get/set 属性方法定义
     */
    getQueryString: function () {
        return this._queryString || '';
    },

    setQueryString: function (queryString) {
        this._queryString = queryString;
    },

    /**
     * Render 方法定义
     */
    //渲染初始化 仅在第一次调用render时执行
    _initRender: function () {
        this._btn = jQuery('<button type="button">').button();
        this.getDomInstance().append(this._btn);
    },

    //渲染前处理方法
    _beforeRender: function () {

    },

    //渲染方法 必须实现此方法
    render: function () {
        if (this.getWidth() != null) {
            this._btn.css('width', this.getWidth() + 'px');
        }
        if (this.getHeight() != null) {
            this._btn.css('height', this.getHeight() + 'px');
        }
        this._btn.button({'label':'提交'});
    },

    //渲染后处理方法
    _afterRender: function () {

        this._btn.button('refresh');
        this.sendMessage('wof.functionWidget.Submit_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            queryString:this.getQueryString()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setQueryString(data.queryString);

    },

    _onMousedown: function(message){
        if(this.getQueryString().length>0){
            var ids = [];
            var qs = this.getQueryString();
            var cbs = wof$.find(qs);
            for(var i=0;i<cbs.size();i++){
                var cb = cbs.get(i);
                ids.push(cb.getId());
            }
            alert('提交数据:'+ids.join(','));
        }else{
            alert('请填写选择器字串属性');
        }
    },

    //创建初始化
    createSelf: function (width, height) {
        var node = wof$.create('Submit');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(100);
        node.setHeight(30);
        return node;
    }

};