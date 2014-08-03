/**
 * @widgetClass Label class
 * @package wof.widget
 * @copyright author
 * @Time: 13-8-5 下午1:54
 */

wof.widget.Label = function () {
    this._version = '1.0';

};

wof.widget.Label.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _text:null,

    _isUnderline:null, //是否包括下划线

    _isBold:null, //是否需要加粗

    _isHighlight:null, //是否需要高亮

    _value: null,

    _type: null,

    _tip: null,

    _ico: null,

    _label:null,

    /**
     * get/set 属性方法定义
     */
    getTip : function (){
        return this._tip || '';
    },

    setTip : function (tip){
        this._tip = tip;
    },

    getIco : function (){
        return this._ico || '';
    },

    setIco : function (ico){
        this._ico = ico;
    },


    getValue : function (){
        return this._value || '';
    },

    setValue : function (value){
        this._value = value;
    },

    getType : function (){
        return this._type || '';
    },

    setType : function (type){
        this._type = type;
    },

	 getText: function(){
        return this._text || '';
	 },
	 
	 setText: function(text){
        this._text = text;
	 },

    getIsUnderline: function(){
        return this._isUnderline || false;
    },

    setIsUnderline: function(isUnderline){
        this._isUnderline = isUnderline;
    },

    getIsBold: function(){
        return this._isBold || false;
    },

    setIsBold: function(isBold){
        this._isBold = isBold;
    },

    getIsHighlight: function(){
        return this._isHighlight || false;
    },

    setIsHighlight: function(isHighlight){
        this._isHighlight = isHighlight;
    },


    /**
     * Render 方法定义
     */
    /**
     * Render 方法定义
     */
    _initRender: function(){
        this._label = jQuery('<span style="position:absolute;top:4px;cursor:pointer;">'+this.getText()+'</span>');
        this.getDomInstance().append(this._label);
    },

    //选择实现
    _beforeRender: function () {

        this.getDomInstance().children('hr').remove();
        this.getDomInstance().children('img').remove();
    },

    //----------必须实现----------
    render: function () {
        if(this.getIco().length>0){
            var img = jQuery('<img src="'+this.getIco()+'">');
            this._label.before(img);
        }
        this._label.html(this.getText());
        if(this.getIsBold()==true){
            this._label.css('fontWeight','bold');
        }else{
            this._label.css('fontWeight','');
        }
        if(this.getIsHighlight()==true){
            this._label.css('border','1px solid #79b7e7');
            this._label.css('background','#d0e5f5');
            this._label.css('color','#1d5987');
        }else{
            this._label.css('border','');
            this._label.css('background','');
            this._label.css('color','');
        }
        this._label.attr('value',this.getValue());
        this._label.attr('type',this.getType());
        if(this.getIsUnderline()==true){
            var hr = jQuery('<hr style="position:absolute;top:24px;width:100%;border-top:1px solid black;">');
            this.getDomInstance().append(hr);
        }
    },

    //选择实现
    _afterRender: function () {

    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            ico: this.getIco(),
            value : this.getValue(),
			text: this.getText(),
            isUnderline: this.getIsUnderline(),
            isBold: this.getIsBold(),
            isHighlight: this.getIsHighlight(),
            type: this.getType(),
            tip: this.getTip()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setIco(data.ico);
        this.setValue(data.value);
		this.setText(data.text);
        this.setIsUnderline(data.isUnderline);
        this.setIsBold(data.isBold);
        this.setIsHighlight(data.isHighlight);
        this.setType(data.type);
        this.setTip(data.tip);
    }

};