/**
 * @widgetClass TextfieldSpanner class
 * @package wof.widget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.widget.spanner.TextfieldSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.widget.Textfield';
    this._meta.title = '文本域';
    this._meta.sendMessages = {
        'wof.widget.Textfield_mousedown':'单击',
        'wof.widget.Textfield_dblclick':'双击',
        'wof.widget.Textfield_focus':'焦点',
        'wof.widget.Textfield_blur':'失去焦点',
        'wof.widget.Textfield_change':'值改变'
    };
    this._meta.propertys = {
        'Textfield':{
            'id':{prop:'id','name':'ID','type':'text','readOnly':true,'isHide':false},
            'className':{prop:'className','name':'类名','type':'text','readOnly':true,'isHide':false},
            'label':{prop:'label','name':'显示名称','type':'text','readOnly':false,'isHide':false},
            'placeholder':{prop:'placeholder','name':'内容提示','type':'text','readOnly':false,'isHide':false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.widget.Textfield_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});
    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);
};
wof.widget.spanner.TextfieldSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性
    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _parameters: null,

    /**
     * get/set 属性方法定义
     */
    getMeta: function(){
        return this._meta;
    },

    setPropertys:function(propertys){
        this._propertys = propertys;
    },

    getPropertys: function(){
        if(this._propertys==null){
            this._propertys = {};
        }
        return this._propertys;
    },

    getParameters:function(){
        return this._parameters;
    },

    setParameters:function(parameters){
        this._parameters = parameters;
    },

    /**
     * Render 方法定义
     */

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {
        if(!jQuery.isEmptyObject(this.getPropertys())){
            this.getPropertys().activeClass = 'Textfield';
        }
        this.setParameters(this.getPropertys());
        this.sendMessage('wof.widget.spanner.TextfieldSpanner_render');
    },

    /**
     * getData/setData 方法定义
     */

    //必须实现
    getData:function(){
        return {
            propertys: this.getPropertys(),
            parameters: this.getParameters(),
            meta: this.getMeta()
        };
    },

    //必须实现
    setData:function(data){
        this.setPropertys(data.propertys);
        this.setParameters(data.parameters);
    },
    
    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var textfield=wof.util.ObjectManager.get(parameters.id);
            textfield.setData(parameters);
            textfield.render();
            textfield.sendMessage("wof.widget.Textfield_active");
        }
    }

};