/**
 * @widgetClass SelectAll class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.functionWidget.SelectAll = function () {
    this._version = '1.0';

    this._checkedData = {};
};

wof.functionWidget.SelectAll.prototype = {

    _btn: null,

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _queryString: null,
    _queryAllString:null,

    _checkboxs:null, //多选框
    _checkAllBoxs:null, //全选框

    _checkedData: null, //勾选数据记录 id值为key true 勾选 false 未勾选

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
        this.setHiden(true);
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
        //如果两个选择器字串都有配置 执行查找对象
        if(queryAllString.length>0 && queryString.length>0){
            this._checkAllBoxs = wof$.find(queryAllString);
            this._checkboxs = wof$.find(queryString);

            if(this.getComponent()!=null){ //表明有所属的构件对象
                //需要从中过滤掉不属于同一个构件对象的checkbox
                var componentId = this.getComponent().getId();
                for(var i=this._checkAllBoxs.size()-1;i>=0;i--){
                    var cab = this._checkAllBoxs.get(i);
                    if(cab.getComponent()!=null || cab.getComponent().getId()!=componentId){
                        this._checkAllBoxs.remove(i);
                    }
                }
                for(var i=this._checkboxs.size()-1;i>=0;i--){
                    var cb = this._checkboxs.get(i);
                    if(cb.getComponent()!=null || cb.getComponent().getId()!=componentId){
                        this._checkboxs.remove(i);
                    }
                }
            }

            this._initCheckedData();

            console.log('找到全选框:'+this._checkAllBoxs.size());
            console.log('找到多选框:'+this._checkboxs.size());
        }
        //注册监听
        var onReceiveMessage = [];
        onReceiveMessage.push({id:'wof.widget.CheckBox_click', method:'this._receiveCheckBoxClick(message);'});
        this.setOnReceiveMessage(onReceiveMessage);
    },

    //判断为全选框还是多选框
    _getCheckBoxType: function(id){
        var type = '';
        for(var i=0;i<this._checkAllBoxs.size();i++){
            var box = this._checkAllBoxs.get(i);
            if(box.getId()==id){
                type = 'checkAll';
                break;
            }
        }
        if(type.length==0){
            for(var i=0;i<this._checkboxs.size();i++){
                var box = this._checkboxs.get(i);
                if(box.getId()==id){
                    type = 'check';
                    break;
                }
            }
        }
        return type;
    },

    _receiveCheckBoxClick : function(message){
        var obj = wof$.find('#'+message.sender.id).get(0);
        var checkBoxType = this._getCheckBoxType(obj.getId());
        //如果是全选框发出的消息 则全选或全不选多选框
        if(checkBoxType=='checkAll'){
            this.checkAll(obj.getChecked());
        }else if(checkBoxType=='check'){
            this.check(obj.getId(),obj.getChecked());
        }
        this.renderCheckState();
    },

    //初始化勾选数据记录
    _initCheckedData: function(){
        for(var i=0;i<this._checkboxs.size();i++){
            var box = this._checkboxs.get(i);
            this._checkedData[box.getId()] = false;
            console.log(this._checkedData[box.getId()]);
        }
    },

    //全选或全不选 flag true 全选 false 全不选
    checkAll: function(flag){
        for(var k in this._checkedData){
            this._checkedData[k] = flag;
        }
    },

    //选中或者取消选中指定的多选框
    check: function(id, flag){
        this._checkedData[id] = flag;
    },

    //根据勾选记录渲染选择状态
    renderCheckState: function(){
        var checkedCount=0,count=0;
        for(var i=0;i<this._checkboxs.size();i++){
            var box = this._checkboxs.get(i);
            var checked = this._checkedData[box.getId()];
            box.setChecked(checked);
            if(checked){
                checkedCount++;
            }
            box.render();
            count++;
        }
        //如果选中数等于checkbox总数 则勾选全选按钮 否则取消勾选
        var allChecked = false;
        if(checkedCount==count){
            allChecked = true;
        }
        for(var i=0;i<this._checkAllBoxs.size();i++){
            var box = this._checkAllBoxs.get(i);
            box.setChecked(allChecked);
            box.render();
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