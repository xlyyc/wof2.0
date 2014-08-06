wof.bizWidget.ObjectBar = function(){
    this._version = '1.0';

    this.setIsComponent(true);
};
wof.bizWidget.ObjectBar.prototype={

    _bizWidgetComponents: null,

    _layoutComponents: null,

    _widgetComponents: null,

    _baseComponents: null,

    _compositeComponents: null,

    getWidgetComponents: function(){
        return this._widgetComponents || [];
    },

    setWidgetComponents: function(widgetComponents){
        this._widgetComponents = widgetComponents;
    },

    getBizWidgetComponents: function(){
        if(this._bizWidgetComponents==null){
            this._bizWidgetComponents = [];
        }
        return this._bizWidgetComponents;
    },

    setBizWidgetComponents: function(bizWidgetComponents){
        this._bizWidgetComponents = bizWidgetComponents;
    },

    getLayoutComponents: function(){
        return this._layoutComponents || [];
    },

    getBaseComponents: function(){
        return this._baseComponents || [];
    },

    setBaseComponents: function(baseComponents){
        this._baseComponents = baseComponents;
    },

    setLayoutComponents: function(layoutComponents){
        this._layoutComponents = layoutComponents;
    },

    getCompositeComponents: function(){
        return this._compositeComponents || [];
    },

    setCompositeComponents: function(compositeComponents){
        this._compositeComponents = compositeComponents;
    },


    _initRender: function(){
        var toolbar = wof$.create('Toolbar');
        toolbar.setIsComponent(false);
        toolbar.setWidth(this.getWidth());
        toolbar.setTop(0);
        toolbar.setLeft(0);
        toolbar.appendTo(this);

        var layoutComponents = this.getLayoutComponents();
        if(layoutComponents.length>0){
            var toolbarItem0 = wof$.create('ToolbarItem');
            toolbarItem0.setIsComponent(false);
            toolbarItem0.setTitle('布局构件');
            toolbarItem0.setName('layout');
            toolbarItem0.appendTo(toolbar);
            for(var i=0;i<layoutComponents.length;i++){
                var widget = layoutComponents[i];
                var label = wof$.create('Label');
                label.setIsComponent(false);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getMeta().name);
                label.setText(widget.getMeta().title);
                label.appendTo(toolbarItem0);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
        }

        var bizWidgetComponents = this.getBizWidgetComponents();
        if(bizWidgetComponents.length>0){
            var toolbarItem1 = wof$.create('ToolbarItem');
            toolbarItem1.setIsComponent(false);
            toolbarItem1.setTitle('业务构件');
            toolbarItem1.setName('biz');
            toolbarItem1.appendTo(toolbar);
            for(var i=0;i<bizWidgetComponents.length;i++){
                var widget = bizWidgetComponents[i];
                var label = new wof.widget.Label();
                label.setIsComponent(false);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getMeta().name);
                label.setText(widget.getMeta().title);
                label.appendTo(toolbarItem1);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
        }


        var widgetComponents = this.getWidgetComponents();
        if(widgetComponents.length>0){
            var toolbarItem2 = wof$.create('ToolbarItem');
            toolbarItem2.setIsComponent(false);
            toolbarItem2.setTitle('功能构件');
            toolbarItem2.setName('base');
            toolbarItem2.appendTo(toolbar);
            for(var i=0;i<widgetComponents.length;i++){
                var widget = widgetComponents[i];
                var label = wof$.create('Label');
                label.setIsComponent(false);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getMeta().name);
                label.setText(widget.getMeta().title);
                label.appendTo(toolbarItem2);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
        }

        var baseComponents = this.getBaseComponents();
        if(baseComponents.length>0) {
            var toolbarItem3 = wof$.create('ToolbarItem');
            toolbarItem3.setIsComponent(false);
            toolbarItem3.setTitle('基础构件');
            toolbarItem3.setName('composite');
            toolbarItem3.appendTo(toolbar);
            for(var i=0;i<baseComponents.length;i++){
                var widget = baseComponents[i];
                var label = wof$.create('Label');
                label.setIsComponent(false);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setValue(widget.getMeta().name);
                label.setText(widget.getMeta().title);
                label.appendTo(toolbarItem3);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
        }

        var compositeComponents = this.getCompositeComponents();
        if(compositeComponents.length>0){
            var toolbarItem4 = wof$.create('ToolbarItem');
            toolbarItem4.setIsComponent(false);
            toolbarItem4.setTitle('构件组合');
            toolbarItem4.setName('composite');
            toolbarItem4.appendTo(toolbar);
            for(var i=0;i<compositeComponents.length;i++){
                var compositeComponent = compositeComponents[i];
                var label = wof$.create('Label');
                label.setIsComponent(false);
                label.setIco('src/img/dropdown.png');
                label.setWidth(130);
                label.setHeight(25);
                label.setType('composite');
                label.setValue(compositeComponent.id);
                label.setText(compositeComponent.label);
                label.appendTo(toolbarItem4);
                label.getDomInstance().draggable({
                    cursor:"move",
                    opacity: 0.7,
                    cursorAt:{
                        top:0,
                        left:0
                    },
                    scroll: false,
                    helper: 'clone',
                    start:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex',60000);
                    },
                    stop:function(event,ui){
                        event.stopPropagation();
                        label.getDomInstance().css('zIndex','auto');
                    }
                });
            }
        }


    },

	//选择实现
	_beforeRender: function(){

	},
	//必须实现
	render: function(){

	},
    //选择实现
    _afterRender: function(){

    },
	//必须实现
	getData:function(){
		return {
            layoutComponents: this.getLayoutComponents(),
            bizWidgetComponents: this.getLayoutComponents(),
            widgetComponents: this.getWidgetComponents(),
            compositeComponents: this.getCompositeComponents(),
            baseComponents: this.getBaseComponents()
		};
	},
	//必须实现
	setData:function(data){
        this.setLayoutComponents(data.layoutComponents);
        this.setLayoutComponents(data.bizWidgetComponents);
        this.setWidgetComponents(data.widgetComponents);
        this.setCompositeComponents(data.compositeComponents);
        this.setBaseComponents(data.baseComponents);
	}
	
};