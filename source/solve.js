Hok.solve = (function() {
    var _clone = function(obj){
            if (obj == null || typeof obj !== 'object') {
                return obj;
            }
            var copy = obj.constructor(),
                attr;
            for (attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
            }
            return copy;
        },
        _overwrite = function(destObj, path, obj){
            // path can be
            // str1
            // str1/str2[/str3[...]] (or str1.str2[.str3])
            //
            // in any case we need the elements of it
            //
            var pathEls = path.split(/\.|\//),
                l = pathEls.length,
                i = 0;
        
            // in case path has more than one element in the split result
            // like
            // aaa/bbb/ccc/ddd
            // dig destObj to destObj.aaa.bbb.ccc
            //
            while (i < l - 1) destObj = destObj[pathEls[i++]];
        
            // now the object is inserted
            //
            destObj[pathEls[l - 1]] = obj;
        },
        _mergeComponent = function(ns, path, o){

            var componentPH = Hok.ns.check(path, ns),
                // start from the replacement
                merged = Object.assign({}, o),
                i;
        
            // copy everything but 'component' & 'params', overriding
            //
            for (i in componentPH) {
                !(i.match(/component|params/)) && (merged[i] = componentPH[i]);
            }
            if(o.protected) { 
                _overwrite(ns, path, o);
            } else {
                _overwrite(ns, path, merged);
            }
        };
    
    
    
    var components = {},
        preloadedComponents = {},
        computeStats = Hok.CONFIG.ENGY.STATS,
        PARAMETERS_RX = /\${([^}|]*)?\|?([^}]*)}/,
        cmp404 = function(componentName) {return JSON.stringify({
            tag: 'div',
            style:{
                border:'1px solid red',
                backgroundColor:'pink',
                color:'red',
                padding:'10px'
            },
            html: 'no component found ('+componentName+')',
            protected: true
        })};
    
    
    function Processor(content) {
        this.content = content;
        this.stats = {};
        var engy = content.engy;
        this.config = {
            fileNameSeparator: engy && engy.fileNameSeparator
                ? engy.fileNameSeparator
                : Hok.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,
            fileNamePrepend: engy && engy.fileNamePrepend
                ? engy.fileNamePrepend
                : Hok.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,
            ext: engy && engy.ext
                ? engy.ext
                : Hok.CONFIG.ENGY.COMPONENTS.EXT,
            componentsUrl: engy && engy.componentsUrl 
                ? engy.componentsUrl
                : Hok.CONFIG.ENGY.COMPONENTS.URL
        };
    }

    
    Processor.prototype.getFileName = function (n) {
        var els = n.split(/\/|\|/),
            res = n,
            engyConf = this.config,
            len = els.length - 1;

        els[len] = engyConf.fileNamePrepend + els[len];
        res = els.join(engyConf.fileNameSeparator);

        return [
            engyConf.componentsUrl,
            engyConf.componentsUrl.match(/\/$/) ? '' : '/',
            res,
            engyConf.ext
        ].join('');
    };
    Processor.prototype.resetStats = function () {
        this.stats = {
            time: 0,
            elements: 0,
            requested: {},
            xhrTot: 0
        }
    };
    Processor.prototype.parse = function () {
        var self = this,
            langFunc = Hok.i18n.parse,
            elementsN = 0,
            start = +new Date(),
            end,
            xhrTot = 0,
            requested = {},
            cback;
        return new Promise(function(resolve, reject){
            (function solve() {
                
                var component = searchHash.forKey(
                        self.content,
                        'component', { limit: 1 }
                    ),
                    componentName,
                    cached, preLoaded,
                    xhrStart = 0,
                    xhrEnd = 0,
                    trackEnd = function() {
                        end = +new Date();
                        self.stats.time = end - start;
                        self.stats.elements = elementsN;
                        self.stats.requested = requested;
                        self.stats.xhrTot = xhrTot;
                    };
                
                if (!component.length) {
                    trackEnd();
                    langFunc && langFunc(self.content);
                    resolve([self.content]);
                } else {
                    component = component[0];
                    componentName = self.getFileName(component.value);
                    if (component.value in requested) {
                        requested[component.value]++;
                    } else {
                        requested[component.value] = 1;
                        elementsN++;
                    }
                    cached = componentName in components;
                    preLoaded = componentName in preloadedComponents;
    
                    cback = function(cntORobj){
                        debugger
                        xhrEnd = +new Date();
                        xhrTot += xhrEnd - xhrStart;
                        var params = Hok.ns.check(component.container + '/params', self.content),
                            obj;
                            // usedParams, foundParam,
                            // foundParamValue, foundParamValueReplaced,
                            // i, l;
                            
                        if (preLoaded) {
                            obj = _clone(cntORobj);
                        } else {
                            if (!cached) {
                                components[componentName] = _clone(cntORobj);
                            }
                            var evaluator = eval('(function (){return '+cntORobj+';})()');
                            obj = evaluator(params);
                        }
                        if (component.container) {
                            _mergeComponent(self.content, component.container, obj);
                        } else {
                            if(obj.protected) {
                                self.config = Object.assign({}, self.config, obj);
                            } else {    
                                self.config = Object.assign({}, obj, self.config);
                            }
                            self.content = Object.assign({}, obj, self.content);
                            delete self.content.component;
                            delete self.content.params;
                        }
                        
                        langFunc && langFunc(self.content);
                        trackEnd();
                        
                        resolve([self.content, computeStats && self.stats]);
                        solve();
                    };
                    xhrStart = +new Date();
                    // cached?
                    if (preLoaded) {
                        cback(preloadedComponents[componentName]);
                    } else if (cached) {
                        cback(components[componentName]);
                    } else {
                        Hok.io.get(componentName, cback, function(e) {
                            cback(cmp404(componentName))
                        });
                    }
                }
            })();
        });
    };
    function report (stats) {
        var j, ln = new Array(37).join('-'), cl = console.log;

        cl(ln);
        cl(['Hokuto used', stats.elements, 'component' + (stats.elements === 1 ? '' : 's')].join(' '));
        cl('usage: ');
        for (j in stats.requested) {
            cl(['•', j, ':', stats.requested[j], 'time' + (stats.requested[j] > 1 ? 's' : '')].join(' '));
        }
        cl(['total time:',
            stats.time+'ms'
        ].join(' '));
        cl(['◦ unfolding:',
            (stats.time - stats.xhrTot)+'ms'
        ].join(' '));
        cl(['◦ xhr:',
            stats.xhrTot+'ms'
        ].join(' '));
        cl(ln);
    }

    return function(cnf) {
        return new Processor(cnf).parse()
        .then(
            function(res){
                if (computeStats && res.length > 1 ) {
                    report(res[1]);
                }
                return res
            }
        );
        
        
        
    }
})();