/**
 * @widgetClass Input class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午2:07
 */

wof.widget.Textfield = function () {
    this._version = '1.0';

};

wof.widget.Textfield.prototype = {

    _name: null,                    //名称
    _format:null,					//格式化
    _value: null,                   //本框的值
    _type: null,					//类型 默认text
    _disabled: null,                 //规定该文本框只做展示用，提交时无法获取值
    _readonly: null,                //	规定该文本区只读。文本框不允许修改，提交时可以获取值
    _maxLength: null,               //文本框的可输入长度，不区分中英文
    _placeholder: null,             //输入内容提醒

    _input: null,

    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getFormat: function () {
        return this._format;
    },

    setFormat: function (format) {
        this._format = format;
    },

    getType: function () {
        return this._type || 'text';
    },

    setType: function (type) {
        this._type = type;
    },

    getValue: function () {
        return this._value || '';
    },

    setValue: function (value) {
        this._value = value;
    },

    getMaxLength: function () {
        return this._maxLength;
    },

    setMaxLength: function (maxLength) {
        this._maxLength = maxLength;
    },

    getPlaceholder: function () {
        return this._placeholder;
    },

    setPlaceholder: function (placeholder) {
        this._placeholder = placeholder;
    },

    getDisabled: function () {
        return this._disabled==null?false:this._disabled;
    },

    setDisabled: function (disabled) {
        this._disabled = disabled;
    },

    getReadonly: function () {
        return this._readonly==null?false:this._readonly;
    },

    setReadonly: function (readonly) {
        this._readonly = readonly;
    },

    getWidth: function(){
        return this._width || 100;
    },

    getHeight: function(){
        return this._height || 25;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },

    _initRender: function () {
        var _this = this;
        this._input = jQuery('<input type="'+this.getType()+'">'); //type是不可更改的 所以需要在渲染前设置
        this._input.focus(function(event) {
            event.stopPropagation();
            _this.sendMessage('wof.widget.Textfield_focus');
        });
        this._input.blur(function(event) {
            event.stopPropagation();
            _this.sendMessage('wof.widget.Textfield_blur');
        });

        this._input.change(function(event) {
            event.stopPropagation();
            _this.setValue(_this._input.val());
            _this.sendMessage('wof.widget.Textfield_change');
        });
        this.getDomInstance().append(this._input);
    },

    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._input.css('width',this.getWidth());
        this._input.css('height',this.getHeight());
        this._input.attr('name',this.getName());
        this._input.attr('value',this.getValue());
        //this._input.attr('format',this.getFormat());
        this._input.attr('placeholder',this.getPlaceholder());
        this._input.attr('maxlength',this.getMaxLength());
        this._input.attr('disabled',this.getDisabled());
        this._input.attr('readonly',this.getReadonly());
    },
    
    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.widget.Input_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            name:this.getName(),
            value:this.getValue(),
            type:this.getType(),
            format:this.getFormat(),
            placeholder:this.getPlaceholder(),
            maxlength:this.getMaxLength(),
            disabled:this.getDisabled(),
            readonly:this.getReadonly()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setValue(data.value);
        this.setType(data.type);
        this.setFormat(data.format);
        this.setPlaceholder(data.placeholder);
        this.setMaxLength(data.maxlength);
        this.setDisabled(data.disabled);
        this.setReadonly(data.readonly);
    },

    //创建初始化的button
    createSelf: function (width, height) {
        var node = wof$.create('Textfield');
        node.setPlaceholder('请输入内容');
        return node;
    }

};