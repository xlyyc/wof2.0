/**
 * @widgetClass Button class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:49
 */

wof.widget.Button = function () {
    this._version = '1.0';

};

wof.widget.Button.prototype = {

    _btn: null,

    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,            //名称
    _label: null,           //文字
    _icon: null,            //语义层面的ICON标识，对应图标的类型(add/edit)、颜色(white/black)、位置属性(position:left/right/top/bottom)
    _disabled: null,        //禁用
    _type:null,             //类型 button 普通按钮(默认) submit 提交按钮 reset 重设按钮

    /**
     * get/set 属性方法定义
     */

    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getLabel: function () {
        return this._label || '';
    },

    setLabel: function (label) {
        this._label = label;
    },

    getIcon: function () {
        return this._icon;
    },

    setIcon: function (icon) {
        this._icon = icon;
    },

    getDisabled: function () {
        return this._disabled == null ? false : this._disabled;
    },

    setDisabled: function (disabled) {
        this._disabled = disabled;
    },

    getType: function () {
        return this._type || 'button';
    },

    setType: function (type) {
        this._type = type;
    },

    /**
     * Render 方法定义
     */
    //渲染初始化 仅在第一次调用render时执行
    _initRender: function () {
        var _this = this;
        this._btn = jQuery('<button type="'+this.getType()+'">').button();
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
        this._btn.attr('name', this.getName());
        this._btn.button({'label':this.getLabel()});
        if(this.getDisabled()==true){
            this._btn.button('disable');
        }else{
            this._btn.button('enable');
        }


    },

    //渲染后处理方法
    _afterRender: function () {

        this._btn.button('refresh');
        this.sendMessage('wof.widget.Button_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name: this.getName(),
            label: this.getLabel(),
            icon: this.getIcon(),
            disabled: this.getDisabled(),
            type:this.getType()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setLabel(data.label);
        this.setIcon(data.icon);
        this.setDisabled(data.disabled);
        this.setType(data.type);
    },

    //创建初始化的button
    createSelf: function (width, height) {
        var node = wof$.create('Button');
        node.setLeft(0);
        node.setTop(0);
        node.setWidth(100);
        node.setHeight(30);
        node.setLabel('未命名');
        return node;
    }

};