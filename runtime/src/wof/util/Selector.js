/**
 * @utilClass Selector class
 * @package wof.util
 * @copyright author
 * @Time: 13-8-16 下午9:42
 */
if (!wof.util.Selector) {
    wof.util.Selector = {

        _leftMatch : null,

        /**
         * 获得leftMatch的正则定义
         */
        _getLeftMatch: function(){
            if(wof.util.Selector._leftMatch==null){
                wof.util.Selector._leftMatch = {};
                var leftMatch = {
                    //提取id定位符
                    ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    //提取样式定义
                    CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                    //提取名称
                    NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                    //提取属性
                    ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                    //提取标签
                    TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                    //提取子对象过滤伪类
                    CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                    //提取位置伪类
                    POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                    //提取伪类
                    PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
                };
                //为leftMatch正则添加前缀和后缀
                for(var type in leftMatch){
                    leftMatch[type] = new RegExp(leftMatch[type].source+(/(?![^\[]*\])(?![^\(]*\))/.source));
                    wof.util.Selector._leftMatch[type] = new RegExp( /(^(?:.|\r|\n)*?)/.source + leftMatch[type].source.replace(/\\(\d+)/g, function(all,num){
                        return "\\"+(num-0 +1);
                    }));
                }
            }
            return wof.util.Selector._leftMatch;
        },


        //todo 尚未完全实现的语法分析器
        //对选择器语法进行解析并调用对应的选择器
        find:function(queryString){
            var sls;
            //分析区隔块表达式
            function chunk(qStr){
                var leftMatch = wof.util.Selector._getLeftMatch();
                var type='className',id,className='*',pseudo,attrs=[];
                var mm = leftMatch.ID.exec(qStr);
                if(mm){
                    type = 'id';
                    id = mm[2];
                    qStr = '';
                }else if(mm = leftMatch.TAG.exec(qStr)){
                    type = 'className';
                    var className = mm[2];
                    qStr = qStr.replace(leftMatch.TAG,'');
                }
                //提取伪类 如果存在伪类 则从左向右查找
                //反之 从右向左查找
                if(mm=leftMatch.PSEUDO.exec(qStr)){
                    pseudo = mm[2];
                    qStr = qStr.replace(leftMatch.PSEUDO,'');
                }
                //提取属性
                while(mm=leftMatch.ATTR.exec(qStr)){
                    var attr = mm[2];
                    var op = mm[3];
                    var value = mm[4]?mm[5]:mm[6];
                    attrs.push({attr:attr,op:op,value:value});
                    qStr = qStr.replace(leftMatch.ATTR,'');
                }
                return {type:type,id:id,className:className,pseudo:pseudo,attrs:attrs};
            }

            //提取区隔块表达式和块间关系符
            var chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;
            //var soFar = '*,input:hidden[name^="news"][xx="tt"] input';
            var m, soFar=queryString, parts=[], extra;
            do{
                chunker.exec('');
                m = chunker.exec(soFar);
                if(m){
                    soFar = m[3];
                    parts.push(m[1]);
                    if (m[2]) {
                        extra = m[3];
                        break; //todo 目前不支持群组选择
                    }
                }
            }while(m);
            //获取区隔块表达式
            if(parts.length==1){
                var qs = chunk(parts[0]);
                console.log(JSON.stringify(qs));
                //如果type是id 则直接按照id查找
                if(qs['type']=='id'){
                    sls = wof.util.Selector._getObjectById(qs['id']);
                }else{
                    if(qs['type']=='className'){
                        if(qs['className']=='*'){
                            sls = wof.util.Selector._getAllObjects();
                        }else{
                            sls = wof.util.Selector._getObjectByClassName(qs['className']);
                        }
                        //根据属性过滤
                        wof.util.Selector._attrFilter(sls, qs['attrs']);
                        //根据伪类过滤
                        wof.util.Selector._pseudoFilter(sls, qs['pseudo']);
                    }
                }
            }else if(parts.length>1){
                //todo 目前还不支持层次选择

            }
            return sls;
        },

        /**
         * 根据属性过滤
         * sls 待过滤集合
         * attrs 属性设置
         */
        _attrFilter: function(sls, attrs){
            function caption(s){
                var a = s.split('');
                a[0] = a[0].toUpperCase();
                return a.join('');
            }
            for(var i=0;i<attrs.length;i++){
                filter(attrs[i]);
            }
            function filter(attr){
                var name = attr['attr'];
                var op = attr['op'];
                var value = attr['value'];
                var len = sls.size();
                var getM = 'get'+caption(name);
                for(var i=len-1;i>=0;i--){
                    var obj = sls.get(i);
                    if(op){
                        var v;
                        if(obj[getM]!=null){
                            v = eval('obj.'+getM+'()');
                        }
                        if(op=='='){ //所有属性attribute1的值等于value1的对象
                            //如果属性不存在或者属性值不相等 则移除此对象
                            if(v!=value) {
                                sls.remove(i);
                            }
                        }else if(op=='!='){ //所有属性attribute1的值不等于value1的对象
                            //如果属性不存在或者属性值相等 则移除此对象
                            if(v==value) {
                                sls.remove(i);
                            }
                        }else if(op=='^='){ //所有属性attribute1的值以value1开头的对象
                            //如果属性不存在或者属性值为空或者属性值不以表达式值开头 则移除此对象
                            if(v==null || v.indexOf(value)!=0) {
                                sls.remove(i);
                            }
                        }else if(op=='$='){ //所有属性attribute1的值以value1结尾的对象
                            //如果属性不存在或者属性值为空或者属性值不以表达式值结尾 则移除此对象
                            if(v==null || eval('obj.'+getM+'()').lastIndexOf(value)!=(v.length-value.length)) {
                                sls.remove(i);
                            }
                        }else if(op=='*='){ //所有属性attribute1的值包含value1的对象
                            //todo
                        }else if(op=='~='){ //所有属性attribute1的值包含value1（以空格分隔的单词）的对象
                            //todo
                        }
                    }else{ //所有带有attribute1属性的对象
                        //如果不存在attr属性 则将该对象移除
                        if(!obj[getM]){
                            sls.remove(i);
                        }
                    }
                }

            }
        },

        /**
         * 根据伪类过滤
         * sls待过滤集合
         * pseudo
         */
        _pseudoFilter: function(sls, pseudo){
            if(pseudo=='first'){ //第一个对象
                if(sls.size()>0){
                    var o = sls.get(0);
                    sls.clear();
                    sls.add(o);
                }
            }else if(pseudo=='last') { //最后一个对象
                if(sls.size()>0){
                    var o = sls.get(sls.size()-1);
                    sls.clear();
                    sls.add(o);
                }
            }else if(pseudo=='even') { //所有偶数对象

            }else if(pseudo=='odd') { //所有奇数对象

            }else if(pseudo=='hidden') { //所有隐藏的对象

            }else if(pseudo=='visible') { //所有可见的对象

            }
        },

        /**
         * 根据对象id查找
         * return 对象集合
         */
        _getObjectById: function(id) {
            var sls = new wof.util.SelectorList();
            var obj = wof.util.ObjectManager.get(id);
            if(obj!=null && obj.getComponentName()==true){
                sls.add(obj);
            }
            return sls;
        },

        /**
         * 获得所有的对象
         * return 对象集合
         */
        _getAllObjects: function() {
            var sls = new wof.util.SelectorList();
            var oIds = wof.util.ObjectManager.oIds();
            for(var i=0;i<oIds.length;i++){
                var obj = wof.util.ObjectManager.get(oIds[i]);
                if(obj!=null&&obj.getComponentName()==true){
                    sls.add(obj);
                }
            }
            return sls;
        },

        /**
         * 根据类型查找对象
         * return 对象集合
         * 目前是按照短类名查找 并且忽略大小写
         */
        _getObjectByClassName: function(clzName) {
            var sls = new wof.util.SelectorList();
            var tempSls = wof.util.Selector._getAllObjects();
            for(var i=0;i<tempSls.size();i++){
                var obj = tempSls.get(i);
                if((obj.getClassName().substring(obj.getClassName().lastIndexOf('.')+1)).toLowerCase()==clzName.toLowerCase()){
                    sls.add(obj);
                }
            }
            return sls;
        },

        /**
         * 根据属性查找对象
         * return 对象集合
         */
        _getObjectByAttr: function(queryStr) {
            function caption(s){
                var a = s.split('');
                a[0] = a[0].toUpperCase();
                return a.join('');
            }
            var name = queryStr.substring(0,queryStr.indexOf('='));
            var value = queryStr.substring(queryStr.indexOf('=')+1);
            if(value.indexOf('"')==0&&value.lastIndexOf('"')==(value.length-1)){
                value = value.substring(1,value.length-1);
            }
            var getM = 'get'+caption(name);
            var sls = new wof.util.SelectorList();
            var tempSls = wof.util.Selector._getAllObjects();
            for(var i=0;i<tempSls.size();i++){
                var obj = tempSls.get(i);
                if(obj[getM]!=null && eval('obj.'+getM+'()')==value) {
                    sls.add(obj);
                }
            }
            return sls;
        }



    };
}
