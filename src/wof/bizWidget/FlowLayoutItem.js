/**
 * @bizWidgetClass FlowLayoutItem class
 * @package wof.bizWidget
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.FlowLayoutItem = function () {
    this._version = '1.0';

    this.setComponentName('wof.bizWidget.FlowLayout');

    this.getDomInstance().css('overflow','hidden');

};
wof.bizWidget.FlowLayoutItem.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */
    _colspan:null,

    _row:null,

    _col:null,

    _isFixItem: null,    //是否锁定

    _rowspan: null,


    /**
     * get/set 属性方法定义
     */
    getRowspan: function(){
        if(this._rowspan==null){
            this._rowspan = 1;
        }
        return this._rowspan;
    },

    setRowspan: function(rowspan){
        this._rowspan = rowspan;
    },

    getIsFixItem: function(){
        if(this._isFixItem==null){
            this._isFixItem = false;
        }
        return this._isFixItem;
    },

    setIsFixItem: function(isFixItem){
        this._isFixItem = isFixItem;
    },

    getColspan: function(){
        if(this._colspan==null)
            this._colspan = 1;
        return this._colspan;
    },

    setColspan: function(colspan){
        this._colspan = colspan;
    },

    getRow: function(){
        return this._row;
    },

    setRow: function(row){
        this._row = row;
    },

    getCol: function(){
        return this._col;
    },

    setCol: function(col){
        this._col = col;
    },
    /**
     * Render 方法定义
     */
    _initRender: function(){
        var _this = this;
        this.getDomInstance().droppable({
            snap:true,
            accept:function(draggable){
                var b=false;
                var draggableObj = wof.util.ObjectManager.get(draggable.attr('oid'));
                if(draggableObj!=null){
                    if(draggableObj.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                        if(_this.parentNode()==null){
                            b=false;
                        }else{
                            var layout = draggableObj.parentNode().parentNode();
                            var thisLayout = _this.parentNode().parentNode();
                            if(thisLayout.getId()==layout.getId()){
                                b=true;
                            }
                        }
                    }else if(draggableObj.getClassName()!='wof.bizWidget.FlowLayoutSection'){ //不能接受分组
                        var childNode = _this.childNodes().length>0?_this.childNodes()[0]:null;
                        //item必须属于最内层 即只有叶子节点
                        if(childNode==null){
                            b=true;
                        }else if(childNode.childNodes().length==0){
                            b=true;
                        }else{
                            if(childNode.getClassName()!='wof.bizWidget.FlowLayout' && childNode.getClassName()!='wof.bizWidget.GridLayout'){
                                var parentNode = draggableObj;
                                while((parentNode=parentNode.parentNode())!=null){
                                    if(parentNode.getComponentName()==draggableObj.getComponentName()){
                                        break;
                                    }
                                }
                                if(parentNode.getClassName()=='wof.bizWidget.ObjectBar'){
                                    b=true;
                                }
                            }
                        }
                    }
                }
                return b;
            },
            hoverClass: 'ui-state-hover',
            drop:function(event,ui){
                event.stopPropagation();
                var obj = wof.util.ObjectManager.get(ui.draggable.attr('oid'));
                if(obj!=null){
                    if(obj.getClassName()=='wof.bizWidget.FlowLayoutItem'){
                        _this.sendMessage('wof.bizWidget.FlowLayoutItem_itemDrop', {'itemId':ui.draggable.attr('oid')});
                    }else{
                        if(obj.getComponentName()!=obj.getClassName()){
                            var parentNode = obj;
                            while((parentNode=parentNode.parentNode())!=null){
                                if(parentNode.getClassName()==obj.getComponentName()){
                                    break;
                                }
                            }
                            if(parentNode.getClassName()=='wof.bizWidget.ObjectBar'){
                                var sectionIndex = _this.parentNode().getIndex();
                                _this.parentNode().parentNode().setActiveSectionIndex(sectionIndex);
                                _this.parentNode().parentNode().setActiveItemRank({row:_this.getRow(),col:_this.getCol()});
                                _this.sendMessage('wof.bizWidget.FlowLayoutItem_newWidgetDrop', {'widgetId':ui.draggable.attr('oid')});
                            }
                        }else{
                            alert('貌似此段代码不会被执行');
                            var sectionIndex = _this.parentNode().getIndex();
                            _this.parentNode().parentNode().setActiveSectionIndex(sectionIndex);
                            _this.parentNode().parentNode().setActiveItemRank({row:_this.getRow(),col:_this.getCol()});
                            _this.sendMessage('wof.bizWidget.FlowLayoutItem_widgetDrop', {'widgetId':ui.draggable.attr('oid')});
                        }
                    }
                }
            }
        });
        this.getDomInstance().draggable({
            cursor:"move",
            opacity: 0.7,
            cursorAt:{
                top:0,
                left:0
            },
            containment: 'div[oid="'+this.parentNode().getId()+'"]',  //限定拖放只能在当前分组内
            scroll: false,
            start:function(event,ui){
                event.stopPropagation();
                clearTimeout(_this._timeFn);
                _this.setZIndex(60000);
                //_this.getDomInstance().css('zIndex',60000);
            },
            stop:function(event,ui){
                event.stopPropagation();
                _this.setZIndex('auto');
                //_this.getDomInstance().css('zIndex','auto');
            }
        });

    },

    //选择实现
    _beforeRender: function () {

        var childNodes = this.childNodes();
        if(childNodes.length>0){
            var child = childNodes[0];
            if(child.getClassName()=='wof.bizWidget.FlowLayout'){
                child.setWidth(this.getWidth()-6);
            }else if(child.getClassName()=='wof.bizWidget.GridLayout'){
                child.setWidth(this.getWidth()-6);
                child.setHeight(this.getHeight());
            }
        }

    },

    //----------必须实现----------
    render: function () {

    },

    //选择实现
    _afterRender: function () {
        if(this.getIsFixItem()==true){
            this.getDomInstance().draggable('disable');
        }else{
            this.getDomInstance().draggable('enable');
        }
        if(this.getLeft()!=null){
            this.getDomInstance().css('left', ((this.getLeft()*this.getScale())+2)+'px');
        }
        if(this.getTop()!=null){
            this.getDomInstance().css('top', ((this.getTop()*this.getScale())+2)+'px');
        }
        if(this.getWidth()!=null){
            this.getDomInstance().css('width', ((this.getWidth()*this.getScale())-4)+'px');
        }
        if(this.getHeight()!=null){
            this.getDomInstance().css('height', ((this.getHeight()*this.getScale())-4)+'px');
        }
    },

    /**
     * getData/setData 方法定义
     */

    //----------必须实现----------
    getData: function () {
        return {
            rowspan: this.getRowspan(),
            isFixItem: this.getIsFixItem(),
            row: this.getRow(),
            col: this.getCol(),
            colspan: this.getColspan()
        };
    },
    //----------必须实现----------
    setData: function (data) {
        this.setRowspan(data.rowspan);
        this.setIsFixItem(data.isFixItem);
        this.setRow(data.row);
        this.setCol(data.col);
        this.setColspan(data.colspan);
    },

    //是否能够粘贴指定的对象
    canPasteObject: function(obj){
        var f = true;
        if(obj!=null){
            var parentNode = this;
            while((parentNode=parentNode.parentNode())!=null){
                if(parentNode.getId()==obj.getId()){
                    f = false;
                    break;
                }
            }
        }else{
            f = false;
        }
        return f;
    }

};