/**
 * @widgetClass CheckBox class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-7 上午10:34
 */

wof.widget.CheckBox = function () {

};

wof.widget.CheckBox.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _name: null,  //复选框的名称
    _value: null, //复选框的值
    _label: null, //复选框的文字
    _disabled: null, //禁用
    _checked: null, //选中
       
    _checkbox:null,
    _checkboxLabel:null,

    /**
     * get/set 属性方法定义
     */
    getName: function () {
        return this._name || '';
    },

    setName: function (name) {
        this._name = name;
    },

    getValue: function () {
        return this._value || '';
    },

    setValue: function (value) {
        this._value = value;
    },

    getLabel: function () {
        return this._label || '';
    },

    setLabel: function (label) {
        this._label = label;
    },

    getDisabled: function () {
        return this._disabled==null?false:this._disabled;
    },

    setDisabled: function (disabled) {
        this._disabled = disabled;
    },

    getChecked: function () {
        return this._checked==null?false:this._checked;
    },

    setChecked: function (checked) {
        this._checked = checked;
    },
    /**
     * Render 方法定义
     */

    /**
     * 初始化方法
     */
    _init: function (data) {
    	this.setOptions(data);
    },
    _initRender: function () {
        var _this = this;
        this._checkbox = jQuery('<input type="checkbox" id="'+this.getId()+'">');
        this._checkbox.click(function(event) {
            event.stopPropagation();
            _this.sendMessage('wof.widget.CheckBox_click');
        });
        this._checkbox.focus(function(event) {
            event.stopPropagation();
            _this.sendMessage('wof.widget.CheckBox_focus');
        });
        this._checkbox.blur(function(event) {
            event.stopPropagation();
            _this.sendMessage('wof.widget.Checkbox_blur');
        });
        this._checkboxLabel = jQuery('<label for="'+this.getId()+'">');
        this.getDomInstance().append(this._checkbox).append(this._checkboxLabel);
    },
    //选择实现
    _beforeRender: function () {

    },

    //----------必须实现----------
    render: function () {
        this._checkbox.attr('name',this.getName());
        this._checkbox.attr('value',this.getValue());
        this._checkbox.attr('disabled',this.getDisabled());
        this._checkbox.attr('checked',this.getChecked());
        this._checkboxLabel.text(this.getLabel());
    },

    //选择实现
    _afterRender: function () {

        this.sendMessage('wof.widget.CheckBox_render');
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
    	return {
    		 name: this.getName(),
             label: this.getLabel(),
             value: this.getValue(),
             disabled: this.getDisabled(),
             checked: this.getChecked()
        }
    },

    //----------必须实现----------
    setData: function (data) {
        this.setName(data.name);
        this.setValue(data.value);
        this.setLabel(data.label);
        this.setDisabled(data.disabled);
        this.setChecked(data.checked);
    },

//创建初始化的button
    createSelf: function (width, height) {
        var node = wof$.create('CheckBox');
        node.setLabel('复选框标题');
        return node;
    }


};