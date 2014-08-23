var wof$_aop = (function(){
    function caption(s){
        var a = s.split('');
        a[0] = a[0].toUpperCase();
        return a.join('');
    }
    function aopChildren(objName){
        var obj = eval(objName);
        for(var o in obj){
            if(typeof(obj[o])=='function'){
                if(obj[o]['getClassName']==null){
                    //todo disable
                    /*for(var p in obj[o]['prototype']){
                        if(typeof(obj[o]['prototype'][p])!='function'&&p.indexOf('_')!=0){
                            (function(proto,p){
                                var cp = caption(p);
                                if(proto['set'+cp]==null){
                                    proto['set'+cp]=function(val){
                                        this[p] = val;
                                    };
                                }
                                if(proto['get'+cp]==null){
                                    proto['get'+cp]=function(){
                                        return this[p];
                                    };
                                }
                            })(obj[o]['prototype'],p);
                        }
                    }*/
                    obj[o].prototype._version = null;
                    obj[o].prototype.getVersion = function(){
                        return this._version || '1.0';
                    };
                    obj[o].prototype._onSendMessage = null;
                    obj[o].prototype.getOnSendMessage = function() {
                        return this._onSendMessage || [];
                    };
                    obj[o].prototype._onSendMessageMethods = null;
                    obj[o].prototype.setOnSendMessage = function(onSendMessage) {
                        if(onSendMessage instanceof Array){
                            this._onSendMessage = onSendMessage;
                            this._onSendMessageMethods = {};
                            var _this = this;
                            jQuery.each(this.getOnSendMessage(), function(i,n){
                                _this._onSendMessageMethods[n.id] = n.method;
                            });
                        }
                    };
                    obj[o].prototype._onReceiveMessage = null;
                    obj[o].prototype.getOnReceiveMessage = function() {
                        return this._onReceiveMessage || [];
                    };
                    obj[o].prototype.setOnReceiveMessage = function(onReceiveMessage) {
                        if(onReceiveMessage instanceof Array){
                            this._onReceiveMessageMethods = {};
                            var _this = this;
                            jQuery.each(this.getOnReceiveMessage(), function(i,n){
                                wof.util.Observer.unregister(n.id, _this);
                            });
                            _this._onReceiveMessage = onReceiveMessage;
                            jQuery.each(this.getOnReceiveMessage(), function(i,n){
                                wof.util.Observer.register(n.id, _this, n.priority==null?50: n.priority);
                                _this._onReceiveMessageMethods[n.id] = n.method;
                            });
                        }
                    };
                    obj[o].prototype._componentName = null; //是否为构件对象 默认 true 是
                    obj[o].prototype.getComponentName = function(){
                        return this._componentName==null?this.getClassName():this._componentName;
                    };
                    obj[o].prototype.setComponentName = function(componentName){
                        this._componentName = componentName;
                    };
                    obj[o].prototype._position = null;
                    obj[o].prototype.getPosition = function() {
                        return this._position || 'absolute';
                    };
                    obj[o].prototype.setPosition = function(position) {
                        this._position = position;
                    };
                    obj[o].prototype._zIndex = null;
                    obj[o].prototype.getZIndex = function() {
                        return this._zIndex || 'auto';
                    };
                    obj[o].prototype.setZIndex = function(zIndex) {
                        this._zIndex = zIndex;
                    };
                    obj[o].prototype._className = objName+"."+o;
                    obj[o].prototype.getClassName = function(){
                        return this._className;
                    };
                    //获得所属的构件对象 自身是构件对象则返回null
                    obj[o].prototype.getComponent = function(){
                        var component = null;
                        if(this.getComponentName()!=this.getClassName()){ //如果自身不是构件对象 则查找自己所属的构件对象
                            var parentNode = this;
                            while((parentNode=parentNode.parentNode())!=null){
                                if(parentNode.getClassName()==this.getComponentName()){
                                    component = parentNode;
                                    break;
                                }
                            }
                        }
                        return component;
                    };
                    obj[o].prototype._id = null;
                    obj[o].prototype.getId = function(){
                        return this._id==null?(this._id=wof.util.Tool.uuid()):this._id;
                    };
                    obj[o].prototype._domInstance = null;
                    obj[o].prototype.getDomInstance = function(){
                        if(this._domInstance==null){
                            this._domInstance = this._domInstance=jQuery('<div oid="'+this.getId()+'" classname="'+this.getClassName()+'" componentname="'+this.getComponentName()+'">');
                        }
                        return this._domInstance;
                    };
                    obj[o].prototype.sendMessage = function(messageId, data){
                        //只有被添加到对象结构图中的对象才可以发送消息
                        if(wof.util.ObjectManager.get(this.getId())!=null){
                            //如果有用户自定义的业务逻辑 先调用之 并根据返回值判断是否需要继续发送消息
                            var f = true;
                            if(this._onSendMessageMethods==null){
                                this._onSendMessageMethods = {};
                            }
                            var onSendMessageFunc = this._onSendMessageMethods[messageId];
                            if(onSendMessageFunc!=null){
                                try{
                                    var func = null;
                                    eval('func=(function wof$_onSendMessageFunc(message){ '+onSendMessageFunc+' })');
                                    f = func.call(this,{'id':messageId, 'sender':this.getData(), 'data':data});
                                }catch(e){
                                    console.log('执行业务['+messageId+']处理过程发生异常 原因:'+e);
                                }
                            }
                            //如果业务逻辑返回值为true 则可以发送消息
                            if(f!=false){
                                wof.util.Observer.sendMessage({'id':messageId, 'sender':this.getData(), 'data':data});
                            }
                        }
                    };
                    obj[o].prototype._onReceiveMessageMethods = null;
                    obj[o].prototype.receiveMessage = function(message){
                        //只有被添加到对象结构图中的对象才可以响应其监听的消息
                        if(wof.util.ObjectManager.get(this.getId())!=null){
                            //查找指定对象id的构件对象
                            function findComponentId(id){
                                var componentId = null;
                                var parentNode = wof.util.ObjectManager.get(id);
                                var componentName = parentNode.getComponentName();
                                while((parentNode=parentNode.parentNode())!=null){
                                    if(parentNode.getClassName()==componentName){
                                        componentId = parentNode.getId();
                                        break;
                                    }
                                }
                                return componentId;
                            }
                            var _this = this;
                            function processMsg(message){
                                if(_this._onReceiveMessageMethods==null){
                                    _this._onReceiveMessageMethods = {};
                                }
                                var onReceiveMessageFunc = _this._onReceiveMessageMethods[message.id];
                                if(onReceiveMessageFunc!=null){ //有相应的用户定制业务脚本处理 则直接调用
                                    try{
                                        var func = null;
                                        eval('func=(function wof$_onReceiveMessageFunc(message){ '+onReceiveMessageFunc+' })');
                                        return func.apply(_this,arguments);
                                    }catch(e){
                                        console.log(_this.getClassName()+'执行用户定制业务['+message.id+']脚本处理过程发生异常 原因:'+e);
                                    }
                                }
                            }
                            //todo 修改逻辑为能响应其他的构件以及来自自身内部对象的消息（判断来自自身对象的依据为检查其构件名称属性是否为同一个父对象）
                            if(this.getComponentName() == this.getClassName()){ //构件对象能响应来自其他构件对象的消息以及来自同属于自身构件的对象的消息
                                if(message.sender.componentName==message.sender.className){
                                    processMsg(message);
                                }else{
                                    var senderComponentId = findComponentId(message.sender.id);
                                    var receiverComponentId = this.getId();
                                    if(senderComponentId!=null&&senderComponentId==receiverComponentId) { //发送和接收者同属于一个构件对象
                                        processMsg(message);
                                    }
                                }
                            }else{
                                if(message.sender.componentName!=message.sender.className){ //如果不是构件对象 则只能响应来自同属于相同构件对象的（内部对象）消息
                                    var senderComponentId = findComponentId(message.sender.id);
                                    var receiverComponentId = findComponentId(this.getId());
                                    if(senderComponentId!=null&&senderComponentId==receiverComponentId){ //发送和接收者同属于一个构件对象
                                        processMsg(message);
                                    }
                                }
                            }
                        }
                    };
                    obj[o].prototype._hiden = null;
                    obj[o].prototype.getHiden = function(){
                        return this._hiden==null?(this._hiden=false):this._hiden;
                    };
                    obj[o].prototype.setHiden = function(hiden){
                        if(hiden==true){
                            this.getDomInstance().hide();
                        }else{
                            this.getDomInstance().show();
                        }
                        this._hiden = hiden;
                    };
                    obj[o].prototype._css = null;
                    obj[o].prototype.getCss = function(){
                        return this._css==null?this._css='':this._css;
                    };
                    obj[o].prototype.setCss = function(css){
                        this._css = css;
                    };
                    obj[o].prototype.clone = function(){
                        var obj=eval('new '+this.getClassName()+'()');
                        obj.setData(this.getData());
                        return obj;
                    };
                    obj[o].prototype._parentNode = null;
                    obj[o].prototype.parentNode = function(){
                        return this._parentNode;
                    };
                    obj[o].prototype.beforeTo = function(node){
                        node.before(this);
                    };
                    obj[o].prototype.afterTo = function(node){
                        node.after(this);
                    };
                    obj[o].prototype.appendTo = function(parentNode){
                        if(parentNode!=null&&parentNode.getClassName!=null){
                            parentNode.appendChild(this);
                        }else{
                            jQuery(parentNode).append(this.getDomInstance());
                            wof.util.ObjectManager.add(this.getId(), this);
                        }
                    };
                    obj[o].prototype.remove = function(flag){
                        if(this.beforeRemove!=null){
                            this.beforeRemove();
                        }
                        var parentNode = this.parentNode();
                        if(parentNode!=null){
                            parentNode.removeChild(this,flag);
                        }else{
                            wof.util.ObjectManager.remove(this.getId());
                            if(flag==true){
                                this.setOnReceiveMessage([]);
                                this.setOnSendMessage([]);
                                this.getDomInstance().remove();
                            }else{
                                this.getDomInstance().detach();
                            }
                        }
                        if(this.afterRemove!=null){
                            this.afterRemove();
                        }
                    };
                    obj[o].prototype.removeChildren = function(flag){
                        if(this.beforeClear!=null) {
                            this.beforeClear();
                        }
                        var childNodes = this.childNodes();
                        for(var i=childNodes.length-1; i>=0; i--){
                            childNodes[i].removeChildren(flag);
                            childNodes[i].setOnReceiveMessage([]);
                            childNodes[i].setOnSendMessage([]);
                            if(flag==true){
                                childNodes[i].remove(true);
                            }else{
                                childNodes[i].remove(false);
                            }
                        }
                        if(this.afterClear!=null){
                            this.afterClear();
                        }
                    };
                    obj[o].prototype.toJSON = function(){
                        return JSON.stringify(this.getData());
                    };
                    obj[o].prototype.toHTML = function(){
                        return this.getDomInstance().html();
                    };
                    obj[o].prototype._childNodes = null;
                    obj[o].prototype.childNodes = function(){
                        return (this._childNodes==null)?this._childNodes=[]:this._childNodes;
                    };
                    obj[o].prototype.appendChild = function(childNode){
                        wof.util.ObjectManager.add(childNode.getId(), childNode);
                        childNode._parentNode = this;
                        this.getDomInstance().append(childNode.getDomInstance());
                        this.childNodes().push(childNode);
                    };
                    obj[o].prototype.before = function(node){
                        wof.util.ObjectManager.add(node.getId(), node);
                        this.getDomInstance().before(node.getDomInstance());
                        if(this.parentNode()!=null){
                            var idx=jQuery.inArray(this, this.parentNode().childNodes());
                            this.parentNode().childNodes().splice(idx,0,node);
                            node._parentNode = this.parentNode();
                        }else{
                            //todo
                            console.log('警告:执行beforeTo方法出现问题[目标节点的父节点不存在]');
                        }
                    };
                    obj[o].prototype.after = function(node){
                        wof.util.ObjectManager.add(node.getId(), node);
                        this.getDomInstance().after(node.getDomInstance());
                        if(this.parentNode()!=null){
                            var idx=jQuery.inArray(this, this.parentNode().childNodes());
                            this.parentNode().childNodes().splice(idx+1,0,node);
                            node._parentNode = this.parentNode();
                        }else{
                            //todo
                            console.log('警告:执行afterTo方法出现问题[目标节点的父节点不存在]');
                        }
                    };
                    obj[o].prototype.removeChild = function(childNode,flag){
                        var idx=jQuery.inArray(childNode, this.childNodes());
                        if(idx != -1){
                            wof.util.ObjectManager.remove(childNode.getId());
                            childNode._parentNode = null;
                            this.childNodes().splice(idx,1);
                            if(flag==true){
                                childNode.getDomInstance().remove();
                            }else{
                                childNode.getDomInstance().detach();
                            }
                        }
                    };
                    obj[o].prototype.nextNode = function(){
                        var node = null;
                        if(this.parentNode()!=null){
                            var childNodes = this.parentNode().childNodes();
                            for(var i=0;i<childNodes.length;i++){
                                if(childNodes[i].getId()==this.getId()){
                                    if(i<childNodes.length&&childNodes[i+1]!=null){
                                        node = childNodes[i+1];
                                    }else{
                                        break;
                                    }
                                }
                            }
                        }else{
                            //todo
                            console.log('警告:执行nextNode方法出现问题[目标节点的父节点不存在]');
                        }
                        return node;
                    };
                    obj[o].prototype.prevNode = function(){
                        var node = null;
                        if(this.parentNode()!=null){
                            var childNodes = this.parentNode().childNodes();
                            for(var i=0;i<childNodes.length;i++){
                                if(childNodes[i].getId()==this.getId()){
                                    if(i>0&&childNodes[i-1]!=null){
                                        node = childNodes[i-1];
                                    }else{
                                        break;
                                    }
                                }
                            }
                        }else{
                            console.log('警告:执行prevNode方法出现问题[目标节点的父节点不存在]');
                        }
                        return node;
                    };
                    obj[o].prototype._height = null;
                    if(obj[o].prototype.getHeight==null){
                        obj[o].prototype.getHeight = function(){
                            return this._height;
                        };
                    }
                    if(obj[o].prototype.setHeight==null){
                        obj[o].prototype.setHeight = function(height){
                            this._height = height;
                        };
                    }
                    obj[o].prototype._width = null;
                    if(obj[o].prototype.getWidth==null){
                        obj[o].prototype.getWidth = function(){
                            return this._width;
                        };
                    }
                    if(obj[o].prototype.setWidth==null){
                        obj[o].prototype.setWidth = function(width){
                            this._width = width;
                        };
                    }
                    obj[o].prototype._left = null;
                    if(obj[o].prototype.getLeft==null){
                        obj[o].prototype.getLeft = function(){
                            return this._left;
                        };
                    }
                    if(obj[o].prototype.setLeft==null){
                        obj[o].prototype.setLeft = function(left){
                            this._left = left;
                        };
                    }
                    obj[o].prototype._top = null;
                    if(obj[o].prototype.getTop==null){
                        obj[o].prototype.getTop = function(){
                            return this._top;
                        };
                    }
                    if(obj[o].prototype.setTop==null){
                        obj[o].prototype.setTop = function(top){
                            this._top = top;
                        };
                    }
                    obj[o].prototype._scale = null;
                    obj[o].prototype.getScale = function(){
                        if(this._scale==null)
                            this._scale=1;
                        return this._scale;
                    };
                    obj[o].prototype.setScale = function(scale){
                        var childNodes = this.childNodes();
                        for(var i=0; i<this.childNodes().length; i++){
                            childNodes[i].setScale(scale);
                        }
                        this._scale = scale;
                    };
                    if(obj[o].prototype.getData!=null){
                        obj[o].prototype._getData = obj[o].prototype.getData;
                        obj[o].prototype.getData = function(){
                            var data=this._getData();
                            data.id=this.getId();
                            
                            data.componentName = this.getComponentName();
                            
                            data.className=this.getClassName();
                            data.hiden=this.getHiden();
                            data.position = this.getPosition();
                            data.zIndex = this.getZIndex();
                            data.scale = this.getScale();
                            data.onSendMessage = this.getOnSendMessage();
                            data.onReceiveMessage = this.getOnReceiveMessage();
                            if(this.getWidth()!=null){
                                data.width=this.getWidth();
                            }
                            if(this.getHeight()!=null){
                                data.height=this.getHeight();
                            }
                            if(this.getTop()!=null){
                                data.top=this.getTop();
                            }
                            if(this.getLeft()!=null){
                                data.left=this.getLeft();
                            }
                            data.css=this.getCss();
                            var childNodes=[];
                            for(var i=0; i<this.childNodes().length; i++){
                                childNodes.push(this.childNodes()[i].getData());
                            }
                            data.childNodes=childNodes;
                            return data;
                        };
                    }
                    if(obj[o].prototype.setData!=null){
                        obj[o].prototype._setData = obj[o].prototype.setData;
                        obj[o].prototype.setData = function(data){
                            if(data.width!=null){
                                this.setWidth(data.width);
                            }
                            if(data.height!=null){
                                this.setHeight(data.height);
                            }
                            if(data.top!=null){
                                this.setTop(data.top);
                            }
                            if(data.left!=null){
                                this.setLeft(data.left);
                            }
                            
                            this.setComponentName(data.componentName);
                            
                            this.setCss(data.css);
                            this.setHiden(data.hiden);
                            this.setPosition(data.position);
                            this.setZIndex(data.zIndex);
                            this.setScale(data.scale);


                            //设置监听和发送消息 todo 设置和移除监听应该在添加或者移除对象时去执行
                            this.setOnSendMessage(data.onSendMessage);
                            this.setOnReceiveMessage(data.onReceiveMessage);

                            var dataChildLen=data.childNodes.length;
                            var tempNodes=new wof.util.Hashtable();
                            var objChildLen=this.childNodes().length;
                            for(var i=objChildLen-1; i>=0; i--){
                                tempNodes.add(this.childNodes()[i].getId(), this.childNodes()[i]);
                                this.removeChild(this.childNodes()[i]);
                            }
                            for(var i=0; i<dataChildLen; i++){
                                if(tempNodes.items(data.childNodes[i].id)!=null){
                                    tempNodes.items(data.childNodes[i].id).appendTo(this);
                                    tempNodes.items(data.childNodes[i].id).setData(data.childNodes[i]);
                                    tempNodes.remove(data.childNodes[i].id);
                                }else{
                                    var node=eval("new " + data.childNodes[i].className + "();");
                                    node.appendTo(this);
                                    node.setData(data.childNodes[i]);
                                }
                            }
                            this._setData(data);
                        };
                    }
                    obj[o].prototype._event = null;
                    obj[o].prototype._timeFn = null;
                    if(obj[o].prototype._initRender!=null){
                        obj[o].prototype.__initRender = obj[o].prototype._initRender;
                        obj[o].prototype._initRender = function(){
                            var _this = this;
                            this.getDomInstance().mousedown(function(event){
                                event.stopPropagation();
                                clearTimeout(this._timeFn);
                                this._timeFn = setTimeout(function(){
                                    _this._event = event;
                                    _this.sendMessage(_this.getClassName()+'_mousedown');
                                    _this.sendMessage(_this.getClassName()+'_active');
                                },250);
                            });
                            this.getDomInstance().dblclick(function(event){
                                event.stopPropagation();
                                clearTimeout(this._timeFn);
                                _this._event = event;
                                _this.sendMessage(_this.getClassName()+'_dblclick');
                                _this.sendMessage(_this.getClassName()+'_active');
                            });
                            this.__initRender();
                        };
                    }else{
                        obj[o].prototype._initRender = function(){
                            var _this = this;
                            var timeFn = null;
                            this.getDomInstance().mousedown(function(event){
                                event.stopPropagation();
                                clearTimeout(timeFn);
                                timeFn = setTimeout(function(){
                                    _this._event = event;
                                    _this.sendMessage(_this.getClassName()+'_mousedown');
                                    _this.sendMessage(_this.getClassName()+'_active');
                                },250);
                            });
                            this.getDomInstance().dblclick(function(event){
                                event.stopPropagation();
                                clearTimeout(timeFn);
                                _this._event = event;
                                _this.sendMessage(_this.getClassName()+'_dblclick');
                                _this.sendMessage(_this.getClassName()+'_active');
                            });
                        };
                    }
                    obj[o].prototype._initRenderFlag = false;
                    if(obj[o].prototype.render!=null){
                        obj[o].prototype._render = obj[o].prototype.render;
                        obj[o].prototype.render = function(){
                            if(this._initRenderFlag == false){
                                this._initRenderFlag = true;
                                this._initRender();
                            }
                            if(this._beforeRender!=null){
                                this._beforeRender();
                            }
                            for(var i=0; i<this.childNodes().length; i++){
                                this.childNodes()[i].render();
                            }
                            if(this._left!=null){
                                this.getDomInstance().css('left', (this._left*this.getScale())+'px');
                            }
                            if(this._top!=null){
                                this.getDomInstance().css('top', (this._top*this.getScale())+'px');
                            }
                            if(this._width!=null){
                                this.getDomInstance().css('width', (this._width*this.getScale())+'px');
                            }
                            if(this._height!=null){
                                this.getDomInstance().css('height', (this._height*this.getScale())+'px');
                            }
                            this.getDomInstance().css('position', this.getPosition());
                            this.getDomInstance().css('zIndex', this.getZIndex());
                            this.getDomInstance().addClass(this.getCss());    //todo 有bug
                            this._render();
                            if(this._afterRender!=null){
                                this._afterRender();
                            }
                        };
                    }
                    for(var p in obj[o].prototype){
                        if(typeof(obj[o].prototype[p])=='function'&&p.indexOf('set')==0){ //对set方法注入权限检查 同时注入属性值变化标识
                            obj[o].prototype['__'+p] = obj[o].prototype[p];
                            obj[o].prototype[p]=function(){
                                var funcName = '';
                                var func = arguments.callee;
                                for(var n in this){
                                    if(this[n]===func){
                                        funcName = n;
                                        break;
                                    }
                                }
                                
                                //todo 逻辑修改为如果当前对象为非构件对象 则只有同属于一个构件对象的对象的定制业务脚本才能调用当前对象的set方法
                                /**
                                if(this.getIsInside()==true){ //如果当前对象为内部对象 则定制业务脚本不能调用内部对象的set方法
                                    var canCall = true;
                                    var c = this[funcName].caller;
                                    if(c==null){
                                        canCall = false;
                                    }else if(c!=null&& c.toString().indexOf('wof$_onReceiveMessageFunc')>=0) {
                                        canCall = false;
                                    }else if(c!=null&& c.toString().indexOf('wof$_onSendMessageFunc')>=0) {
                                        canCall = false;
                                    }
                                    if(canCall==false){
                                        alert('定制业务脚本不能调用内部对象的set方法');
                                        return;
                                    }
                                }
                                */

                                var propertyName = '_'+(funcName.substring(3, funcName.length)).toLowerCase();
                                //if(this[propertyName+'Render']!=null){ //todo 为了效率考虑 只有该属性定义了对应的渲染方法 _xxxRender 才会检查该属性值是否发生了变化
                                    //.log("111=="+JSON.stringify(this[propertyName])); //当前值
                                    //console.log('222=='+JSON.stringify(arguments[0])); //设置值
                                //}
                                this['__'+funcName].apply(this,arguments);
                            }
                        }
                    }
                }
            }else if(typeof(obj[o])=='object'){
                aopChildren(objName+"."+o);
            }
        }
    }
    return aopChildren;
})();
wof$_aop('wof.kernel');
wof$_aop('wof.widget');
wof$_aop('wof.bizWidget');
wof$_aop('wof.functionWidget');
var wof$ = {};
wof$.find = wof.util.Selector.find;
wof$.create = wof.util.ObjectManager.create;
