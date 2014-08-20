/**
 * @widgetClass GridComponentSpanner class
 * @package wof.bizWidget.spanner
 * @copyright author
 * @Time: 13-8-5 下午1:29
 */
wof.bizWidget.spanner.GridComponentSpanner = function () {
    this._version = '1.0';

    //初始化构件元数据 包括名称、标题、发送的消息
    this._meta = {};
    this._meta.name = 'wof.bizWidget.GridComponent';
    this._meta.title = '列表';
    this._meta.sendMessages = {'wof.bizWidget.GridComponent_mousedown':'单击','wof.bizWidget.GridComponent_render':'重绘'};
    this._meta.propertys = {
        'GridComponent':{
            'name':{prop:'name','name':'列表名称','type':'text','readOnly':false,'isHide':false,required:false},
            'bindEntityID':{prop:'bindEntityID','name':'实体ID','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'mainEntity'},
            'headerHeight':{prop:'headerHeight','name':'表头高度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'rowHeight':{prop:'rowHeight','name':'行高','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'numberDisplay':{prop:'numberDisplay','name':'是否显示序号','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'useMutiplePage':{prop:'useMutiplePage','name':'是否使用分页','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'rowsCount':{prop:'rowsCount','name':'每页行数','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'paramMaps':{prop:'paramMaps','name':'参数','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.ParamMapsWindow', customParam:'dataId,pageState'}
        },
        'GridComponentColumn':{
            'name':{prop:'name','name':'列名','type':'text','readOnly':false,'isHide':false,required:false},
            'useMultiSelect':{prop:'useMultiSelect','name':'下拉框是否多选','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'columnType':{prop:'columnType','name':'列类型','type':'enum','readOnly':false,'isHide':false,required:false,
                enumData:{
                    'integer':'数字',
                    'binary':'二进制',
                    'long':'长整型',
                    'sql':'SQL',
                    'timestamp':'时间戳',
                    'id':'ID',
                    'float':'单精度',
                    'image':'图片',
                    'big_decimal':'大数',
                    'double':'双精度',
                    'time':'时间',
                    'ref':'统一参照',
                    'dmcode':'字典参照编码',
                    'enum':'枚举',
                    'boolean':'布尔',
                    'text':'文本',
                    'string':'字符串',
                    'date':'日期'
                }
            },
            'caption':{prop:'caption','name':'显示名称','type':'text','readOnly':false,'isHide':false,required:false},
            'columnWidth':{prop:'columnWidth','name':'列宽度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'bindDataField':{prop:'bindDataField','name':'绑定实体属性','type':'custom','readOnly':false,'isHide':false,required:false, customMethod:'wof.customWindow.MetaTreeSelector', customParam:'field'},
            'gridId':{prop:'gridId','name':'下拉框表格ID','type':'text','readOnly':false,'isHide':false,required:false},
            'display':{prop:'display','name':'是否显示','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'isPin':{prop:'isPin','name':'是否钉住','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'dateTimeFormat':{prop:'dateTimeFormat','name':'时间格式','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    'yyyy-MM-dd HH:mm:ss':'yyyy-MM-dd HH:mm:ss',
                    'yyyy-MM':'yyyy-MM',
                    'MM-dd':'MM-dd',
                    'yyyy-MM-dd':'yyyy-MM-dd',
                    'HH:mm:ss':'HH:mm:ss',
                    'HH:mm':'HH:mm'
                },required:false},
            'editor':{prop:'editor','name':'是否行编辑','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'picUrl':{prop:'picUrl','name':'图片地址','type':'text','readOnly':false,'isHide':false,required:false},
            'selectPattern':{prop:'selectPattern','name':'下拉框显示模式','type':'enum','readOnly':false,'isHide':false, 'enumData':{'normal':'普通','tree':'树形','grid':'列表'},required:false},
            'visbleType':{prop:'visbleType','name':'显示类型','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    int:'数字',
                    text:'文本框',
                    date:'日期',
                    select:'下拉框'
                },required:false},
            'readOnly':{prop:'readOnly','name':'是否只读','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'required':{prop:'required','name':'是否必填','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'orderByType':{prop:'orderByType','name':'排序类型','type':'enum','readOnly':false,'isHide':false,
                enumData:{
                    '':'不排序',
                    'asc':'正序',
                    'desc':'倒序'
                },required:false},
            'canSearch':{prop:'canSearch','name':'使用快捷查询','type':'yesOrNo','readOnly':false,'isHide':false,required:false},
            'length':{prop:'length','name':'字符长度','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'min':{prop:'min','name':'数值最小值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'max':{prop:'max','name':'数值最大值','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'intLength':{prop:'intLength','name':'整数部分位数','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'scaleLength':{prop:'scaleLength','name':'小数部分位数','type':'naturalNumber','readOnly':false,'isHide':false,required:false},
            'regExp':{prop:'regExp','name':'校验正则表达式','type':'text','readOnly':false,'isHide':false,required:false},
            'refSearchCondition':{prop:'refSearchCondition','name':'参照查询条件','type':'text','readOnly':false,'isHide':false,required:false},
            'checkErrorInfo':{prop:'checkErrorInfo','name':'校验失败提示','type':'text','readOnly':false,'isHide':false,required:false},
            'linkForm':{prop:'linkForm','name':'窗体链接列','type':'text','readOnly':false,'isHide':false,required:false}
        }
    };

    var onReceiveMessage = [];
    onReceiveMessage.push({id:'wof.bizWidget.GridComponent_active',method:'this._receivePropertysAndRenderSelf(message.sender);'});

    var method = 'this._receiveAndProcessParameters(message.sender.parameters);';
    onReceiveMessage.push({id:'wof.bizWidget.PropertyBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnSendMessageBar_apply',method:method});
    onReceiveMessage.push({id:'wof.bizWidget.OnReceiveMessageBar_apply',method:method});
    this.setOnReceiveMessage(onReceiveMessage);


    this._selectGridIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/selectGrid.png">');
    this._deleteGridIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/deleteGrid.png">');
    this._cutGridtIco = jQuery('<img style="position:absolute;width:16px;height:16px;z-index:90;" src="src/img/cut.gif">');
    this._pinColumnIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/pin.png">');
    this._unPinColumnIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/unPin.png">');
    this._deleteGridColumnIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/deleteGridColumn.png">');
    this._insertGridColumnIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/insertGridColumn.png">');
    this._gridColumnMoveRightIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/gridColumnMoveRight.png">');
    this._gridColumnMoveLeftIco = jQuery('<img style="position:absolute;width:16px;height:16px;" src="src/img/gridColumnMoveLeft.png">');

};
wof.bizWidget.spanner.GridComponentSpanner.prototype = {
    /**
     * 属性声明 （private ，用"_"标识）
     */

    //属性

    _meta: null,  //构件元数据   定义了构件的名称、类路径、对外暴露的属性和消息

    _propertys: null,

    _parameters: null,

    _pinColumnIco :null,

    _unPinColumnIco :null,

    _deleteGridColumnIco :null,

    _insertGridColumnIco : null,

    _gridColumnMoveRightIco :null,

    _gridColumnMoveLeftIco : null,

    _selectGridIco : null,

    _deleteGridIco : null,

    _cutGridtIco:null,


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
        this._pinColumnIco.remove();
        this._unPinColumnIco.remove();
        this._deleteGridColumnIco.remove();
        this._insertGridColumnIco.remove();
        this._gridColumnMoveRightIco.remove();
        this._gridColumnMoveLeftIco.remove();
        this._selectGridIco.remove();
        this._deleteGridIco.remove();
        this._cutGridtIco.remove();

        var _this = this;
        this._pinColumnIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.pinColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._unPinColumnIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.unPinColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._deleteGridColumnIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.deleteColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._insertGridColumnIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.insertColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });

        this._gridColumnMoveRightIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.moveToNextColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._gridColumnMoveLeftIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            var activeColumnIndex = _this.getPropertys().activeColumnIndex;
            gridComponent.moveToPrevColumnByIndex(activeColumnIndex);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._selectGridIco.mousedown(function(event){
            event.stopPropagation();
            var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
            gridComponent.setActiveColumnIndex(null);
            gridComponent.render();
            gridComponent.sendMessage('wof.bizWidget.GridComponent_active');
        });
        this._deleteGridIco.mousedown(function(event){
            var dialogDiv = jQuery('<div title="提示"><p><span class="ui-icon ui-icon-alert" style="float:left;margin:0 7px 20px 0;"></span>确定要删除该列表吗?</p></div>');
            dialogDiv.dialog({
                resizable:false,
                height:200,
                modal: true,
                buttons:{
                    '确定':function(){
                        var gridComponent = wof.util.ObjectManager.get(_this.getPropertys().id);
                        gridComponent.removeChildren(true);
                        gridComponent.remove(true);

                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    },
                    '关闭':function(){
                        jQuery(this).dialog('close');
                        jQuery(this).remove();
                    }
                }
            });
        });

        this._cutGridtIco.mousedown(function(event){
            event.stopPropagation();
            wof.util.GlobalObject.add('cutObjectId',_this.getPropertys().id);
        });

    },

    //----------必须实现----------
    render: function () {
        var parameters = {};
        var gridComponent = wof.util.ObjectManager.get(this.getPropertys().id);
        if(gridComponent!=null){
            parameters.id = this.getPropertys().id;
            parameters.componentId = this.getPropertys().componentId;
            parameters.className = this.getPropertys().className;
            parameters.onReceiveMessage = this.getPropertys().onReceiveMessage;
            parameters.onSendMessage = this.getPropertys().onSendMessage;

            this._selectGridIco.css('top','0px').css('left','0px');
            gridComponent.getDomInstance().append(this._selectGridIco);

            this._deleteGridIco.css('top','0px').css('left',(this._deleteGridIco.width()+2)+'px');
            gridComponent.getDomInstance().append(this._deleteGridIco);

            this._cutGridtIco.css('top',0).css('left',this._deleteGridIco.width()*2+4);
            gridComponent.getDomInstance().append(this._cutGridtIco);

            var activeColumnIndex = this.getPropertys().activeColumnIndex;
            var column = gridComponent.findColumnByIndex(activeColumnIndex);
            if(column!=null){
                var div = null;
                if(column.getIsPin()==false){
                    div = jQuery('th > div[colId='+column.getId()+']:eq(1)');
                }else{
                    div = jQuery('th > div[colId='+column.getId()+']:eq(3)');
                }
                if(column.getIsPin()==false){
                    this._pinColumnIco.css('top','0px').css('left','0px');
                    div.append(this._pinColumnIco);
                }
                if(column.getIsPin()==true){
                    this._unPinColumnIco.css('top','0px').css('left','0px');
                    div.append(this._unPinColumnIco);
                }
                this._deleteGridColumnIco.css('top','0px').css('left',(this._deleteGridColumnIco.width()+2)+'px');
                div.append(this._deleteGridColumnIco);

                this._insertGridColumnIco.css('top','0px').css('left',(this._insertGridColumnIco.width()*2+4)+'px');
                div.append(this._insertGridColumnIco);

                if(gridComponent.canMoveToNextColumnByIndex(activeColumnIndex)==true){
                    this._gridColumnMoveRightIco.css('top',(this.getPropertys().headerHeight*gridComponent.getScale()-this._gridColumnMoveRightIco.height())+'px').css('left',(column.getColumnWidth()*gridComponent.getScale()-this._gridColumnMoveRightIco.width())+'px');
                    div.append(this._gridColumnMoveRightIco);
                }

                if(gridComponent.canMoveToPrevColumnByIndex(activeColumnIndex)==true){
                    this._gridColumnMoveLeftIco.css('top',(this.getPropertys().headerHeight*gridComponent.getScale()-this._gridColumnMoveLeftIco.height())+'px').css('left','0px');
                    div.append(this._gridColumnMoveLeftIco);
                }

                parameters.activeClass = 'GridComponentColumn';
                parameters.index = column.getIndex();
                parameters.name = column.getName();
                parameters.useMultiSelect = column.getUseMultiSelect();
                parameters.columnType = column.getColumnType();
                parameters.caption = column.getCaption();
                parameters.columnWidth = column.getColumnWidth();
                parameters.bindDataField = column.getBindDataField();
                parameters.gridId = column.getGridId();
                parameters.display = column.getDisplay();
                parameters.isPin = column.getIsPin();
                parameters.dateTimeFormat = column.getDateTimeFormat();
                parameters.editor = column.getEditor();
                parameters.picUrl = column.getPicUrl();
                parameters.selectPattern = column.getSelectPattern();
                parameters.visbleType = column.getVisbleType();
                parameters.readOnly = column.getReadOnly();
                parameters.required = column.getRequired();
                parameters.orderByType = column.getOrderByType();
                parameters.canSearch = column.getCanSearch();
                parameters.length = column.getLength();
                parameters.min = column.getMin();
                parameters.max = column.getMax();
                parameters.intLength = column.getIntLength();
                parameters.scaleLength = column.getScaleLength();
                parameters.regExp = column.getRegExp();
                parameters.refSearchCondition = column.getRefSearchCondition();
                parameters.checkErrorInfo = column.getCheckErrorInfo();
                parameters.linkForm = column.getLinkForm();
            }else{
                parameters.activeClass = 'GridComponent';
                parameters.name = gridComponent.getName();
                parameters.bindEntityID = gridComponent.getBindEntityID();
                parameters.headerHeight = gridComponent.getHeaderHeight();
                parameters.rowHeight = gridComponent.getRowHeight();
                parameters.numberDisplay = gridComponent.getNumberDisplay();
                parameters.useMutiplePage = gridComponent.getUseMutiplePage();
                parameters.rowsCount = gridComponent.getRowsCount();
                parameters.paramMaps = gridComponent.getParamMaps();

            }
        }
        this.setParameters(parameters);
        this.sendMessage('wof.bizWidget.spanner.GridComponentSpanner_render');
    },

    //选择实现
    _afterRender: function () {

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

    //静态方法 导出数据(只有需要给运行时解析的叶子节点才需要定义此方法)
    exportData: function(node){

//        <GridComponent rowsCount="30" useMutiplePage="false" rowHeight="30" headerHeight="45" index="null"
// ID="8E5FC36B5A434B6C8F6EBD67F0C58F26" BindEntityID="HJXX" GridComponentState="null" numberDisplay="true"
// Name="未命名列表" InitActionName="null" CallStr="gridComponent:0_0_1">
//            <Columns>
//                <Column LinkForm="" CheckErrorInfo="" RefSearchCondition="" RegExp="" ScaleLength="0"
// IntLength="0" Max="0" Min="0" Length="0" CanSearch="false" OrderByType="" Required="false" ReadOnly="false"
// VisbleType="select" selectPattern="normal" picUrl="" editor="false" DateTimeFormat="yyyy-MM-dd HH:mm:ss"
// IsPin="false" Display="true" GridId="" BindDataField="JZGJBXXB.gh" columnWidth="200"
// Caption="职工工号" ColumnType="integer" UseMultiSelect="false" Name="zggh"/>
//                <Column LinkForm="" CheckErrorInfo="" RefSearchCondition="" RegExp="" ScaleLength="0" IntLength="0" Max="0" Min="0" Length="0" CanSearch="false" OrderByType="" Required="false" ReadOnly="false" VisbleType="text" selectPattern="normal" picUrl="" editor="false" DateTimeFormat="yyyy-MM-dd HH:mm:ss" IsPin="false" Display="true" GridId="" BindDataField="JZGJBXXB.xm" columnWidth="200" Caption="职工姓名" ColumnType="integer" UseMultiSelect="false" Name="zgname"/>
//                <Column LinkForm="" CheckErrorInfo="" RefSearchCondition="" RegExp="" ScaleLength="0" IntLength="0" Max="0" Min="0" Length="0" CanSearch="false" OrderByType="" Required="false" ReadOnly="false" VisbleType="text" selectPattern="normal" picUrl="" editor="false" DateTimeFormat="" IsPin="false" Display="true" GridId="" BindDataField="JZGJBXXB.xb" columnWidth="120" Caption="性别" ColumnType="integer" UseMultiSelect="false" Name="zgsex"/>
//                <Column LinkForm="" CheckErrorInfo="" RefSearchCondition="" RegExp="" ScaleLength="0" IntLength="0" Max="0" Min="0" Length="0" CanSearch="false" OrderByType="" Required="false" ReadOnly="false" VisbleType="text" selectPattern="normal" picUrl="" editor="false" DateTimeFormat="yyyy-MM-dd HH:mm:ss" IsPin="false" Display="true" GridId="" BindDataField="HJLB.jxmc" columnWidth="200" Caption="获奖项目" ColumnType="integer" UseMultiSelect="false" Name="jxname"/>
//            </Columns>
//            <ParamMaps/>
//        </GridComponent>

        if(node.getClassName()=='wof.bizWidget.GridComponent'){
            var tool = wof.util.Tool;
            var root = tool.stringToXml("<gridComponent></gridComponent>");
            var rootElement = root.documentElement;
            tool.setAttribute(rootElement,'rowsCount',node.getRowsCount());
            tool.setAttribute(rootElement,'useMutiplePage',node.getUseMutiplePage());
            tool.setAttribute(rootElement,'rowHeight',node.getRowHeight());
            tool.setAttribute(rootElement,'headerHeight',node.getHeaderHeight());
            tool.setAttribute(rootElement,'index',node.getIndex());
            tool.setAttribute(rootElement,'id',node.getComponentId());
            tool.setAttribute(rootElement,'bindEntityID',node.getBindEntityID());
            tool.setAttribute(rootElement,'gridComponentState',node.getGridComponentState());
            tool.setAttribute(rootElement,'numberDisplay',node.getNumberDisplay());
            tool.setAttribute(rootElement,'name',node.getName());
            tool.setAttribute(rootElement,'callStr',node.getCallStr());
            tool.setAttribute(rootElement,"initActionName",node.getInitActionName());
            tool.setAttribute(rootElement,'rowsCount',node.getRowsCount());

            var columnsElement = tool.createElement(root,'columns');
            var childNodes = node.childNodes();
            for(var i=0;i<childNodes.length;i++){
                var column = tool.createElement(root,"column");
                var childNode = childNodes[i];
                tool.setAttribute(column,"linkForm",childNode.getLinkForm());
                tool.setAttribute(column,"checkErrorInfo",childNode.getCheckErrorInfo());
                tool.setAttribute(column,"refSearchCondition",childNode.getRefSearchCondition());
                tool.setAttribute(column,"regExp",childNode.getRegExp());
                tool.setAttribute(column,"scaleLength",childNode.getScaleLength());
                tool.setAttribute(column,"intLength",childNode.getIntLength());
                tool.setAttribute(column,"max",childNode.getMax());
                tool.setAttribute(column,"min",childNode.getMin());
                tool.setAttribute(column,"length",childNode.getLength());
                tool.setAttribute(column,"canSearch",childNode.getCanSearch());
                tool.setAttribute(column,"orderByType",childNode.getOrderByType());
                tool.setAttribute(column,"required",childNode.getRequired());
                tool.setAttribute(column,"readOnly",childNode.getReadOnly());
                tool.setAttribute(column,"visbleType",childNode.getVisbleType());
                tool.setAttribute(column,"selectPattern",childNode.getSelectPattern());
                tool.setAttribute(column,"picUrl",childNode.getPicUrl());
                tool.setAttribute(column,"editor",childNode.getEditor());
                tool.setAttribute(column,"dateTimeFormat",childNode.getDateTimeFormat());
                tool.setAttribute(column,"isPin",childNode.getIsPin());
                tool.setAttribute(column,"display",childNode.getDisplay());
                tool.setAttribute(column,"gridId",childNode.getGridId());
                tool.setAttribute(column,"bindDataField",childNode.getBindDataField());
                tool.setAttribute(column,"columnWidth",childNode.getColumnWidth());
                tool.setAttribute(column,"caption",childNode.getCaption());
                tool.setAttribute(column,"columnType",childNode.getColumnType());
                tool.setAttribute(column,"useMultiSelect",childNode.getUseMultiSelect());
                tool.setAttribute(column,"name",childNode.getName());
                tool.appendChild(columnsElement,column);
            }
            tool.appendChild(rootElement,columnsElement);

            var paramMapsElement = tool.createElement(root,'paramMaps');
            for(var k in node.getParamMaps()){
                var paramMapElement = tool.createElement(root,'paramMap');
                var param = node.getParamMaps()[k];
                tool.setAttribute(paramMapElement,'mapType',param['mapType']);
                tool.setAttribute(paramMapElement,'compParamName',param['compParamName']);
                tool.setAttribute(paramMapElement,'compParamValue',param['compParamValue']);
                tool.setAttribute(paramMapElement,'pageParamName',param['pageParamName']);
                tool.setAttribute(paramMapElement,'changeExpt',param['changeExpt']);
                tool.appendChild(paramMapsElement,paramMapElement);
            }
            tool.appendChild(rootElement,paramMapsElement);

            /*var mutiplePageInfo = tool.createElement(root,'mutiplePageInfo');
             tool.setAttribute(mutiplePageInfo,"rowsCount",node.getRowsCount());
             tool.appendChild(rootElement,mutiplePageInfo);*/
            //console.log(tool.xmlToString(root));
            return tool.xmlToString(root);
        }

        /*
        var json = {};
        if(node.getClassName()=='wof.bizWidget.GridComponent'){
            json.className = node.getClassName();
            json.callStr = node.getCallStr();
            json.initActionName = node.getInitActionName();
            json.name = node.getName();
            json.numberDisplay = node.getNumberDisplay();
            json.gridComponentState = node.getGridComponentState();
            json.bindEntityID = node.getBindEntityID();
            json.id = node.getComponentId();
            json.index = node.getIndex();
            json.headerHeight = node.getHeaderHeight();
            json.rowHeight = node.getRowHeight();
            json.useMutiplePage = node.getUseMutiplePage();
            json.rowsCount = node.getRowsCount();

            var paramMaps = [];
            for(var k in node.getParamMaps()){
                var param = node.getParamMaps()[k];
                paramMaps.push(param);
            }
            json.paramMaps = paramMaps;

            var columns = [];
            var childNodes = node.childNodes();
            for(var i=0;i<childNodes.length;i++){
                var column = {};
                var childNode = childNodes[i];
                column.name = childNode.getName();
                column.useMultiSelect = childNode.getUseMultiSelect();
                column.columnType = childNode.getColumnType();
                column.caption = childNode.getCaption();
                column.columnWidth = childNode.getColumnWidth();
                column.bindDataField = childNode.getBindDataField();
                column.gridId = childNode.getGridId();
                column.display = childNode.getDisplay();
                column.isPin = childNode.getIsPin();
                column.dateTimeFormat = childNode.getDateTimeFormat();
                column.editor = childNode.getEditor();
                column.picUrl = childNode.getPicUrl();
                column.selectPattern = childNode.getSelectPattern();
                column.visbleType = childNode.getVisbleType();
                column.readOnly = childNode.getReadOnly();
                column.required = childNode.getRequired();
                column.orderByType = childNode.getOrderByType();
                column.canSearch = childNode.getCanSearch();
                column.length = childNode.getLength();
                column.min = childNode.getMin();
                column.max = childNode.getMax();
                column.intLength = childNode.getIntLength();
                column.scaleLength = childNode.getScaleLength();
                column.regExp = childNode.getRegExp();
                column.refSearchCondition = childNode.getRefSearchCondition();
                column.checkErrorInfo = childNode.getCheckErrorInfo();
                column.linkForm = childNode.getLinkForm();
                columns.push(column);
            }
            json.columns = columns;
        }
        console.log(JSON.stringify(json));
        return json;*/
    },

    //加工并发送数据
    _receivePropertysAndRenderSelf:function(propertys){
        this.setPropertys(propertys);
        this.render();
    },

    //接收并处理数据
    _receiveAndProcessParameters:function(parameters){
        if(parameters.id==this.getPropertys().id){
            var gridComponent=wof.util.ObjectManager.get(parameters.id);
            if(parameters.activeClass=="GridComponent"){
                gridComponent.updateGridComponent(parameters);
                var bindEntityId = gridComponent.getBindEntityID();
                if(bindEntityId){
                    var gridComponentColumns = gridComponent._getBindEntityPropertyColumns();
                    var entity = gridComponent.getBindEntity();
                    if(gridComponentColumns.length <= 0 && entity){
                            var properties = entity.properties;
                            if(properties){
                                var gridComponentColumnsLength = !gridComponentColumns ? 0 : gridComponentColumns.length;
                                if(gridComponentColumnsLength < properties.length){
                                    var needCreateColumnCount = properties.length - gridComponentColumnsLength;
                                    for(var i = 0; i < needCreateColumnCount; i++){
                                        gridComponent.insertColumnByIndex(1);
                                    }
                                }
                                gridComponentColumns = gridComponent._getAllColumns();
                                for(var i = 0; i < gridComponentColumns.length;i++){
                                    var gridComponentColumn = gridComponentColumns[i];
                                    var property = properties.shift();
                                    if(property){
                                        gridComponentColumn.setBindDataField(entity.alias + '.' + property.name);
                                        gridComponentColumn.setCaption(property.label);
                                    }
                                }
                                this.render();
                            }
                    }
                }
                gridComponent.render();
                gridComponent.sendMessage("wof.bizWidget.GridComponent_active");
            }else if(parameters.activeClass=="GridComponentColumn"){
                gridComponent.updateGridComponentColumn(parameters);
                gridComponent.render();
                gridComponent.sendMessage("wof.bizWidget.GridComponent_active");
            }
        }
    }


};