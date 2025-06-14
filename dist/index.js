'use strict';
/*
    *        *
    


               *
        *
        
        
      *  
    

    *



      *

北斗

hokuto v. 0.0.20

with ~54.43KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
// eslint-disable-next-line no-unused-vars
var hokuto = (function (_) {
        
    // define internal object to publish from
    // Hok
    /*
    [Malta] core.js
    */
    // eslint-disable-next-line no-unused-vars
    var Hok = {
        W: _,
        _U_: 'undefined',
        WD: _.document,
        H: _.history,
        TYPES: {
            U: 'undefined',
            F: 'function'
        },
        noop: function () {},
        CONFIG:{},
        ns: {},
        dom: {},
        events:{},
        // cookie:{},
    
        history:{},
        i18n:{},
        io: {},
        utils: {},
    };
    ;
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // libz start
    /*
    [Malta] searchhash.js
    */
    // ignore since 💯 https://www.npmjs.com/package/searchhash
    /* istanbul ignore next */
    (function (ctx){
        /*
        [Malta] ../node_modules/searchhash/dist/index.js
        */
        'use strict';
        /*
        SEARCHHASH v1.2.12
        ~2.01KB
        */
        var searchHash=function(){function n(n,t){return JSON.stringify(n)===JSON.stringify(t)&&!e(t)}function t(n){return"string"==typeof n||n instanceof String}function e(n){return n instanceof RegExp}function r(n){var t=String(n)!==n,e=n===Object(n),r="function"!=typeof n,i={}.toString.call(n).match(/\[object\sObject\]/);return t&&e&&r&&!(!i||!i.length)}function i(n){var t={}.toString.call(n).match(/\[object\sArray\]/);return String(n)!==n&&!(!t||!t.length)}function o(n){return n&&"object"==typeof n&&void 0!==n.nodeType&&1===n.nodeType&&"string"==typeof n.nodeName}function u(u,a,f,c){if(!r(a)&&!i(a))throw new Error("BAD PARAM: must search into an object or an array");var l,m=0,y=function(r,i){return t(r)&&e(i)?r.match(i):n(r,i)},s={key:function(n,t,e){return"function"==typeof e?e(n):y(n,e)},value:function(n,t,e){return"function"==typeof e?e(t):y(t,e)},keyvalue:function(n,t,e){return("function"==typeof e.key&&e.key(n)||y(n,e.key))&&("function"==typeof e.value&&e.value(t)||y(t,e.value))}}[u],p=[],g=function(n,t,e,r,i){var o=[].concat.call(n,[t]),u=s(t,r[t],e),f=c.min<=i&&i<=c.max,l=o.length;f&&u&&(p.push({obj:r,value:r[t],key:o[l-1],parentKey:o[l-2],path:o.join("/"),getter:function(){return o.reduce(function(n,t){return n[t]},a)},container:o.slice(0,l-1).join("/"),parentContainer:o.slice(0,l-2).join("/"),regexp:u,level:i}),m++),v(r[t],e,o,i+1)},v=function(n,t,e,r){if(!o(n)){var i,u;if(n instanceof Array)for(i=0,u=n.length;i<u&&(g(e,i,t,n,r),c.limit!==m);i++);else if("object"==typeof n)for(i in n)if(g(e,i,t,n,r),c.limit===m)break}};return c.limit="limit"in c?~~c.limit:1/0,c.min="min"in c?~~c.min:0,c.max="max"in c?~~c.max:1/0,0===c.limit?p:(c.min=c.min<0?0:c.min,c.max<c.min&&(l=c.min,c.min=c.max,c.max=l),v(a,f,[],0),c.sorter?p.sort(c.sorter):p)}return{forKey:function(n,t,e){return u("key",n,t,e||{})},forValue:function(n,t,e){return u("value",n,t,e||{})},forKeyValue:function(n,t,e){return u("keyvalue",n,t,e||{})}}}();"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=searchHash);;
        ctx.searchHash = searchHash;
    })(Hok);
    ;
    /*
    [Malta] channeljs.js
    */
    // ignore since 💯 https://www.npmjs.com/package/@fedeghe/channeljs
    /* istanbul ignore next */
    (function (ctx){
        /*
        [Malta] ../node_modules/@fedeghe/channeljs/dist/index.js
        */
        'use strict';
        /*
        
        C H A N N E L J S  v.1.2.10
        
        Date: 21/1/2024
        Size: ~1.94KB
        Author: Federico Ghedina <federico.ghedina@gmail.com>
        */
        var Channeljs=function(){"use strict";var t={},i=function(t,i){return t.indexOf(i)},s=function(){this.topic2cbs={},this.lateTopics={},this.enabled=!0},e=function(t,i){var s=t.enabled
        ;return t.enabled=i,s!==t.enabled},n=s.prototype;return n.enable=function(){return e(this,!0)},n.disable=function(){return e(this,!1)},n.pub=function(t,i){var s,e=0,n=[]
        ;if(i instanceof Array||(i=[i]),!(t in this.topic2cbs&&this.enabled))return t in this.lateTopics?this.lateTopics[t].push({args:i}):this.lateTopics[t]=[{args:i}],null;if("*"in this.topic2cbs)for(e=0,
        s=this.topic2cbs["*"].length;e<s;e+=1)n.push(this.topic2cbs["*"][e].apply(null,i));for(e=0,s=this.topic2cbs[t].length;e<s;e+=1)n.push(this.topic2cbs[t][e].apply(null,i));return n},
        n.sub=function(t,i,s){var e,n=0,c=[];if(t in this.topic2cbs&&this.enabled||(this.topic2cbs[t]=[]),this.topic2cbs[t].push(i),s&&t in this.lateTopics){for(n=0,
        e=this.lateTopics[t].length;n<e;n++)c.push(i.apply(null,this.lateTopics[t][n].args));return c}},n.unsub=function(t,s){var e=0
        ;return t in this.topic2cbs&&(e=i(this.topic2cbs[t],s))>=0&&this.topic2cbs[t].splice(e,1)&&0===this.topic2cbs[t].length&&delete this.topic2cbs[t],t in this.lateTopics&&delete this.lateTopics[t],this},
        n.once=function(t,i,s){function e(){return n.unsub(t,e),i.apply(null,Array.prototype.slice.call(arguments,0))}var n=this;return this.sub(t,e,s)},n.reset=function(){
        var t=Array.prototype.slice.call(arguments,0),i=t.length,s=0;if(!i)return this.topic2cbs={},this.lateTopics={},this;for(null;s<i;s+=1)t[s]in this.topic2cbs&&delete this.topic2cbs[t[s]],
        t[s]in this.lateTopics&&delete this.lateTopics[t[s]];return this},{getChannels:function(i){var s,e={};if("boolean"==typeof i)for(s in t)t[s].enabled===i&&(e[s]=t[s]);else e=t;return e},
        get:function(i){return i in t||(t[i]=new s),t[i]}}}();"object"==typeof exports&&(module.exports=Channeljs);;
        ctx.channeljs = Channeljs;
    })(Hok);
    ;
    /*
    [Malta] io.js
    */
    // ignore since 💯 https://www.npmjs.com/package/rexhr
    /* istanbul ignore next */
    (function (ctx){
        /*
        [Malta] ../node_modules/rexhr/dist/index.js
        */
        'use strict';
        /*
                              .__           
        _______   ____ ___  __|  |_________ 
        \_  __ \_/ __ \\  \/  /  |  \_  __ \
         |  | \/\  ___/ >    <|   Y  \  | \/
         |__|    \___  >__/\_ \___|  /__|   
                     \/      \/    \/
        
        v. 0.0.13  
        
        Federico Ghedina <fedeghe@gmail.com>  
        
        ~1.97KB of ❤️‍🔥   
        
        
        */
        var rexhr={};!function(e,t){var n=function(){},o=function(e,t){var n=Object.assign({},e);for(var o in t)t.hasOwnProperty(o)&&(n[o]=t[o]);return n},r=function(e){
        var r=e.url,a=e.timeout||0,s=e.user||null,d=e.password||null,i=e.responseType,p=e.contentType,u=e.body||null,l=e.method,c=e.onCompleted||n,T=e.onLoad||n,f=e.onError||n,m=e.onAbort||n,E=e.onProgress||n,L=e.onLoadend||n,h=e.onLoadstart||n,y=e.onTimeout||n,v=e.headers||{},w=!!e.withCredentials,x=new XMLHttpRequest,C=!1
        ;x.responseType=i,x.withCredentials=w,x.timeout=a||null,x.addEventListener("load",T),x.addEventListener("progress",E),x.addEventListener("error",f),x.addEventListener("timeout",y),
        x.addEventListener("abort",m),x.addEventListener("loadend",function(){L(x)}),x.addEventListener("loadstart",function(){h(x)}),x.onreadystatechange=function(){if(x.readyState===XMLHttpRequest.DONE){
        var e=x.status;(0===e||e>=200&&e<400)&&(!C&&c(x),C=!0)}},"application/xml"===p&&x.overrideMimeType("text/xml"),u&&(v=o(v,{"X-Requested-With":"XMLHttpRequest"}),
        t.FormData&&u instanceof t.FormData||(v=o(v,{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"})),u=new URLSearchParams(u)),x.open(l,r,!0,s,d);for(var g in v)x.setRequestHeader(g,v[g])
        ;return x.send(u),x};e.getJson=function(e){return r(o(e,{method:"GET",responseType:"json",contentType:"application/json"}))},e.getXML=function(e){return r(o(e,{method:"GET",responseType:"document",
        contentType:"application/xml"}))},"GET POST PUT PATCH DELETE HEAD OPTIONS TRACE CONNECT".split(/\s/).forEach(function(t){e[t.toLowerCase()]=function(e){return r(o({method:t,responseType:"text"},e))}})
        }(rexhr,"undefined"!=typeof global?global:window),"object"==typeof exports&&(module.exports=rexhr);;
        ctx.get = rexhr.get;
        ctx.getJson = rexhr.getJson;
        ctx.getXML = rexhr.getXML;
        ctx.post = rexhr.post;
    })(Hok.io);
    ;
    // libz end
    
    //hokuto
    /*
    [Malta] utils.js
    */
    (function(ctx){
        ctx.type = {};
        
        ctx.type.isFunction = function (ƒ){
            return typeof ƒ === Hok.TYPES.F;
        };
    
        ctx.type.isDefined = function (ƒ){
            return typeof ƒ !== Hok.TYPES.U;
        };
    
        ctx.type.isObject = function(o) {
            var t0 = String(o) !== o,
                t1 = o === Object(o),
                t2 = ctx.type.isFunction(o),
                t3 = {}.toString.call(o).match(/\[object\sObject\]/);
            return t0 && t1 && !t2 && !!(t3 && t3.length);
        };
    
        ctx.type.isArray = function(o) {
            if (Array.isArray && Array.isArray(o)) {
                return true;
            }
            var t1 = String(o) !== o,
                t2 = ({}).toString.call(o).match(/\[object\sArray\]/);
            
            return t1 && !!(t2 && t2.length);
        };
    })(Hok.utils);;
    // /*
    // [Malta] poly.js
    // */
    // if (typeof Object.assign !== Hok.TYPES.F) {
    //     // Must be writable: true, enumerable: false, configurable: true
    //     Object.defineProperty(Object, "assign", {
    //         value: function assign(target/*, varArgs*/) {
    //             'use strict';
    //             if (target === null || target === undefined) {
    //                 throw new TypeError('Cannot convert undefined or null to object');
    //             }
    // 
    //             var to = Object(target);
    // 
    //             for (var i = 1, l = arguments.length; i < l; i++) {
    //                 var nextSource = arguments[i];
    // 
    //                 if (nextSource !== null && nextSource !== undefined)
    //                     for (var nextKey in nextSource)
    //                         if ({}.hasOwnProperty.call(nextSource, nextKey))
    //                             to[nextKey] = nextSource[nextKey];
    //             }
    //             return to;
    //         },
    //         writable: true,
    //         configurable: true
    //     });
    // }
    /*
    [Malta] ns.js
    */
    
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
            if (typeof ns[i] === Hok._U_) {
                ns[i] = obj[i];
            }
        }
        return ns;
    };
    ;
    /*
    [Malta] config.js
    */
    Hok.CONFIG = {
        AUTHOR: "Federico Ghedina",
        LANG: 'en',
        ENGY: {
            STATS: false,
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
        VERSION: "0.0.20"
    };;
    // /*
    // [Malta] object.js
    // */
    // Hok.object = (function(){
    // 
    //     var strMap = function(o, fn) {
    //             var ret = '',
    //                 j;
    //             for (j in o) 
    //                 if (o.hasOwnProperty(j)) 
    //                     ret += fn(o, j, ret);
    //             return ret;
    //         },
    //             
    // 
    //         // Returns true if it is a DOM node
    //         isNode = function(o) {
    //             return  typeof Node === 'object'
    //                 ? o instanceof Hok.W.Node
    //                 : o
    //                     && typeof o === 'object'
    //                     && typeof o.nodeType === 'number'
    //                     && typeof o.nodeName === 'string';
    //         },
    // 
    //         extract = function(data, where){                
    //             var g = where || (
    //                     typeof global !== 'undefined'
    //                         ? global
    //                         : (typeof window !== 'undefined' ? window : this)
    //                 ), key;
    //             for (key in data) {
    //                 if (data.hasOwnProperty(key)) {
    //                     g[key] = data[key];
    //                 }
    //             }
    //         },
    //         ret = {
    //             extract: extract,
    //             fromQs: function() {
    //                 var els = document.location.search.substr(1).split('&'),
    //                     len = els.length,
    //                     i = 0,
    //                     tmp,
    //                     out = [];
    // 
    //                 for (null; i < len; i += 1) {
    //                     tmp = els[i].split('=');
    //                     // do not override extra path out
    //                     //
    //                     !out[tmp[0]] && (out[tmp[0]] = decodeURIComponent(tmp[1]));
    //                 }
    //                 return out;
    //             },
    // 
    //             clone: function(obj){
    //                 var copy,
    //                     i, l;
    //                 // Handle the 3 simple types, and null or undefined
    //                 if (obj === null || typeof obj !== 'object') {
    //                     return obj;
    //                 }
    // 
    //                 // Handle Date
    //                 if (obj instanceof Date) {
    //                     copy = new Date();
    //                     copy.setTime(obj.getTime());
    //                     return copy;
    //                 }
    // 
    //                 // Handle Array
    //                 if (obj instanceof Array) {
    //                     copy = [];
    //                     for (i = 0, l = obj.length; i < l; i++) {
    //                         copy[i] = ret.clone(obj[i]);
    //                     }
    //                     return copy;
    //                 }
    // 
    //                 // Handle Object
    //                 if (obj instanceof Object) {
    //                     copy = {};
    //                     for (i in obj) {
    //                         if (obj.hasOwnProperty(i)) {
    //                             copy[i] = ret.clone(obj[i]);
    //                         }
    //                     }
    //                     return copy;
    //                 }
    //                 throw new Error('Unable to copy obj! Its type isn\'t supported.');
    //             },
    // 
    //             extend: function(o, ext, force) {
    //                 var obj = ret.clone(o),
    //                     j;
    // 
    //                 for (j in ext) {
    //                     if (ext.hasOwnProperty(j) && (!(j in obj) || force)) {
    //                         obj[j] = ext[j];
    //                     }
    //                 }
    //                 return obj;
    //             },
    // 
    //             keyize: function(objArr, k) {
    //                 var objRet = {},
    //                     i = 0,
    //                     l = objArr.length;
    //                 for (null; i < l; i++) {
    //                     if (k in objArr[i] && !(objArr[i][k] in objRet)) {
    //                         objRet[objArr[i][k]] = objArr[i];
    //                     }
    //                 }
    //                 return objRet;
    //             },
    // 
    //             isString: function(o) {
    //                 return typeof o === 'string' || o instanceof String;
    //             },
    // 
    //             // avoid tags
    //             jCompare: function(obj1, obj2) {
    //                 return !isNode(obj1) && typeof JSON !== Hok._U_
    //                     ? JSON.stringify(obj1) === JSON.stringify(obj2)
    //                     : obj1 === obj2;
    //             },
    // 
    //             toQs: function(obj) {
    //                 return strMap(
    //                     obj,
    //                     function (o, i, r) {
    //                         return ([
    //                             r ? '&' : '?',
    //                             encodeURIComponent(i),
    //                             '=',
    //                             encodeURIComponent(o[i])
    //                         ].join('')).replace(/'/g, '%27');
    //                     }
    //                     
    // 
    //                 );
    //             }
    //         };
    // 
    //     return ret;
    // })();
    // /*
    // [Malta] cookie.js
    // */
    // 
    // Hok.cookie = {
    //     enabled: true,
    //     cookie_nocookiesaround: false,
    //     initCheck: function() {
    //         return Hok.W.navigator.cookieEnabled;
    //     },
    //     set: function(name, value, expires, copath, domain, secure) {
    //         if (!Hok.cookie.enabled) return false;
    //         Hok.cookie.cookie_nocookiesaround = false;
    //         var today = new Date(),
    //             expiresDate = new Date(today.getTime() + expires);
    //         // expires && (expires = expires * 1000 * 60 * 60 * 24);
    //         Hok.WD.cookie = [
    //             name, '=', Hok.W.escape(value),
    //             (expires ? ';expires=' + expiresDate.toGMTString() : ''),
    //             (copath ? ';path=' + copath : ''),
    //             (domain ? ';domain=' + domain : ''),
    //             (secure ? ';secure' : '')
    //         ].join(' ');
    //         return true;
    //     },
    //     del: function(name, path, domain) {
    //         if (!Hok.cookie.enabled) return false;
    //         var ret = false;
    // 
    //         if (Hok.cookie.get(name)) {
    //             console.log({name});
    //             Hok.WD.cookie = [
    //                 name, '=',
    //                 (path ? ';path=' + path : ''),
    //                 (domain ? ';domain=' + domain : ''),
    //                 ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
    //             ].join('');
    //             ret = true;
    //         }
    //         return ret;
    //     },
    //     get: function(checkName) {
    //         var allCookies = Hok.WD.cookie.split(';'),
    //             l = allCookies.length,
    //             tempCookie = '',
    //             cookieName = '',
    //             cookieValue = '',
    //             cookieFound = false,
    //             i = 0;
    // 
    //         if (!Hok.cookie.enabled) return false;
    // 
    //         for (null; i < l; i += 1) {
    //             tempCookie = allCookies[i].split('=');
    //             cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');
    //             if (cookieName === checkName) {
    //                 cookieFound = true;
    //                 tempCookie.length > 1 && (cookieValue = Hok.W.unescape(tempCookie[1].replace(/^\s+|\s+$/g, '')));
    //                 return cookieValue;
    //             }
    //             tempCookie = null;
    //             cookieName = '';
    //         }
    //         return cookieFound;
    //     },
    //     delall: function() {
    //         if (!Hok.cookie.enabled) return false;
    //         var thecookie = Hok.WD.cookie.split(/;/),
    //             l = thecookie.length,
    //             i = 0;
    //         console.log(thecookie);
    //         for (null; i < l; i += 1) {
    //             var vs = thecookie[i].split(/=/);
    //             console.log({vs});
    //             // console.log({name: name[0]});
    //             Hok.cookie.del(vs[0]);
    //         }
    //         Hok.cookie.cookie_nocookiesaround = true;
    //         return true;
    //     },
    //     getall: function() {
    //         if (!Hok.cookie.enabled) return false;
    //         if (Hok.WD.cookie === '') return [];
    //         return Hok.cookie.cookie_nocookiesaround
    //             ? []
    //             : Hok.WD.cookie.split(';').forEach(
    //                 function(i) {
    //                     var t = i.split('=');
    //                     return { name: t[0], value: t[1] };
    //                 }
    //             );
    //     }
    // };;
    /*
    [Malta] dom.js
    */
    (function(ctx){
    
        ctx.noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
        ctx.setStyle = function(node, styles) {
            if (typeof styles === Hok.TYPES.U)
                throw new Error('ERR: styles needed');
            for (var tmp in styles) {
                if (tmp === 'float') {
                    node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
                } else {
                    node.style[tmp] = styles[tmp];
                }
            }
        };
    
        ctx.setAttrs = function(node, attrs) {
            if (typeof attrs === Hok.TYPES.U)
                throw new Error('ERR: attrs needed');
            for (var tmp in attrs) {
                ctx.noAttrs.indexOf(tmp) < 0
                && node.setAttribute(tmp, attrs[tmp]);
            }
        };
    
        ctx.unsetAttrs = function(node, attrs) {
            if (typeof attrs === Hok.TYPES.U)
                throw new Error('ERR: attrs needed');
            attrs.forEach(function (attr) {
                ctx.noAttrs.indexOf(attr) < 0
                && node.removeAttribute(attr);
            });
        };
    
        ctx.setData = function(node, data) {
            if (typeof data === Hok.TYPES.U)
                throw new Error('ERR: data needed');
            for (var tmp in data) {
                node.dataset[tmp] = data[tmp];
            }
        };
    
        ctx.setClass = function(node, clss) {
            clss.split(',').forEach(function (cls){
                node.classList.add(cls);
            });
        };
    
        ctx.unsetData = function(node, data) {
            if (typeof data === Hok.TYPES.U)
                throw new Error('ERR: data needed');
            data.forEach(function(d){
                delete node.dataset[d];
            });
        };
    
        ctx.remove = function(el) {
            return el.parentNode && el.parentNode.removeChild(el);
        };
    
        //TODO
        ctx.filterHtml = function(html) {
            return '' + html;
        };
    
        ctx.setText = function(node, text) {
            node.appendChild(document.createTextNode(text));
        };
    
        ctx.setHtml = function(node, html) {
            node.innerHTML = ctx.filterHtml(html);
        };
        ctx.script = function(params, autoVanish) {
            if (
                typeof params === Hok.TYPES.U
                || (
                    !('content' in params)
                    && (
                        !('attrs' in params)
                        || !('src' in params.attrs)
                    )
                )
            ){
                throw new Error('Missing script params');
            }
    
            var script = document.createElement('script'),
                attrs = params && params.attrs;
            
            if (attrs) ctx.setAttrs(script, attrs);
            if(autoVanish){
                script.onload = function() {
                    script.parentNode.removeChild(script);
                };
            }
            if(params.content) {
                script.innerHTML = params.content;
            }
            //  else if(params.src){
            //     script.setAttribute('src', params.src);
            // }
            return script;
        };
        ctx.style = function(params) {
            if (
                typeof params === Hok.TYPES.U
                || (
                    !('content' in params)
                    && !('href' in params)
                )
            ){
                throw new Error('Missing style params');
            }
            var type = params.content
                    ? { tag: 'style', attrs: {}}
                    : { tag: 'link', attrs: {
                        rel: 'stylesheet',
                        href: params.href
                    }},
                tag = document.createElement(type.tag),
                attrs = Object.assign(
                    type.attrs,
                    params && params.attrs || {}
                );
            ctx.setAttrs(tag, attrs);
            if (params.content) {
                tag.innerHTML = params.content;
            }
            return tag;
        };
        ctx.head = document.getElementsByTagName('head')[0];
    
    })(Hok.dom);
    
    ;
    /*
    [Malta] events.js
    */
    (function(ctx) {
        ctx._ = {
            unhandlers: {},
            bindErr: function(v) {return 'No straight way to '+(v ? '' : 'un')+'}bind an event';}
        };
        
        ctx.saveUnhandler = function(el, f) {
            ctx._.unhandlers[el] = ctx._.unhandlers[el] || [];
            ctx._.unhandlers[el].push(f);
        };
        
        ctx.unhandle = function(el) {
            ctx._.unhandlers[el] && ctx._.unhandlers[el].forEach(function(unhandler) {
                unhandler();
            });
            ctx._.unhandlers = [];
        };
        
        function unhandle(el, evnt, cb) {
            ctx.saveUnhandler(el, function() {
                ctx.off(el, evnt, cb);
            });
        }
        ctx.on = function(el, evnt, cb, capture) {
            capture = capture || false;
            el.addEventListener.apply(el, [evnt, cb, capture]);
            unhandle(el, evnt, cb);
        };
        
        ctx.off = function(el, evnt, cb) {
            el.removeEventListener(evnt, cb);
        };
        
        ctx.kill = function(e) {
            if (!e) {
                e = Hok.W.event;
                e.cancelBubble = true;
                e.returnValue = false;
            }
            'stopPropagation' in e && e.stopPropagation();
            e.preventDefault();
            return false;
        };
        
        ctx.once = function(el, evnt, cb) {
            ctx.on(el, evnt, function _(e) {
                cb.call(el, e);
                ctx.off(el, evnt, _);
            });
        };
        
        ctx.eventTarget = function(e) {
            e = e || Hok.W.event || {};
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
        
        
        ctx.ready = (function() {
            var comp = 'complete',
                readyStateCheckInterval = setInterval(function() {
                    if (document.readyState === comp) {
                        clearInterval(readyStateCheckInterval);
                        for (i = 0, l = cb.length; i < l; i++) {
                            cb[i].call(this);
                        }
                    }
                }, 100),
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
    })(Hok.events);
    
    
    ;
    // /*
    // [Malta] history.js
    // */
    // 
    // 
    // Hok.history = (function(){
    //     var handlers = [],
    //         spread = function(url, state, title) {
    //             document.title = title;
    //             return handlers.forEach(
    //                 function(handler){
    //                     handler(url, state, title);
    //                 }
    //             );
    //         };
    //     return {
    //         push: function(url, state, title) {
    //             Hok.H.pushState(state || {}, title || '', url);
    //             spread(url, state, title);
    //         },
    //         registerHandler: function(f) {return handlers.push(f);}, 
    // 
    // 
    // 
    // 
    // 
    // 
    // 
    //         
    //         replace: function(url, state, title) {
    //             Hok.H.replaceState(state || {}, title || '', url);
    //             spread(url, state, title);
    //         },
    //         back: function() {
    //             Hok.H.back();
    //         },
    //         resetHandlers: function(){
    //             handlers = [];
    //         },
    //         state: function() { return Hok.H.state; }
    //     };
    // })();
    /*
    [Malta] i18n.js
    */
    (function(ctx){
        var data = {},
            RX_LANG = /i18n\(([^}|]*)?\|?([^}]*)\)/;
        ctx.lang = Hok.CONFIG.LANG;
        ctx.switchLang = function(lang){
            Hok.i18n.lang = lang;
        };
        ctx.check = function(lab){ return lab.match(RX_LANG);};
        // ctx.dynamicLoad = function(lo) {
        //     var lang = Hok.i18n.lang,
        //         _label;
        //     for (_label in lo) {
        //         lang in lo[_label] && (data[_label] = lo[_label][lang]);
        //     }
        // };
        ctx.get = function(k, fallback) {
            return  Hok.ns.check(k, data) || fallback || k+'<sup>&#2417;</sup>';
        };
        ctx.load = function(dict) { data = dict;};
        ctx.parse = function(obj){
            var replacing = Hok.searchHash.forValue(obj, RX_LANG),
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
        };
    })(Hok.i18n);
    ;
    
    /*
    [Malta] solve.js
    */
    Hok.solve = (function() {
        var  _overwrite = function(destObj, path, obj){
                // path can be
                // str1
                // str1/str2[/str3[...]] (or str1.str2[.str3])
                //
                // in any case we need the elements of it
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
            cmp404 = function(componentName) {
                return JSON.stringify({
                    tag: 'div',
                    style:{
                        border:'1px solid red',
                        backgroundColor:'pink',
                        color:'red',
                        padding:'10px'
                    },
                    html: 'no component found ('+componentName+')',
                    protected: true
                });
            };
        
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
            };
        };
        Processor.prototype.evalTextFunctionWithParams = function(scriptContent, params){
            var evaluator = eval('(function (){return '+scriptContent+';})()');
            return evaluator(params);
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
                hasStats = false;
            return new Promise(function(resolve){
                (function solve() {
                    var component = Hok.searchHash.forKey(
                            self.content,
                            'component', { limit: 1 }
                        ),
                        componentName,
                        cached,
                        preLoaded,
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
                        resolve([self.content, hasStats && computeStats && self.stats]);
                    } else {
                        hasStats = true;
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
        
                        cback = function(xhr){
                            var cntORobj = xhr.responseText;
                            xhrEnd = +new Date();
                            xhrTot += xhrEnd - xhrStart;
                            var params = Hok.ns.check(component.container + '/params', self.content),
                                obj;
                                
                            if (preLoaded) {
                                // clone as string
                                obj = String(cntORobj);
                            } else {
                                if (!cached) {
                                    components[componentName] = String(cntORobj);
                                }
                                try {
                                    obj = self.evalTextFunctionWithParams(cntORobj, params);
    
                                 } catch(e) {
                                    console.error("Error evaluating component '"+componentName+"'");
                                    console.error(e);
                                 }
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
                            // check again
                            solve();
                        };
                        xhrStart = +new Date();
                        // cached?
                        if (preLoaded) {
                            cback({responseText: preloadedComponents[componentName]});
                        } else if (cached) {
                            cback({responseText:components[componentName]});
                        } else {
                            Hok.io.get({
                                url: componentName,
                                onCompleted: cback,
                                onError: function() {
                                    cback(cmp404(componentName));
                                }
                            });
                        }
                    }
                })();
            });
        };
        function report (stats) {
            var ln = new Array(37).join('-'),
                cl = console.log;
            cl(
                ln+'\n'+
                ['%cHokuto%c used', stats.elements, 'component' + (stats.elements === 1 ? '' : 's'),'\n'].join(' ')+
                'usage: \n'+
                Object.keys(stats.requested).reduce(function(acc, key){
                    return acc + [
                        '•',
                        key+':',
                        stats.requested[key],
                        'time' + (stats.requested[key] > 1 ? 's' : ''),
                        '\n'
                    ].join(' ');
                }, '')+
                ['total time:', stats.time+'ms', '\n'].join(' ')+
                ['◦ unfolding:', (stats.time - stats.xhrTot)+'ms', '\n'].join(' ')+
                ['◦ xhr:', stats.xhrTot+'ms', '\n'].join(' ')+
                ln, "color:#6af;font-size:1.5em", ""
            );
        }
    
        return function(cnf) {
            return new Processor(cnf).parse()
            .then(
                function(res){
                    res[1] && report(res[1]);
                    return res[0];
                }
            );
        };
    })();;
    /*
    [Malta] knot.js
    */
    var resolutive = function () {
            return Promise.resolve();
        },
        // isDefined = function (x){return typeof x !== Hok.TYPES.U;},
        // isFunction = function (f){return typeof f === Hok.TYPES.F;},
        functionize = function (instance, what){
            return Hok.utils.type.isFunction(what)
                ? what.call(instance)
                : what;
        };
    
    function Knot(config, clearTarget) {
        var self = this;
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
        this.setCall('Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
    };
    
    Knot.prototype.initRerender = function(){
        this.setCall('Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
        this.cb && this.cb.call(this);
        this.childrenKnots.forEach(function (childrenKnot) {
            childrenKnot.initRerender();
        }); 
    };
    
    /**
     * SETTERS 
     */
    
    /**
     * 
     * @param {*} state 
     */
    Knot.prototype.setState = function(state) {
        var nextState = functionize( this, this.config.state || {}),
            nextPassedState = functionize( this, state || {}),
            whole = Object.assign({}, nextState, this.state, nextPassedState );
        // debugger
        this.state = whole;
        return this;
    };
    
    Knot.prototype.setId = function(id) {
        var fromConf = Hok.utils.type.isDefined(this.config[Knot.identifier]),
            val,
            attrs = {};
        if (fromConf || id) {
            val = fromConf
                ? this.config[Knot.identifier]
                : id;
            attrs[Knot.identifier] = val;
            this.setAttrs(attrs);
        }
    };
    Knot.prototype.setCall = function(fns) {
        var self = this;
        fns.split(/,/).forEach(function(f) {
            self['set' + f]();
        });
    };
    
    Knot.prototype.lateKid = function(id) {
        if (!(id in this.nodes)) {
            this.nodes[id] = this;
        } else {
            consolw.warn('node already present by "'+Knot.byIdIdentifier+'"');
        }
    };
    
    Knot.prototype.setByRef = function() {
        if (Knot.byIdIdentifier in this.config) {
            var ref = this.config[Knot.byIdIdentifier];
            this.nodes[ref] = this;
        }
    };
    
    Knot.prototype.getByRef = function(ref) {
        return ref in this.nodes
            ? this.nodes[ref]
            : null;
    };
    
    Knot.prototype.setRef = function(ref, ctx) {
        // allow the node to set a ref on itself
        // or to another node it can reference
        if (ref) {
            (ctx || this).nodes[ref] = ctx || this;
                // or incase is in the config, just set it
        } else if (Hok.utils.type.isDefined(this.config.ref)) {
            this.nodes[this.config.ref] = this;
        }
    };
    
    Knot.prototype.setClassname = function(classes) {
        var next = functionize(this, this.config.className || ''),
            nextPassed = functionize(this, classes || ''),
            whole = [next, nextPassed]
                .filter(Boolean)
                .join(',');
        whole && Hok.dom.setClass(this.node, whole);
        return this;
    };
    
    Knot.prototype.setStyle = function(style) {
        var next = functionize(this, this.config.style || {}),
            nextPassed = functionize(this, style || {}),
            whole = Object.assign(
                {}, next, nextPassed
            );
        Hok.dom.setStyle(this.node, whole);
        return this;
    };
    
    
    Knot.prototype.setAttrs = function(attrs) {
        var next = functionize(this, this.config.attrs || {}),
            nextPassed = functionize(this, attrs || {}),
            whole = Object.assign({}, next, nextPassed);
        Hok.dom.setAttrs( this.node, whole);
        return this;
    };
    
    Knot.prototype.unsetAttrs = function(attrs) {
        attrs && Hok.dom.unsetAttrs(this.node, attrs);
        return this;
    };
    
    Knot.prototype.setData = function(data) {
        var next = functionize( this, this.config.data || {}),
            nextPassed = functionize( this, data || {}),
            whole = Object.assign({}, next, nextPassed);
        whole && Hok.dom.setData(this.node, whole);
        return this;
    };
    
    Knot.prototype.unsetData = function(data) {
        data && Hok.dom.unsetData(this.node, data);
        return this;
    };
    
    Knot.prototype.setText = function(text) {
        var next = functionize(this, this.config.text || ''),
            nextPassed= functionize(this, text || ''),
            whole = nextPassed || next;
        Hok.dom.setText(this.node, whole);
        return this;
    };
    
    Knot.prototype.setHtml = function(html) {
        if(!Hok.utils.type.isDefined(html)) html = '';
        var next = functionize(this, 'html' in this.config ? this.config.html : ''),
            nextPassed= functionize(this, html),
            whole = nextPassed || next;
            whole && Hok.dom.setHtml(this.node, whole);
        return this;
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
                    console.warn('[WARNING] : method \'' + tmp[0] + '\' cant be added, would override existing element.');
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
            if (entry[0] === eventType) {
                Hok.events.off(self.node, entry[0], entry[1]);
            } else {
                acc[entry[0]] = entry[1];
            }
            return acc;
        }, {});
    };
    
    Knot.prototype.setEnd = function() {
        var self = this;
        if (!this.rendered && 'end' in this.config && Hok.utils.type.isFunction(this.config.end)) {
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
                    var newChild = new Knot(
                        Object.assign(
                            { rendered: self.rendered },
                            children,
                            {
                                target: self.node,
                                parentKnot: self,
                                rootKnot: self.rootKnot,
                            }
                        )
                    );
                    self.childrenKnots.push(newChild);
                    return p.then(function () { return newChild.render();});
                }, Promise.resolve()).then(function(){return self;});
            } else {
                return this.initCheck.call(this).then(function () {
                    return self.cb.call(self).then(function() {
                        if(!self.aborted){
                            if (self.clearTarget && !self.rendered) {
                                self.target.innerHTML = '';
                            }
                            if (!self.rendered) self.target.appendChild(self.frag);
                            self.rendered = true;
                        }
                        return self;
                    });
                }).then(function(){
                    if(self.parentKnot){
                        self.parentKnot.solve();
                    }
                    return self;
                }).catch(function(){
                    self.frag.removeChild(self.node);
                });
            }
        }
        
        return Promise.resolve(this);
    };
    
    Knot.prototype.addSibling = function(n){
        this.node.parentNode.appendChild(n);
        return this;
    };
    Knot.prototype.clear = function(){
        if(this.ender) this.ender();
        this.target.removeChild(this.node);
        this.unhandleEvents();
        // this.rendered = false;
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
        var jsonSize = JSON.stringify(this.config).length,
            htmlSize = this.node.innerHTML.length;
        return (htmlSize / jsonSize).toFixed(2) + " (html:" + htmlSize + " / json:" + jsonSize + ")";
    };
    
    Knot.isknot = function(n){return n instanceof Knot;};
    Knot.identifier = 'id';
    Knot.byIdIdentifier = 'ref';
    ;
    /*
    [Malta] fx.js
    */
    Hok.fx = (function(){
    
        function fadeIn(params){
            params = params || {};
            var t = ((params.duration || 500) / 1e3).toFixed(1),
                additionalStyles = params.additionalStyles || '',
                style = hokuto._.dom.style({
                    content: 'body{transition:opacity 3000s ease-in-out; opacity: 1;}'+additionalStyles
                });
            document.body.appendChild(style);
        }
    
        return {
            fadeIn: fadeIn
        };
    })();;
    //+++++++++++++++++++++++++++++++++++++++++++++++

    var __renders = {},
        __nodes = {};

    //function render(cnf, clear, name) {
    function render(params) {
        if(!Hok.utils.type.isDefined(params) || !Hok.utils.type.isDefined(params.config)){
            throw "Nothing to render";
        }
        var config = params.config,
            clear = !!params.clear,
            name = params.name,
            vanish = params.vanish,
            currentScript = document.currentScript,
            scriptParent = currentScript && currentScript.parentNode;
        return Hok.solve(config).then(
            function (solvedConfig){
                if(!('target' in solvedConfig) && scriptParent){
                    solvedConfig.target = scriptParent;
                }
                solvedConfig.endFunctions = [];
                solvedConfig.nodes = __nodes;
                
                return new Knot(solvedConfig, clear).render().then(function (n) {
                    if (name){
                        __renders[name] = n;
                    }
                    return n;
                }).finally(function() {
                    vanish && scriptParent.removeChild(currentScript);
                });
            }
        );
        // .catch(function (r){
        //     console.log({r:r});
        // });
    }

    function get(cnf){
        var factual = document.createElement('div'),
            knot;
        cnf.target = factual;
        knot = render(cnf);
        return knot;
    }

    return {
        _: Hok,
        render: render,
        get: get,
        getKnotById: function (id) {
            return id in __nodes
                ? __nodes[id]
                : null;
        },
        getElement: function(n) { return n in __renders ? __renders[n] : false; },
        getElements: function() { return __renders; }
    };
})(window);
(typeof exports === 'object') && (module.exports = hokuto);