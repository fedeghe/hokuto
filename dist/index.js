'use strict';
/*
    *        *
    


               *
        *
        
        
      *  
    

    *



      *

北斗

hokuto v. 0.1.0

with ~46.26KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto = (function (_) {
        
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //libz
    'use strict';
    /*
    SEARCHHASH v1.2.12
    ~2.01KB
    */
    var searchHash=function(){function n(n,t){return JSON.stringify(n)===JSON.stringify(t)&&!e(t)}function t(n){return"string"==typeof n||n instanceof String}function e(n){return n instanceof RegExp}function r(n){var t=String(n)!==n,e=n===Object(n),r="function"!=typeof n,i={}.toString.call(n).match(/\[object\sObject\]/);return t&&e&&r&&!(!i||!i.length)}function i(n){var t={}.toString.call(n).match(/\[object\sArray\]/);return String(n)!==n&&!(!t||!t.length)}function o(n){return n&&"object"==typeof n&&void 0!==n.nodeType&&1===n.nodeType&&"string"==typeof n.nodeName}function u(u,a,f,c){if(!r(a)&&!i(a))throw new Error("BAD PARAM: must search into an object or an array");var l,m=0,y=function(r,i){return t(r)&&e(i)?r.match(i):n(r,i)},s={key:function(n,t,e){return"function"==typeof e?e(n):y(n,e)},value:function(n,t,e){return"function"==typeof e?e(t):y(t,e)},keyvalue:function(n,t,e){return("function"==typeof e.key&&e.key(n)||y(n,e.key))&&("function"==typeof e.value&&e.value(t)||y(t,e.value))}}[u],p=[],g=function(n,t,e,r,i){var o=[].concat.call(n,[t]),u=s(t,r[t],e),f=c.min<=i&&i<=c.max,l=o.length;f&&u&&(p.push({obj:r,value:r[t],key:o[l-1],parentKey:o[l-2],path:o.join("/"),getter:function(){return o.reduce(function(n,t){return n[t]},a)},container:o.slice(0,l-1).join("/"),parentContainer:o.slice(0,l-2).join("/"),regexp:u,level:i}),m++),v(r[t],e,o,i+1)},v=function(n,t,e,r){if(!o(n)){var i,u;if(n instanceof Array)for(i=0,u=n.length;i<u&&(g(e,i,t,n,r),c.limit!==m);i++);else if("object"==typeof n)for(i in n)if(g(e,i,t,n,r),c.limit===m)break}};return c.limit="limit"in c?~~c.limit:1/0,c.min="min"in c?~~c.min:0,c.max="max"in c?~~c.max:1/0,0===c.limit?p:(c.min=c.min<0?0:c.min,c.max<c.min&&(l=c.min,c.min=c.max,c.max=l),v(a,f,[],0),c.sorter?p.sort(c.sorter):p)}return{forKey:function(n,t,e){return u("key",n,t,e||{})},forValue:function(n,t,e){return u("value",n,t,e||{})},forKeyValue:function(n,t,e){return u("keyvalue",n,t,e||{})}}}();"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=searchHash);
    
    //hokuto
    var Hok = {
        W: window,
        _U_: 'undefined',
        WD: window.document,
        H: window.history,
        TYPES: {
            U: 'undefined',
            F: 'function'
        },
        noop: function () {},
        CONFIG:{},
        ns: {},
        dom: {},
        events:{},
        cookie:{},
        history:{},
        i18n:{},
        io: {},
    };
    
    if (typeof Object.assign !== Hok.TYPES.F) {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                'use strict';
                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
    
                var to = Object(target);
    
                for (var i = 1, l = arguments.length; i < l; i++) {
                    var nextSource = arguments[i];
    
                    if (nextSource !== null && nextSource !== undefined)
                        for (var nextKey in nextSource)
                            if ({}.hasOwnProperty.call(nextSource, nextKey))
                                to[nextKey] = nextSource[nextKey];
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
    Hok.ns.make = function(str, obj, ctx) {
        str = str.replace(/^\//, '');
        var els = str.split(/\.|\//),
            l = els.length,
            ret;
    
        // default context window
        (typeof ctx === Hok._U_) && (ctx = Hok.W);
    
        // default object empty
        (typeof obj === Hok._U_) && (obj = {});
    
        // if function
        (typeof obj === 'function') && (obj = obj());
    
        if (!ctx[els[0]]) {
            ctx[els[0]] = (l === 1) ? obj : {};
        }
        ret = ctx[els[0]];
        return (l > 1) ? Hok.ns.make(els.slice(1).join('.'), obj, ctx[els[0]]) : ret;
    };
    Hok.ns.check = function (ns, ctx) {
        // remove stating slash
        ns = ns.replace(/^\//, '');
    
        // get all elements splitting by . or /
        var els = ns.split(/\.|\//),
            l = els.length,
            i = 0;
        ctx = (typeof ctx !== Hok._U_) ? ctx : Hok.W;
    
        if (!ns) {
            return ctx;
        }
    
        for (null; i < l; i += 1) {
            if (typeof ctx[els[i]] !== Hok._U_) {
                ctx = ctx[els[i]];
            } else {
                // break it
                return undefined;
            }
        }
        return ctx;
    };
    Hok.ns.extend = function (ns, objfn) {
        var obj = typeof objfn === 'function' ? objfn() : objfn,
            i;
    
        for (i in obj) {
            if (typeof ns[i] === _U_) {
                ns[i] = obj[i];
            }
        }
    };
    
    
    Hok.CONFIG = {
        AUTHOR: "Federico Ghedina",
        LANG: 'en',
        ENGY: {
            STATS: true,
            MODES: [
                "PRE",
                "LIVE"
            ],
            MODE: 0,
            COMPONENTS: {
                EXT: ".js",
                URL: "/components/",
                NAME_PREPEND: "",
                PATH_SEPARATOR: "/"
            }
        },
        NS: "hokuto",
    
        NAME: "hokuto",
        VERSION: "maltaV('package.version')"
    };
    Hok.object = (function(){
    
        var strMap = function(o, fn) {
                var ret = '',
                    j;
                for (j in o) 
                    if (o.hasOwnProperty(j)) 
                        ret += fn(o, j, ret);
                return ret;
            },
                
    
            // Returns true if it is a DOM node
            isNode = function(o) {
                return  typeof Node === 'object'
                    ? o instanceof Hok.W.Node
                    : o
                        && typeof o === 'object'
                        && typeof o.nodeType === 'number'
                        && typeof o.nodeName === 'string'
            },
    
            extract = function(data, where){                
                var g = where || (
                        typeof global !== 'undefined'
                            ? global
                            : (typeof window !== 'undefined' ? window : this)
                    ), key;
                for (key in data) {
                    if (data.hasOwnProperty(key)) {
                        g[key] = data[key];
                    }
                }
            },
            ret = {
                extract: extract,
                fromQs: function() {
                    var els = document.location.search.substr(1).split('&'),
                        len = els.length,
                        i = 0,
                        tmp,
                        out = [];
    
                    for (null; i < len; i += 1) {
                        tmp = els[i].split('=');
                        // do not override extra path out
                        //
                        !out[tmp[0]] && (out[tmp[0]] = decodeURIComponent(tmp[1]));
                    }
                    return out;
                },
    
                clone: function(obj){
                    var copy,
                        i, l;
                    // Handle the 3 simple types, and null or undefined
                    if (obj === null || typeof obj !== 'object') {
                        return obj;
                    }
    
                    // Handle Date
                    if (obj instanceof Date) {
                        copy = new Date();
                        copy.setTime(obj.getTime());
                        return copy;
                    }
    
                    // Handle Array
                    if (obj instanceof Array) {
                        copy = [];
                        for (i = 0, l = obj.length; i < l; i++) {
                            copy[i] = ret.clone(obj[i]);
                        }
                        return copy;
                    }
    
                    // Handle Object
                    if (obj instanceof Object) {
                        copy = {};
                        for (i in obj) {
                            if (obj.hasOwnProperty(i)) {
                                copy[i] = ret.clone(obj[i]);
                            }
                        }
                        return copy;
                    }
                    throw new Error('Unable to copy obj! Its type isn\'t supported.');
                },
    
                extend: function(o, ext, force) {
                    var obj = ret.clone(o),
                        j;
    
                    for (j in ext) {
                        if (ext.hasOwnProperty(j) && (!(j in obj) || force)) {
                            obj[j] = ext[j];
                        }
                    }
                    return obj;
                },
    
                keyize: function(objArr, k) {
                    var objRet = {},
                        i = 0,
                        l = objArr.length;
                    for (null; i < l; i++) {
                        if (k in objArr[i] && !(objArr[i][k] in objRet)) {
                            objRet[objArr[i][k]] = objArr[i];
                        }
                    }
                    return objRet;
                },
    
                isString: function(o) {
                    return typeof o === 'string' || o instanceof String;
                },
    
                // avoid tags
                jCompare: function(obj1, obj2) {
                    return !isNode(obj1) && typeof JSON !== Hok._U_
                        ? JSON.stringify(obj1) === JSON.stringify(obj2)
                        : obj1 === obj2
                },
    
                toQs: function(obj) {
                    return strMap(
                        obj,
                        function (o, i, r) {
                            return ([
                                r ? '&' : '?',
                                encodeURIComponent(i),
                                '=',
                                encodeURIComponent(o[i])
                            ].join('')).replace(/'/g, '%27');
                        }
                        
    
                    );
                }
            };
    
        return ret;
    })();
    
    Hok.cookie = {
        enabled: true,
        cookie_nocookiesaround: false,
        initCheck: function() {
            return Hok.W.navigator.cookieEnabled;
        },
        set: function(name, value, expires, copath, domain, secure) {
            if (!Hok.cookie.enabled) return false;
            Hok.cookie.cookie_nocookiesaround = false;
            var today = new Date(),
                expiresDate = new Date(today.getTime() + expires);
            // expires && (expires = expires * 1000 * 60 * 60 * 24);
            Hok.WD.cookie = [
                name, '=', Hok.W.escape(value),
                (expires ? ';expires=' + expiresDate.toGMTString() : ''),
                (copath ? ';path=' + copath : ''),
                (domain ? ';domain=' + domain : ''),
                (secure ? ';secure' : '')
            ].join();
            return true;
        },
        del: function(name, path, domain) {
            if (!Hok.cookie.enabled) return false;
            var ret = false;
    
            if (Hok.cookie.get(name)) {
                Hok.WD.cookie = [
                    name, '=',
                    (path ? ';path=' + path : ''),
                    (domain ? ';domain=' + domain : ''),
                    ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
                ].join('');
                ret = true;
            }
            return ret;
        },
        get: function(checkName) {
            var allCookies = Hok.WD.cookie.split(';'),
                l = allCookies.length,
                tempCookie = '',
                cookieName = '',
                cookieValue = '',
                cookieFound = false,
                i = 0;
    
            if (!Hok.cookie.enabled) return false;
    
            for (null; i < l; i += 1) {
                tempCookie = allCookies[i].split('=');
                cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
    
                if (cookieName === checkName) {
                    cookieFound = true;
                    tempCookie.length > 1 && (cookieValue = W.unescape(tempCookie[1].replace(/^\s+|\s+$/g, '')));
                    return cookieValue;
                }
    
                tempCookie = null;
                cookieName = '';
            }
            return cookieFound;
        },
        delall: function() {
            if (!Hok.cookie.enabled) return false;
            var thecookie = Hok.WD.cookie.split(/;/),
                l = thecookie.length,
                i = 0,
                name;
            for (null; i < l; i += 1) {
                name = thecookie[i].split(/=/);
                Hok.cookie.del(name[0], false, false);
            }
            Hok.cookie.cookie_nocookiesaround = true;
            return true;
        },
        getall: function() {
            if (!Hok.cookie.enabled) return false;
            if (Hok.WD.cookie === '') return [];
            return Hok.cookie.cookie_nocookiesaround
                ? []
                : Hok.WD.cookie.split(';').forEach(
                    function(i) {
                        var t = i.split('=');
                        return { name: t[0], value: t[1] };
                    }
                );
        }
    };
    Hok.dom.noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    Hok.dom.setStyle = function(node, styles) {
        if (typeof styles === Hok.TYPES.U)
            throw new Error('ERR: styles needed')
        for (var tmp in styles) {
            if (tmp === 'float') {
                node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
            } else {
                node.style[tmp] = styles[tmp];
            }
        }
    };
    
    Hok.dom.setAttrs = function(node, attrs) {
        if (typeof attrs === Hok.TYPES.U)
            throw new Error('ERR: attrs needed');
        for (var tmp in attrs) {
            if (Hok.dom.noAttrs.indexOf(tmp) < 0)
                node.setAttribute(tmp, attrs[tmp]);
        }
    };
    
    Hok.dom.unsetAttrs = function(node, attrs) {
        if (typeof attrs === Hok.TYPES.U)
            throw new Error('ERR: attrs needed');
        for (var tmp in attrs) {
            Hok.dom.noAttrs.indexOf(tmp) < 0
            && node.removeAttribute(tmp, attrs[tmp]);
        }
    };
    
    Hok.dom.setData = function(node, data) {
        if (typeof data === Hok.TYPES.U)
            throw new Error('ERR: data needed');
        for (var tmp in data) {
            node.dataset[tmp] = data[tmp];
        }
    };
    
    Hok.dom.setClass = function(node, data) {
        data.split(',').forEach(function (cls){
            node.classList.add(cls);
        });
    };
    
    Hok.dom.unsetData = function(node, data) {
        if (typeof data === Hok.TYPES.U)
            throw new Error('ERR: data needed');
        for (var tmp in data) {
            delete node.dataset[tmp];
        }
    };
    
    Hok.dom.remove = function(el) {
        return el.parentNode && el.parentNode.removeChild(el);
    };
    
    //TODO
    Hok.dom.filterHtml = function(html) {
        return '' + html;
    };
    
    Hok.dom.setText = function(node, text) {
        node.appendChild(document.createTextNode(text));
    };
    
    Hok.dom.setHtml = function(node, html) {
        node.innerHTML = Hok.dom.filterHtml(html);
    };
    
    Hok.io = (function (){
    
        function get(uri, onSuccess, onError){
            return fetch(uri)
                .then(function (response){
                    if(!response.ok){
                        onError()
                        return Promise.reject()
                    }
                    return response
                })
                .then(function(v){
                    return v.text()
                })
                .then(onSuccess)
        }
    
        function getJson(uri, onSuccess, onError) {
            return fetch(uri)
                .then(function (response) {
                    if(!response.ok){
                        onError()
                        return Promise.reject()
                    }
                    return response
                })
                .then(function(j){
                    return j.json()
                })
                .then(onSuccess)
                .catch(onError)
        }
    
        function getXML(uri, onSuccess, onError) {
            //'https://codetogo.io/api/users.xml'
            return fetch(uri)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(function(xmlText){
                    var parser = new DOMParser();
                    return parser.parseFromString(xmlText,'text/xml');
                })
                .then(onSuccess)
                .catch(onError); 
        }
    
        return {
            get: get,
            getJson: getJson,
            getXML: getXML
        };
    })();
    Hok.events._ = {
        events: {
            getElementDeterminant: function(el) {
                const tname = el.tagName;
                return (tname.match(/input|textarea|select/i)) ? 'value' : 'innerHTML';
            },
            getElementEvent: function(el) {
                const tname = el.tagName;
                return (tname.match(/input|textarea/i)) ? 'input' : 'change';
            }
        },
        unhandlers: {},
        bindErr: function(v) {return 'No straight way to '+(v ? '' : 'un')+'}bind an event'}
    };
    
    Hok.events.saveUnhandler = function(el, f) {
        Hok.events._.unhandlers[el] = Hok.events._.unhandlers[el] || [];
        Hok.events._.unhandlers[el].push(f);
    };
    
    Hok.events.unhandle = function(el) {
        Hok.events._.unhandlers[el] && Hok.events._.unhandlers[el].forEach(function(unhandler) {
            unhandler();
        });
        Hok.events._.unhandlers = [];
    };
    
    Hok.events.on = (function() {
        function unhandle(el, evnt, cb) {
            Hok.events.saveUnhandler(el, function() {
                Hok.events.off(el, evnt, cb);
            });
        }
        if ('addEventListener' in Hok.W) {
            return function(el, evnt, cb, capture) {
                capture = capture || false
                el.addEventListener.apply(el, [evnt, cb, capture]);
                unhandle(el, evnt, cb);
            };
        } else if ('attachEvent' in Hok.W) {
            return function(el, evnt, cb) {
                el.attachEvent.apply(el, ['on' + evnt, cb]);
                unhandle(el, evnt, cb);
            };
        } else {
            return function() {
                throw new Error(Hok.events._.bindErr(1));
            };
        }
    })();
    
    Hok.events.off = (function() {
        if ('removeEventListener' in Hok.W) {
            return function(el, evnt, cb) {
                el.removeEventListener(evnt, cb);
            };
        } else if ('detachEvent' in Hok.W) {
            return function(el, evnt, cb) {
                el.detachEvent.apply(el, ['on' + evnt, cb]);
            };
        } else {
            return function() {
                throw new Error(Hok.events._.bindErr(0));
            };
        }
    })();
    
    Hok.events.kill = function(e) {
        if (!e) {
            e = Hok.W.event;
            e.cancelBubble = true;
            e.returnValue = false;
        }
        'stopPropagation' in e && e.stopPropagation();
        e.preventDefault();
        return false;
    };
    
    Hok.events.once = function(el, evnt, cb) {
        Hok.events.on(el, evnt, function _(e) {
            cb.call(el, e)
            Hok.events.off(el, evnt, _)
        });
    };
    
    Hok.events.eventTarget = function(e) {
        e = e || Hok.W.event;
        var targetElement =
            e.currentTarget
            || (typeof e.target !== Hok.TYPES.U) ? e.target : e.srcElement;
        if (!targetElement) {
            return false;
        }
        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
            targetElement = targetElement.parentNode;
        }
        return targetElement;
    };
    
    Hok.events.noEvents = function (el, fn, t) {
        t = t || 3000;
        fn = fn || function(){};
        var to;
        function inner (e) {
            to && window.clearTimeout(to);
            to = window.setTimeout(function () {
                fn(e);
            }, t);
        }
        Hok.events.on(el, 'mousemove', inner);
        Hok.events.on(el, 'click', inner);
        Hok.events.on(el, 'touchstart', inner);
    };
    
    Hok.events.ready = (function() {
        var comp = 'complete',
            readyStateCheckInterval = setInterval(function() {
                if (document.readyState === comp) {
                    clearInterval(readyStateCheckInterval);
                    for (i = 0, l = cb.length; i < l; i++) {
                        cb[i].call(this);
                    }
                }
            }, 10),
            cb = [],
            i, l;
            
        return function(c) {
            if (document.readyState === comp) {
                c.call(this);
            } else {
                cb.push(c);
            }
        };
    })();
    
    
    
    Hok.history = (function(){
        var handlers = [],
            spread = function(url, state, title) {
                document.title = title;
                return handlers.forEach(
                    function(handler){
                        handler(url, state, title);
                    }
                );
            };
        return {
            push: function(url, state, title) {
                Hok.H.pushState(state || {}, title || '', url);
                spread(url, state, title);
            },
            registerHandler: function(f) {return handlers.push(f)},
            replace: function(url, state, title) {
                Hok.H.replaceState(state || {}, title || '', url);
                spread(url, state, title);
            },
            back: function() {
                Hok.H.back();
            },
            resetHandlers: function(){
                handlers = [];
            },
            state: function() { return Hok.H.state; }
        };
    })();
    Hok.i18n = (function(){
        var data = {},
            RX_LANG = /i18n\(([^}|]*)?\|?([^}]*)\)/;
        return {
                lang: Hok.CONFIG.LANG,
                switchLang: function(lang){
                    Hok.i18n.lang = lang;
                },
                check: function(lab){ return lab.match(RX_LANG)},
                dynamicLoad: function(lo, _label) {
                    var lang = Hok.i18n.lang
                    for (_label in lo) {
                        lang in lo[_label] && (data[_label] = lo[_label][lang]);
                    }
                },
                get: function(k, fallback) {return  Hok.ns.check(k, data) || fallback || 'no Value'},
                load: function(dict) { data = dict;},
                parse: function(obj){
                    var replacing = searchHash.forValue(obj, RX_LANG),
                        l = replacing.length,
                        mayP, ref, i = 0, r;
                    for (null; i < l; i++) {
                        r = replacing[i];
                        if ((typeof r.regexp).match(/boolean/i)) continue;
                        
                        mayP = Hok.i18n.check(r.regexp[0]);
                        
                        if (mayP) {
                            ref = Hok.ns.check(r.container, obj);
                            ref[r.key] = r.value.replace(mayP[0], Hok.i18n.get(mayP[1], mayP[2]));
                        }
                    }
                }
            };
    })();
    
    
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
                cback,
                computeStats = Hok.CONFIG.ENGY.STATS;
            return new Promise(function(resolve, reject){
                (function solve() {
                    var component = searchHash.forKey(
                            self.content,
                            'component', { limit: 1 }
                        ),
                        componentName,
                        cached, preLoaded,
                        xhrStart = 0,
                        xhrEnd = 0;
        
                    if (!component.length) {
                    
                        end = +new Date();
                        self.stats.time = end - start;
                        self.stats.elements = elementsN;
                        self.stats.requested = requested;
                        self.stats.xhrTot = xhrTot;
                        resolve(self.content, {});
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
                            // before merging the object check for the presence of parameters
                            /*
                            if (params) {
                                // check if into the component are used var placeholders
                                usedParams = searchHash.forValue(obj, PARAMETERS_RX);
                                l = usedParams.length;
                                if (l) {
                                    for (i = 0; i < l; i++) {
                                        // check if the label of the placeholder is in the params
                                        foundParam = Hok.ns.check(usedParams[i].regexp[1], params);
                                        // in case use it otherwise, the fallback otherwise cleanup
                                        foundParamValue = typeof foundParam !== Hok._U_ ? foundParam : (usedParams[i].regexp[2] || '');
                                        // string or an object?
                                        if ((typeof foundParamValue).match(/string/i)) {
                                            foundParamValueReplaced = Hok.ns.check(usedParams[i].path, obj)
                                                .replace(usedParams[i].regexp[0], foundParamValue);
                                        }
                                        _overwrite(obj, usedParams[i].path, foundParamValueReplaced || foundParamValue);
                                    }
                                }
                            }*/
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
                            
                            resolve(self.content, computeStats && self.stats);
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
                // resolve(self.content);
            });
        };
    
    
    
        return function(cnf) {
            return new Processor(cnf).parse();
        }
    })();
    var resolutive = function () {
        return Promise.resolve();
    };
    var isDefined = function (x){return typeof x !== Hok.TYPES.U};
    var isFunction = function (f){return typeof f === Hok.TYPES.F};
    
    function Knot(config, clearTarget) {
        this.config = config;
        this.clearTarget = clearTarget;
        this.rendered = !!config.rendered;
        this.frag = document.createDocumentFragment();
        this.target = this.config.target || document.body;
        this.children = this.config.children || [];
        this.childrenKnots = [];
    
        this.debt = ~~(this.children.length);
        this.solved = this.debt === 0;
        this.cb = this.config.cb || resolutive;
        this.parentKnot = this.config.parentKnot || null;
        this.rootKnot = this.config.rootKnot || this;
        this.initCheck = this.config.initCheck || resolutive;
        this.abort = this.config.abort || resolutive;
        this.aborted = false;
        this.ender = false;
        this.state = 'state' in config ? config.state : {};
        
        this.nodes = config.nodes || this.rootKnot.nodes;
        this.rootNodeUnhandlersCollector = [];
        this.unhandlers = {};
        
        this.abort.call(this).then().catch(function (){
            self.rootKnot.aborted = true;
        });
    
        this.initTag();
        this.initialize();
    }
    Knot.prototype.initTag = function(){
        this.tag = this.config.tag || 'div';
        this.node = this.config.ns ?
            document.createElementNS(this.config.ns, this.tag) :
            document.createElement(this.tag);
    };
    Knot.prototype.initialize = function(){
        this.setCall('Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
        if(
            isDefined(this.config[Knot.identifier]) &&
            !isDefined(this.config.nodes[this.config[Knot.identifier]])
        ) this.nodes[this.config[Knot.identifier]] = this;
    };
    Knot.prototype.initRerender = function(){
        this.setCall('Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
        if(
            isDefined(this.config[Knot.identifier]) &&
            !isDefined(this.config.nodes[this.config[Knot.identifier]])
        ) this.nodes[this.config[Knot.identifier]] = this;
        this.cb && this.cb.call(this);
    
        this.childrenKnots.forEach(function (childrenKnot) {
            childrenKnot.initRerender();
        }) 
    };
    
    /**
     * SETTERS 
     */
    
    /**
     * 
     * @param {*} state 
     */
    Knot.prototype.setState = function(state) {
        if (isDefined(state)){
            for (var i in o) {
                if (o.hasOwnProperty(i)) {
                    this.state[i] = o[i];
                }
            }
        } else {
            var statePassed = 'state' in this.config,
                state = statePassed ? this.config.state : {};
    
            this.state = isFunction(state) ?
                state.call(this) :
                state;
        }
        return this
    };
    Knot.prototype.setState = function(o) {
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                this.state[i] = o[i];
            }
        }
    };
    
    Knot.prototype.setCall = function(fns) {
        var self = this;
        fns.split(/,/).forEach(function(f) {
            self['set' + f]()
        })
    };
    
    Knot.prototype.lateKid = function(id) {
        if (!(id in this.nodes)) {
            this.nodes[id] = this;
        } else {
            consolw.warn('node already present by "'+Knot.byIdIdentifier+'"')
        }
    };
    
    
    
    Knot.prototype.setByRef = function() {
        if(Knot.byIdIdentifier in this.config) {
            var ref = this.config[Knot.byIdIdentifier]
            this.nodes[ref] = this;
        }
    };
    Knot.prototype.getByRef = function(ref) {
        return ref in this.nodes
            ? this.nodes[ref]
            : null
    };
    Knot.prototype.setRef = function(ref, ctx) {
        // allow the node to set a ref on itself
        // or to another node it can reference
        if (ref) {
            (ctx || this).nodes[ref] = ctx || this
                // or incase is in the config, just set it
        } else if (isDefined(this.config.ref)) {
            this.nodes[this.config.ref] = this;
        }
    };
    
    Knot.prototype.setClassname = function() {
        this.config.className && Hok.dom.setClass(this.node, this.config.className);
    };
    
    Knot.prototype.setStyle = function(style) {
        if (style) {
            this.config.style = Object.assign({}, this.config.style, style)
        }
        this.config.style && Hok.dom.setStyle(this.node, this.config.style);
    };
    
    Knot.prototype.setAttrs = function(attrs) {
        var a = isFunction(this.config.attrs)
            ? this.config.attrs.call(this)
            : this.config.attrs;
        if (attrs) {
            a = Object.assign({}, a, attrs)
        }
        this.config.attrs && Hok.dom.setAttrs(this.node, a);
    };
    
    Knot.prototype.setData = function(data) {
        if (data) {
            this.config.data = Object.assign({}, this.config.data, data)
        }
        if (this.config.data) {
            this.data = this.config.data;
            Hok.dom.setData(this.node, this.data);
        }
    };
    
    Knot.prototype.setText = function(text) {
        if (isDefined(text)) this.config.text = text;
        isDefined(this.config.text)
            && Hok.dom.setText(this.node, this.config.text);
    };
    
    Knot.prototype.setHtml = function(html) {
        if (isDefined(html)) this.config.html = html;
        if(isDefined(this.config.html)) {
            
            if(isFunction(this.config.html)){
                Hok.dom.setHtml(this.node, this.config.html.call(this));
            } else {
                Hok.dom.setHtml(this.node, this.config.html);
            }
        }
    };
    
    Knot.prototype.setMethods = function() {
        var self = this,
            keys = Object.keys(this.config),
            tmp;
        keys.forEach(function(k){
            tmp = k.match(/^method_(\w*)$/i);
            if (tmp) {
                if (!(tmp[1] in self)) {
                    self['_' + tmp[1]] = self.config[tmp[0]].bind(self);
                } else {
                    console.warn('[WARNING] : method \'' + tmp[0] + '\' cant be added, would override existing element.')
                }
            }
        });
    };
    
    Knot.prototype.setEvents = function() {
        var self = this,
            mat, ev, i;
        self.unhandlers = {};
    
        for (i in self.config) {
            mat = i.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/);
            if (mat) {
                ev = mat[3].toLowerCase();
                (function(eventName) {
                    var handler = function (e){return self.config[eventName].call(self, e);};
                    Hok.events[mat[1]](
                        self.node,
                        ev,
                        handler
                    );
                    self.unhandlers[ev] = handler;
                })(i);
            }
        }
        this.unhandleEvents = function () {
            Object.entries(self.unhandlers).forEach(function (entry) {
                Hok.events.off(self.node, entry[0], entry[1]);
            });
            return self;
        };
        this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents);
        return this;
    };
    
    Knot.prototype.unhandle = function(eventType){
        var self = this;
        self.unhandlers = Object.entries(self.unhandlers).reduce(function (acc, entry){
            if(entry[0] === eventType){
                Hok.events.off(self.node, entry[0], entry[1]);
            } else {
                acc[entry[0]] = entry[1];
            }
            return acc;
        }, {});
    };
    
    Knot.prototype.setEnd = function(e) {
        const self = this;
        if(!this.rendered && 'end' in this.config && isFunction(this.config.end)){
            this.ender = self.config.end.call(self);
        }
        return this;
    };
    
    Knot.prototype.render = function(){
        var self = this;
        if (this.rendered) {
            this.initRerender();
        } else {
            this.frag.appendChild(this.node);
            if (this.debt) {
                return this.children.reduce(function (p, children) {
                    var c = Object.assign(
                            {rendered: self.rendered},
                            children,
                            {
                                target: self.node,
                                parentKnot: self,
                                rootKnot: self.rootKnot,
                            }
                        ),
                        newChild = new Knot(c);
                    self.childrenKnots.push(newChild);
                    return p.then(function () { return newChild.render();});
                }, Promise.resolve()).then(function(){return self;});
            } else {
                return this.initCheck.call(this).then(function () {
                    if(self.clearTarget && !self.rendered){
                        self.target.innerHTML = '';
                    }
                    self.cb.call(self).then(function() {
                        if(!self.aborted){
                            if(!self.rendered) self.target.appendChild(self.frag);
                            self.rendered = true;
                        }
                        return self
                    }).catch(function(){
                        console.log('cant render: ', self);
                    });
                }).then(function(){
                    if(self.parentKnot){
                        self.parentKnot.solve();
                    }
                    return self;
                }).catch(function(){
                    self.frag.removeChild(self.node);
                })
            }
        }
        
        return Promise.resolve(this);
    };
    
    Knot.prototype.clear = function(){
        if(this.ender) this.ender();
        this.target.removeChild(this.node);
        this.unhandleEvents();
    };
    Knot.prototype.solve = function(){
        if(this.debt > 0){
            this.debt--;
        }
        if(this.debt <= 0) {
            this.solved = true;
            this.render();
        }
    };
    Knot.prototype.report = function() {
        const  jsonSize = JSON.stringify(this.config).length,
            htmlSize = this.node.innerHTML.length;
        return (htmlSize / jsonSize).toFixed(2) + " (html:" + htmlSize + " / json:" + jsonSize + ")"
    };
    
    Knot.isknot = function(n){return n instanceof Knot};
    Knot.identifier = 'id';
    Knot.byIdIdentifier = 'ref';
    //+++++++++++++++++++++++++++++++++++++++++++++++

    var __renders = {};
    var __nodes = {};
    function render(cnf, clear, name) {
        return Hok.solve(cnf).then(function (config, stats){
            if(!('target' in config)){
                config.target = document.currentScript.parentNode;
            }
            config.endFunctions = [];
            // config.saveKnotRef = function (id, knot) {
            //     __nodes[id] = knot;
            // };
            config.nodes = __nodes;
            return new Knot(config, clear).render().then(function (n) {
                if (name){
                    __renders[name] = n;
                }
                return n;
            }).catch(function (r){
                console.log({r : r});
            });
            // .finally(function () {
            //     console.log(config.endFunctions);
            // });
        }).catch(function (r){
            console.log({r:r});
        });
   
    }

    function get(cnf){
        var factual = document.createElement('div'),
            knot;
        cnf.target = factual;
        knot = render(cnf);
        return knot;
    }

    return {
        io: Hok.io,
        i18n: Hok.i18n,
        dom: Hok.dom,
        events: Hok.events,
        render: render,
        get: get,
        getKnotById: function(id){
            return id in __nodes
                ? __nodes[id]
                :null
        },
        getElement: function(n){return n in __renders ? __renders[n] : false},
        getElements: function() {return  __renders},
    };
})(window);
(typeof exports === 'object') && (module.exports = hokuto);