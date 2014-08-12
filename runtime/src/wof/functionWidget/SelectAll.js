/**
 * @widgetClass SelectAll class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.SelectAll = function () {
    this._version = '1.0';

};

wof.functionWidget.SelectAll.prototype = {

    _btn: null,

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _queryString: null,
    _queryAllString:null,

    /**
     * get/set 属性方法定义
     */
    getQueryString: function () {
        return this._queryString || '';
    },

    setQueryString: function (queryString) {
        this._queryString = queryString;
    },

    getQueryAllString: function () {
        return this._queryAllString || '';
    },

    setQueryAllString: function (queryAllString) {
        this._queryAllString = queryAllString;
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
        this._btn.button({'label':'全选'});
    },

    //渲染后处理方法
    _afterRender: function () {

        this._btn.button('refresh');
        this.sendMessage('wof.functionWidget.SelectAll_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            queryString:this.getQueryString(),
            queryAllString: this.getQueryAllString()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setQueryString(data.queryString);
        this.setQueryAllString(data.queryAllString);
        this.config();
    },

    //生效配置
    config: function(){
        var queryAllString = this.getQueryAllString();
        var queryString = this.getQueryString();
        //如果两个选择器字串都有配置 这执行查找对象 并注册监听
        if(queryAllString.length>0 && queryString.length>0){
            var allCheck = wof$.find(queryAllString);
            var check = wof$.find(queryString);
            //todo
            console.log('找到全选构件:'+allCheck.size());
            console.log('找到选择构件:'+check.size());
        }
    },

    //创建初始化
    createSelf: function (width, height) {
        var node = wof$.create('SelectAll');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(100);
        node.setHeight(30);
        return node;
    }

};