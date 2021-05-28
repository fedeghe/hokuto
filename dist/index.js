/*!
 * 
 * hokuto
 *
 * version 0.0.2
 * Fri May 28 2021 23:59:45 GMT+0200 (Central European Summer Time)
 */(()=>{var __webpack_modules__={610:(e,t,n)=>{"use strict";n.d(t,{Z:()=>function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}})},991:(e,t,n)=>{"use strict";function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e}})},484:(e,t,n)=>{"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,{Z:()=>r})},995:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>Processor});var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(484),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(610),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(991),balle__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(969),balle__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(balle__WEBPACK_IMPORTED_MODULE_0__),searchhash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(945),searchhash__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(searchhash__WEBPACK_IMPORTED_MODULE_1__),_utilities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(657),_io__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(541),_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(707),_i18n__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(123),_config__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(510),components={},preloadedComponents={},config={fileNameSeparator:"/",fileNamePrepend:_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.NAME_PREPEND,ext:_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.EXT,componentsUrl:_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.URL},Processor=function(){function Processor(e){(0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__.Z)(this,Processor),this.config=e,this.endPromise=balle__WEBPACK_IMPORTED_MODULE_0___default().one(),this.stats={time:0,elements:0,requested:{},xhrTot:0}}return(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__.Z)(Processor,[{key:"run",value:function run(){var self=this,langFunc=_i18n__WEBPACK_IMPORTED_MODULE_5__.Z.parse,elementsN=0,start=+new Date,end,xhrTot=0,requested={},cback,computeStats=_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.STATS;return function solve(){var component=searchhash__WEBPACK_IMPORTED_MODULE_1___default().forKey(self.config,"component",{limit:1}),componentName,cached,preLoaded,xhrStart=0,xhrEnd=0;component.length?(component=component[0],componentName=Processor.getFileName(component.value),component.value in requested?requested[component.value]++:(requested[component.value]=1,elementsN++),cached=componentName in components,preLoaded=componentName in preloadedComponents,cback=function cback(cntORobj){xhrEnd=+new Date,xhrTot+=xhrEnd-xhrStart;var params=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(component.container+"/params",self.config),obj,usedParams,foundParam,foundParamValue,foundParamValueReplaced,i,l,obj=preLoaded?(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.lc)(cntORobj):(cached||(components[componentName]=(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.lc)(cntORobj)),cntORobj=cntORobj.replace(/^[^{]*/,"").replace(/(;?([\n\s]*)?)$/,""),eval("("+cntORobj+")"));if(params&&(usedParams=searchhash__WEBPACK_IMPORTED_MODULE_1___default().forValue(obj,/#PARAM{([^}|]*)?\|?([^}]*)}/),l=usedParams.length,l))for(i=0;i<l;i++)foundParam=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(usedParams[i].regexp[1],params),foundParamValue=(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__.Z)(foundParam)!==_core__WEBPACK_IMPORTED_MODULE_4__.TF?foundParam:usedParams[i].regexp[2]||"",(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__.Z)(foundParamValue).match(/string/i)?(foundParamValueReplaced=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(usedParams[i].path,obj).replace(usedParams[i].regexp[0],foundParamValue),(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.bq)(obj,usedParams[i].path,foundParamValueReplaced)):(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.bq)(obj,usedParams[i].path,foundParamValue);component.container?(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.u1)(self.config,component.container,obj):self.config=obj,solve()},xhrStart=+new Date,preLoaded?cback(preloadedComponents[componentName]):cached?cback(components[componentName]):_io__WEBPACK_IMPORTED_MODULE_3__.Z.get(componentName,cback,!0,null,!0,function(e){cback(JSON.stringify({tag:"h2",html:"no component found (".concat(componentName,")")}))})):(end=+new Date,self.stats.time=end-start,self.stats.elements=elementsN,self.stats.requested=requested,self.stats.xhrTot=xhrTot,self.endPromise.resolve([self.config,computeStats&&self.stats]))}(),langFunc&&langFunc(self.config),self.endPromise}}],[{key:"getFileName",value:function(e){var t=e.split(/\/|\|/),n=e,e=t.length-1;return t[e]=config.fileNamePrepend+t[e],n=t.join(config.fileNameSeparator),[config.componentsUrl,config.componentsUrl.match(/\/$/)?"":"/",n,config.ext].join("")}}]),Processor}()},657:(e,t,n)=>{"use strict";n.d(t,{lc:()=>r,bq:()=>s,u1:()=>i});var o=n(484),c=n(707),r=function e(t){if(null==t||"object"!==(0,o.Z)(t))return t;var n,r=t.constructor();for(n in t)t.hasOwnProperty(n)&&(r[n]=e(t[n]));return r},s=function(e,t,n){for(var r=t.split(/\.|\//),o=r.length,i=0;i<o-1;)e=e[r[i++]];e[r[o-1]]=n},i=function(e,t,n){var r=(0,c.RV)(t,e),o=n,i={},a=0;for(a in o)i[a]=o[a];for(a in r)a.match(/component|params/)||(i[a]=r[a]);s(e,t,i)}},510:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r={AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!0,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:""}},NS:"Widgzard",NAME:"Widgzard",VERSION:{WIDGZARD:"2.0.0",ENGY:"1.0.0"}}},251:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});var c=n(707);var s={enabled:!0,cookie_nocookiesaround:!1,initCheck:function(){return c.W.navigator.cookieEnabled},set:function(e,t,n,r,o,i){if(!s.enabled)return!1;this.cookie_nocookiesaround=!1;var a=new Date,a=new Date(a.getTime()+n);return c.WD.cookie=[e,"=",c.W.escape(t),n?";expires="+a.toGMTString():"",r?";path="+r:"",o?";domain="+o:"",i?";secure":""].join(),!0},get:function(e){var t=c.WD.cookie.split(";"),n="",r="",o=!1,i=0,a=t.length;if(!NS.LIB.cookie.enabled)return!1;for(;i<a;i+=1){if((n=t[i].split("="))[0].replace(/^\s+|\s+$/g,"")===e)return o=!0,r=1<n.length?c.W.unescape(n[1].replace(/^\s+|\s+$/g,"")):r;n=null}return o},del:function(e,t,n){if(!s.enabled)return!1;var r=!1;return this.get(e)&&(c.WD.cookie=[e,"=",t?";path="+t:"",n?";domain="+n:"",";expires=Thu, 01-Jan-1970 00:00:01 GMT"].join(""),r=!0),r},delall:function(){if(!s.enabled)return!1;for(var e,t=c.WD.cookie.split(/;/),n=0,r=t.length;n<r;n+=1)e=t[n].split(/=/),this.del(e[0],!1,!1);return this.cookie_nocookiesaround=!0},getall:function(){return!!s.enabled&&(""===c.WD.cookie||this.cookie_nocookiesaround?[]:c.WD.cookie.split(";").forEach(function(e){e=e.split("=");return{name:e[0],value:e[1]}}))}};const r=s},707:(e,t,n)=>{"use strict";n.d(t,{W:()=>a,TF:()=>c,WD:()=>r,vK:()=>o,RV:()=>s});var i=n(484),a=window,c="undefined",r=a.document,n=a.history,o={U:c,F:"function"},s=function(e,t){var n=(e=e.replace(/^\//,"")).split(/\.|\//),r=0,o=n.length;if(t=(0,i.Z)(t)!==c?t:a,!e)return t;for(;r<o;r+=1){if((0,i.Z)(t[n[r]])===c)return;t=t[n[r]]}return t}},123:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var i=n(484);var t=n(945),a=n.n(t),c=n(707),n=n(510),r={},s={lang:n.Z.lang,check:function(e){return e.match(/i18n\(([^}|]*)?\|?([^}]*)\)/)},dynamicLoad:function(e,t){for(t in e)s.lang in e[t]&&(r[t]=e[t][s.lang])},get:function(e,t){return(0,c.RV)(e,r)||t||"no Value"},load:function(e){!function(e){throw new TypeError('"'+e+'" is read-only')}("data")},parse:function(e){for(var t,n=a().forValue(e,/i18n\(([^}|]*)?\|?([^}]*)\)/),r=0,o=n.length;r<o;r++)(0,i.Z)(n[r].regexp).match(/boolean/i)||(t=s.check(n[r].regexp[0]))&&((0,c.RV)(n[r].container,e)[n[r].key]=s.get(t[1],t[2]))}};const o=s},541:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(484),_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(707),_cookie__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(251),_object__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(247),xdr=(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__.Z)(_core__WEBPACK_IMPORTED_MODULE_0__.W.XDomainRequest)!==_core__WEBPACK_IMPORTED_MODULE_0__.vK.U&&document.all&&!navigator.userAgent.match(/opera/i),_={getxhr:function(e){var t,n=["Msxml2.XMLHTTP","Msxml3.XMLHTTP","Microsoft.XMLHTTP"],r=n.length,o=0;if(xdr&&e.cors)t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.XDomainRequest;else try{t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.XMLHttpRequest}catch(e){for(;o<r;o+=1)try{t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.ActiveXObject(n[o])}catch(e){continue}t||_core__WEBPACK_IMPORTED_MODULE_0__.W.alert("No way to initialize XHR")}return t},setHeaders:function(e,t){e.setRequestHeader("Accept",({xml:"text/xml",html:"text/html",json:"application/json"}[t]||"text/html")+"charset=utf-8")},setMultipartHeader:function(e){e.setRequestHeader("Content-Type","multipart/form-data")},setCookiesHeaders:function(e){for(var t=_cookie__WEBPACK_IMPORTED_MODULE_1__.Z.getall(),n=0,r=t.length;n<r;)e.setRequestHeader("Cookie",t[n].name+"="+t[n].value),n++},ajcall:function(e,t){var n,r,o,i,a=_.getxhr(t),c=t&&t.method||"POST",s=t&&t.cback,u=t&&t.opened||function(){},l=t&&t.loading||function(){},f=t&&t.error||function(){},h=t&&t.abort||function(){},p=t&&t.sync,d=t&&t.data||{},E=t&&t.type||"text/html",m=!t||void 0===t.cache||t.cache,g="xml"===E?"responseXML":"responseText",b=t&&t.timeout||1e4,P=t&&t.hasFiles,v=!1,y=!1;if(m||(d.C=+new Date),"GET"===c)d=_object__WEBPACK_IMPORTED_MODULE_2__.Z.toQs(d).substr(1);else{for(i in n=new _core__WEBPACK_IMPORTED_MODULE_0__.W.FormData,d)d.hasOwnProperty(i)&&n.append(i,d[i]);d=n}if(xdr&&t.cors)a.open(c,"GET"===c?e+(d?"?"+d:""):e),a.onerror=f,a.ontimeout=function(){},a.onprogress=function(e){e.lengthComputable&&(e=e.loaded/e.total*100,console.log(e+"% uploaded"))},a.onload=function(){s(a.responseText)},a.timeout=3e3,_.setHeaders(a,P,E),a.contentType=i={xml:"text/xml",html:"text/html",json:"application/json"}[E]||"text/html",window.setTimeout(function(){a.send()},20);else{a.onreadystatechange=function(){if(y===a.readyState)return!1;if(y=a.readyState,404==a.status||4===parseInt(a.readyState,10)&&0===parseInt(a.status,10))return a.onerror({error:404,xhr:a,url:e}),a.abort(),!1;if("complete"===y||4===parseInt(y,10)&&200===parseInt(a.status,10))return v=!0,404===parseInt(a.status,10)?(a.onerror.call(a),!1):(s&&(r=a[g],s(r)),o=a[g],_core__WEBPACK_IMPORTED_MODULE_0__.W.setTimeout(function(){a=null},50),o);if(3===y)l(a);else if(2===y)u(a);else if(1===y)switch(P?_.setHeaders(a,"json"):_.setHeaders(a,E),c){case"POST":case"PUT":try{a.send(d||!0)}catch(e){}break;case"DELETE":case"GET":try{a.send(null)}catch(e){}break;default:_core__WEBPACK_IMPORTED_MODULE_0__.W.alert(c),a.send(null)}return!0},a.onerror=function(){f&&f.apply(null,arguments)},a.onabort=function(){h&&h.apply(null,arguments)},a.open(c,"GET"===c?e+(d?"?"+d:""):e,p),_core__WEBPACK_IMPORTED_MODULE_0__.W.setTimeout(function(){v||(v=!0,a.abort())},b);try{return"responseXML"==g?a[g].childNodes[0]:a[g]}catch(e){}}return!0}};const __WEBPACK_DEFAULT_EXPORT__={getxhr:_.getxhr,post:function post(uri,_cback,sync,data,cache,files,err){return _.ajcall(uri,{cback:function cback(r){files?(r=r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm,""),_cback(_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON&&_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON.parse?JSON.parse(r):eval(["(",r,")"].join("")))):_cback(r)},method:"POST",sync:sync,data:data,cache:cache,error:err,hasFiles:!!files})},get:function(e,t,n,r,o,i){return _.ajcall(e,{cback:t||function(){},method:"GET",sync:n,data:r,cache:o,error:i})},put:function(e,t,n,r,o,i){return _.ajcall(e,{cback:t,method:"PUT",sync:n,data:r,cache:o,error:i})},getJson:function getJson(uri,_cback2,data,cors){return _.ajcall(uri,{type:"json",method:"GET",sync:!1,cback:function cback(r){r=r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm,""),_cback2(_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON&&_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON.parse?JSON.parse(r):eval(["(",r,")"].join("")))},data:data,cors:!!cors})},getXML:function(e,t){return _.ajcall(e,{method:"GET",sync:!1,type:"xml",cback:t||function(){}})}}},247:(e,t,o)=>{"use strict";o.d(t,{Z:()=>n});var i=o(484),r=o(707);var a={extract:function(e,t){var n,r=t||(void 0!==o.g?o.g:"undefined"!=typeof window?window:this);for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n])},fromQs:function(){for(var e,t=document.location.search.substr(1).split("&"),n=[],r=0,o=t.length;r<o;r+=1)n[(e=t[r].split("="))[0]]||(n[e[0]]=decodeURIComponent(e[1]));return n},clone:function(e){var t,n,r;if(null===e||"object"!==(0,i.Z)(e))return e;if(e instanceof Date)return(t=new Date).setTime(e.getTime()),t;if(e instanceof Array){for(t=[],n=0,r=e.length;n<r;n++)t[n]=a.clone(e[n]);return t}if(e instanceof Object){for(n in t={},e)e.hasOwnProperty(n)&&(t[n]=a.clone(e[n]));return t}throw new Error("Unable to copy obj! Its type isn't supported.")},extend:function(e,t,n){var r,o=a.clone(e);for(r in t)!t.hasOwnProperty(r)||r in o&&!n||(o[r]=t[r]);return o},keyize:function(e,t){for(var n={},r=0,o=e.length;r<o;r++)t in e[r]&&!(e[r][t]in n)&&(n[e[r][t]]=e[r]);return n},isString:function(e){return"string"==typeof e||e instanceof String},jCompare:function(e,t){return n=e,("object"===("undefined"==typeof Node?"undefined":(0,i.Z)(Node))?n instanceof W.Node:n&&"object"===(0,i.Z)(n)&&"number"==typeof n.nodeType&&"string"==typeof n.nodeName)||("undefined"==typeof JSON?"undefined":(0,i.Z)(JSON))===r.TF?e===t:JSON.stringify(e)===JSON.stringify(t);var n},toQs:function(e){return function(e,t){var n,r="";for(n in e)e.hasOwnProperty(n)&&(r+=t(e,n,r));return r}(e,function(e,t,n){return[n?"&":"?",encodeURIComponent(t),"=",encodeURIComponent(e[t])].join("").replace(/'/g,"%27")})}};const n=a},969:e=>{"use strict";function r(e){var t=this,n=!1;this.status=r.STATUSES.PENDING,this.value=null,this.cause=null,this.resolvers=this.resolvers||[],this.rejectors=this.rejectors||[],this.finalizers=this.finalizers||[],e=e||function(){};try{e(function(e){n||t.status!==r.STATUSES.PENDING||(n=!0,t.status=r.STATUSES.FULFILLED,t.value=e,r.roll(t.resolvers,"value",t),r.roll(t.finalizers,"value",t))},function(e){n||t.status!==r.STATUSES.PENDING||(n=!0,t.status=r.STATUSES.REJECTED,t.cause=e,r.roll(t.rejectors,"cause",t),r.roll(t.finalizers,"cause",t))})}catch(e){return r.reject(e.message)}return this}r.roll=function(e,t,n){e.forEach(function(e){e(n[t])},n)},r.prototype.resolve=function(n){return r.call(this,function(e,t){return e(n)})},r.prototype.reject=function(n){return r.call(this,function(e,t){return t(n)})},r.prototype.launch=function(e){return r.call(this,e)},r.prototype.then=function(e,t){switch(this.status){case r.STATUSES.REJECTED:r.roll(this.rejectors,"cause",this);break;case r.STATUSES.PENDING:this.resolvers.push(e),t&&this.rejectors.push(t);break;case r.STATUSES.FULFILLED:e(this.value)}return this},r.prototype.catch=function(e){switch(this.status){case r.STATUSES.PENDING:this.rejectors.push(e);break;case r.STATUSES.REJECTED:return e.call(this,this.cause)}return this},r.prototype.finally=function(e){return this.finalizers.push(e),this.status!==r.STATUSES.PENDING&&r.roll(this.finalizers,"value",this),this},r.STATUSES={PENDING:"PENDING",FULFILLED:"FULFILLED",REJECTED:"REJECTED"},r._isFunc=function(e){return"function"==typeof e},r._isIterable=function(e){return null!=e&&r._isFunc(e[Symbol.iterator])},r.one=function(e){return new r(e)},r.all=function(e){if(!r._isIterable(e))return r.reject("Balle.all acceps an Iterable Promise only");var o=[],i=e.length,a=0;return new r(function(n,r){e.forEach(function(e,t){"REJECTED"==e.status&&r(e.cause),e.then(function(e){a++,o[t]=e,a==i&&n(o)}).catch(r)})})},r.race=function(e){return r._isIterable(e)?new r(function(t,n){e.forEach(function(e){e.then(t).catch(n)})}):r.reject("Balle.race acceps an Iterable Promise only")},r.chain=function(i){if(!r._isIterable(i))return r.reject("Balle.chain acceps an Iterable Promise only");var a=i.length;return new r(function(r,o){!function t(n,e){return n===a?r(e):i[n](e).then(function(e){t(++n,e)}).catch(function(e){o(e)})}(0)})},r.reject=function(n){return new r(function(e,t){return t(n)})},r.resolve=function(n){return new r(function(e,t){n instanceof r?n.then(e).catch(t):e(n)})},e.exports=r},945:e=>{function p(e){return e instanceof RegExp}function r(e,t,n,s){if(o=t,i=String(o)!==o,a=o===Object(o),_="function"!=typeof o,o={}.toString.call(o).match(/\[object\sObject\]/),!(i&&a&&_&&o&&o.length||(_=t,o={}.toString.call(_).match(/\[object\sArray\]/),String(_)!==_&&o&&o.length)))throw new Error("BAD PARAM: must search into an object or an array");function r(e,t){return("string"==typeof(n=e)||n instanceof String)&&p(t)?e.match(t):(t=t,JSON.stringify(e)===JSON.stringify(t)&&!p(t));var n}function c(e,t,n,r,o){var i=[].concat.call(e,[t]),a=l(t,r[t],n),c=s.min<=o&&o<=s.max,e=i.length;c&&a&&(f.push({obj:r,value:r[t],key:i[e-1],parentKey:i[e-2],path:i.join("/"),container:i.slice(0,e-1).join("/"),parentContainer:i.slice(0,e-2).join("/"),regexp:a,level:o}),u++),h(r[t],n,i,o+1)}var o,i,a,_,u=0,l={key:function(e,t,n){return"function"==typeof n?n(e):r(e,n)},value:function(e,t,n){return"function"==typeof n?n(t):r(t,n)},keyvalue:function(e,t,n){return("function"==typeof n.key&&n.key(e)||r(e,n.key))&&("function"==typeof n.value&&n.value(t)||r(t,n.value))}}[e],f=[],h=function(e,t,n,r){var o,i,a;if(o=e,!("object"==typeof HTMLElement?o instanceof HTMLElement:o&&"object"==typeof o&&void 0!==o.nodeType&&1===o.nodeType&&"string"==typeof o.nodeName))if(e instanceof Array)for(i=0,a=e.length;i<a&&(c(n,i,t,e,r),s.limit!==u);i++);else if("object"==typeof e)for(i in e)if(c(n,i,t,e,r),s.limit===u)break};return s.limit="limit"in s?~~s.limit:1/0,s.min="min"in s?~~s.min:0,s.max="max"in s?~~s.max:1/0,0===s.limit||(s.min=s.min<0?0:s.min,s.max<s.min&&(e=s.min,s.min=s.max,s.max=e),h(t,n,[],0)),f}e.exports={forKey:function(e,t,n){return r("key",e,t,n||{})},forValue:function(e,t,n){return r("value",e,t,n||{})},forKeyValue:function(e,t,n){return r("keyvalue",e,t,n||{})}}}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__={};(()=>{"use strict";__webpack_require__.r(__webpack_exports__);var l=__webpack_require__(484),f=__webpack_require__(707);(0,l.Z)(Object.assign)!==f.vK.F&&Object.defineProperty(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1,o=arguments.length;r<o;r++){var i=arguments[r];if(null!=i)for(var a in i)!{}.hasOwnProperty.call(i,a)||(n[a]=i[a])}return n},writable:!0,configurable:!0});var e=__webpack_require__(969),a=__webpack_require__.n(e),r=["innerHTML","style","dataset","className"];const t={remove:function(e){return e.parentNode&&e.parentNode.removeChild(e)},setText:function(e,t){e.appendChild(document.createTextNode(t))},setHtml:function(e,t){e.innerHTML=""+t},setStyle:function(e,t){if((0,l.Z)(t)===f.vK.U)throw new Error("ERR: styles needed");for(var n in t)"float"===n?e.style[n.replace(/^float$/i,"cssFloat")]=t[n]:e.style[n]=t[n]},setAttrs:function(e,t){if((0,l.Z)(t)===f.vK.U)throw new Error("ERR: attrs needed");for(var n in t)r.indexOf(n)<0&&e.setAttribute(n,t[n])},unsetAttrs:function(e,t){if((0,l.Z)(t)===f.vK.U)throw new Error("ERR: attrs needed");for(var n in t)r.indexOf(n)<0&&e.removeAttribute(n,t[n])},setData:function(e,t){if((0,l.Z)(t)===f.vK.U)throw new Error("ERR: data needed");for(var n in t)e.dataset[n]=t[n]},unsetData:function(e,t){if((0,l.Z)(t)===f.vK.U)throw new Error("ERR: data needed");for(var n in t)delete e.dataset[n]}};var i={events:{getElementDeterminant:function(e){return e.tagName.match(/input|textarea|select/i)?"value":"innerHTML"},getElementEvent:function(e){return e.tagName.match(/input|textarea/i)?"input":"change"}},unhandlers:{}};var n,o,c,s,_,u="addEventListener"in f.W?function(e,t,n,r){e.addEventListener.apply(e,[t,n,r=r||!1]),p(e,t,n)}:"attachEvent"in f.W?function(e,t,n){e.attachEvent.apply(e,["on"+t,n]),p(e,t,n)}:function(){throw new Error("No straight way to bind an event")},h="removeEventListener"in f.W?function(e,t,n){e.removeEventListener(t,n)}:"detachEvent"in f.W?function(e,t,n){e.detachEvent.apply(e,["on"+t,n])}:function(){throw new Error("No straight way to unbind an event")},e=(c=[],s="complete",_=setInterval(function(){if(document.readyState===s)for(clearInterval(_),n=0,o=c.length;n<o;n++)c[n].call(this)},10),function(e){document.readyState===s?e.call(this):c.push(e)});function p(e,t,n){var r,o;r=e,o=function(){h(e,t,n)},i.unhandlers[r]=i.unhandlers[r]||[],i.unhandlers[r].push(o)}const d={on:u,off:h,kill:function(e){return e||((e=f.W.event).cancelBubble=!0,e.returnValue=!1),"stopPropagation"in e&&e.stopPropagation(),e.preventDefault(),!1},once:function(n,r,o){u(n,r,function e(t){o.call(n,t),h(n,r,e)})},eventTarget:function(e){var t=(e=e||f.W.event).currentTarget||(0,l.Z)(e.target)!==TYPES.U?e.target:e.srcElement;if(!t)return!1;for(;3===t.nodeType&&null!==t.parentNode;)t=t.parentNode;return t},ready:e,unhandle:function(e){i.unhandlers[e]&&i.unhandlers[e].forEach(function(e){e()}),i.unhandlers=[]}};function E(e,t){this.config=e,this.map=t,this.parent=e.target,this.tag=e.tag||"div",this.node=this.config.ns?document.createElementNS(e.ns,this.tag):document.createElement(this.tag),this.rendered=!1,this.toSolve=0,this.state="state"in e?e.state:{},this.data="data"in e?e.data:{},this.init="init"in e&&e.init,this.rootNode="rootNode"in e?e.rootNode:this,this.parentNode="parentNode"in e?e.parentNode:this,this.paramsFromChildren=[],this.root=this.map.rootNode,this.abort=this.map.abort,this.getNode=this.map.getNode,this.getNodes=this.map.getNodes,this.lateWid=this.map.lateWid,this.getElements=this.map.getElements,this.getElement=this.map.getElement,this.resolve=function(){},this.reset=function(){},this.setMethods(),this.prepareState(),this.initialize(),this.checkInit(),this.checkEnd()}E.prototype.prepareState=function(){var e="state"in this.config?this.config.state:{};this.state=(0,l.Z)(e)===f.vK.F?e():e},E.prototype.initialize=function(){this.rendered=!1,this.setCall("Ref,Events,Text,Html,Style,Attrs,Data,Children,Cbs"),(0,l.Z)(this.config[E.identifier])!==f.vK.U&&(0,l.Z)(this.config.map.elements[this.config[E.identifier]])===f.vK.U&&this.map.add(this.config[E.identifier],this)},E.prototype.setCall=function(e){var t=this;e.split(/,/).forEach(function(e){t["set"+e]()})},E.prototype.cleanup=function(){this.node.innerHTML="",this.node.parentNode.removeChild(this.node)},E.prototype.setChildren=function(){var t=this,e=[];"children"in this.config&&(e=((0,l.Z)(this.config.children)===f.vK.F?this.config.children.call(this):this.config.children).map(function(e){return new E(Object.assign({},e,{target:t.node,rootNode:t.rootNode,map:t.map,parentNode:t}),t.map)})),this.toSolve=e.length,this.children=e},E.prototype.setMethods=function(){var t,n=this;Object.keys(this.config).forEach(function(e){(t=e.match(/^method_(\w*)$/i))&&(t[1]in n?console.warn("[WARNING] : method `"+t[0]+" cant be added, would override existing element."):n[t[1]]=n.config[t[0]].bind(n))})},E.prototype.setRef=function(e,t){e?(t||this).map[e]=t||this:(0,l.Z)(this.config.ref)!==f.vK.U&&this.map.add(this.config.ref,this)},E.prototype.setCbs=function(){this.cb=("cb"in this.config&&(0,l.Z)(this.config.cb)===f.vK.F?this.config.cb:this.solve).bind(this)},E.prototype.setStyle=function(e){e&&(this.config.style=Object.assign({},this.config.style,e)),this.config.style&&t.setStyle(this.node,this.config.style)},E.prototype.setAttrs=function(e){e&&(this.config.attrs=Object.assign({},this.config.attrs,e)),this.config.attrs&&t.setAttrs(this.node,this.config.attrs)},E.prototype.setData=function(e){e&&(this.config.data=Object.assign({},this.config.data,e)),this.config.data&&(this.data=this.config.data,t.setData(this.node,this.data))},E.prototype.setText=function(e){(0,l.Z)(e)!==f.vK.U&&(this.config.text=e),(0,l.Z)(this.config.text)!==f.vK.U&&t.setText(this.node,this.config.text)},E.prototype.setHtml=function(e){(0,l.Z)(e)!==f.vK.U&&(this.config.html=e),(0,l.Z)(this.config.html)!==f.vK.U&&t.setHtml(this.node,this.config.html)},E.prototype.killEvent=function(e){d.kill(e)},E.prototype.checkInit=function(e){return"init"in this.config&&(0,l.Z)(this.config.init)===f.vK.F&&(this.config.init.call(this)||this.abort()),this},E.prototype.checkEnd=function(e){var t=this;return"end"in this.config&&(0,l.Z)(this.config.end)===f.vK.F&&this.map.endFunctions.push(function(){t.config.end.call(t)}),this},E.prototype.unhandle=function(e){d.unhandle(e||this.node)},E.prototype.setEvents=function(){var e,n,r,o=this;for(e in o.config)(n=e.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(r=n[3].toLowerCase(),function(t){d[n[1]](o.node,r,function(e){o.config[t].call(o,e)})}(e));return this},E.prototype.setState=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.state[t]=e)},E.prototype.done=E.prototype.solve=function(){var e=[].slice.call(arguments,0);e.length&&this.parentNode.paramsFromChildren.push(e),this.parentNode.toSolve--,this.toSolve<=0&&(this.parent.appendChild(this.node),this.rendered=!0,this.resolve(this))},E.prototype.render=function(){var e,n=this,t=new(a())(function(e,t){n.resolve=e,n.reject=t});return this.rendered=!1,0<this.toSolve?this.children.forEach(function(e,t){e.render().then(function(){n.node.appendChild(e.node),0===n.toSolve&&(n.paramsFromChildren.length?n.cb(n.paramsFromChildren):n.cb())})}):(this.rendered=!0,(e=this.cb(n.paramsFromChildren))&&this.rootNode.paramsFromChildren.push(e)),t},E.prototype.report=function(){var e=JSON.stringify(this.config).length,t=this.node.innerHTML.length;return(t/e).toFixed(2)+" (html:"+t+" / json:"+e+")"},E.isUnode=function(e){return e instanceof E},E.identifier="id";const m=E;var g=__webpack_require__(995),e={};e.solve=function(t,r,o){var i=+new Date;return a().one(function(n,e){new g.Z(t).run().then(function(e){e[1]&&function(e){var t,n=new Array(37).join("-");for(t in console.log(n),console.log("Engy used "+e.elements+" component"+(1===e.elements?"":"s")),console.log("usage: "),e.requested)console.log("> "+t+": "+e.requested[t]+" time"+(1<e.requested[t]?"s":""));console.log("Engy total time: "+e.time+"ms ("+(e.time-e.xhrTot)+" unfolding, "+e.xhrTot+" xhr)"),console.log(n)}(e[1]);var t=+new Date;console.log("Engy process tot: "+(t-i)),n([e[0],r,o])})})};const b=e;var P,v,y,O=0;const T={add:function(e){return O+=e},get:function(){var e=O+0;return O=0,e}};function D(e,t,n){var r,o=+new Date,i=e.target,a=i.innerHTML,c=document.createDocumentFragment(),s=!0,_={abort:function(){return s=!1,i.innerHTML=a,"onAbort"in e&&(0,l.Z)(e.onAbort)===f.vK.F&&e.onAbort.call(null,e),!1},add:function(e,t){_.elements[e]=t},getNode:function(e){return _.elements[e]||!1},getNodes:function(){return _.elements},lateWid:function(e){_.elements[e]=this},elements:{},endFunctions:[],getElement:v,getElements:y},u=new m(Object.assign({},e,{target:c}),_);return!n||n in P||(P[n]=u),!0===t&&(i.innerHTML=""),u.render().then(function(){if(!s)return u;for(i.appendChild(c),r=+new Date,T.add(r-o);_.endFunctions.length;)_.endFunctions.pop()()})}window.hokuto=(P={},{render:D,renderWithComponents:function(e,t,n){return b.solve(e,t,n).then(function(e){return D.apply(null,e)})},cleanup:function(e,t){return D({target:e,children:[{html:t||""}]},!0)},get:function(e){var t=document.createElement("div");return[e.target=t,D(e).value]},preload:function(e){var t=document.createElement("script");document.getElementsByTagName("head")[0].appendChild(t),t.onload=function(){return t.parentNode.removeChild(t)},t.src=e},getElement:v=function(e){return e in P&&P[e]},getElements:y=function(){return P}})})(),module.exports=__webpack_exports__})();