/*!
 * 
 * hokuto
 *
 * version 0.0.9
 * Fri Feb 18 2022 09:01:11 GMT+0100 (Central European Standard Time)
 */(()=>{"use strict";var __webpack_modules__={1:e=>{var r,t,t=(r={},(t=n.prototype).enable=function(){return o(this,!0)},t.disable=function(){return o(this,!1)},t.pub=function(e,t){var n,r=0,o=[];if(t instanceof Array||(t=[t]),!(e in this.topic2cbs&&this.enabled))return e in this.lateTopics?this.lateTopics[e].push({args:t}):this.lateTopics[e]=[{args:t}],null;if("*"in this.topic2cbs)for(r=0,n=this.topic2cbs["*"].length;r<n;r+=1)o.push(this.topic2cbs["*"][r].apply(null,t));for(r=0,n=this.topic2cbs[e].length;r<n;r+=1)o.push(this.topic2cbs[e][r].apply(null,t));return o},t.sub=function(e,t,n){var r,o=0,i=[];if(e in this.topic2cbs&&this.enabled||(this.topic2cbs[e]=[]),this.topic2cbs[e].push(t),n&&e in this.lateTopics){for(o=0,r=this.lateTopics[e].length;o<r;o++)i.push(t.apply(null,this.lateTopics[e][o].args));return i}},t.unsub=function(e,t){var n=0;return e in this.topic2cbs&&0<=(n=this.topic2cbs[e].indexOf(t))&&this.topic2cbs[e].splice(n,1)&&0===this.topic2cbs[e].length&&delete this.topic2cbs[e],e in this.lateTopics&&delete this.lateTopics[e],this},t.once=function(t,n,e){var r=this;return this.sub(t,function e(){return r.unsub(t,e),n.apply(null,Array.prototype.slice.call(arguments,0))},e)},t.reset=function(){var e=Array.prototype.slice.call(arguments,0),t=e.length,n=0;if(!t)return this.topic2cbs={},this.lateTopics={},this;for(;n<t;n+=1)e[n]in this.topic2cbs&&delete this.topic2cbs[e[n]],e[n]in this.lateTopics&&delete this.lateTopics[e[n]];return this},{getChannels:function(e){var t,n={};if("boolean"==typeof e)for(t in r)r[t].enabled===e&&(n[t]=r[t]);else n=r;return n},get:function(e){return e in r||(r[e]=new n),r[e]}});function n(){this.topic2cbs={},this.lateTopics={},this.enabled=!0}function o(e,t){var n=e.enabled;return e.enabled=t,n!==e.enabled}e.exports=t},995:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>Processor});var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__=__webpack_require__(2),_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__=__webpack_require__(671),_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__=__webpack_require__(144),balle__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(969),balle__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(balle__WEBPACK_IMPORTED_MODULE_0__),searchhash__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(945),searchhash__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(searchhash__WEBPACK_IMPORTED_MODULE_1__),_utilities__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(45),_io__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(541),_core__WEBPACK_IMPORTED_MODULE_4__=__webpack_require__(707),_i18n__WEBPACK_IMPORTED_MODULE_5__=__webpack_require__(262),_config__WEBPACK_IMPORTED_MODULE_6__=__webpack_require__(510),components={},preloadedComponents={},cmp404=function(e){return JSON.stringify({tag:"h2",html:"no component found (".concat(e,")")})},Processor=function(){function Processor(e){(0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_7__.Z)(this,Processor),(this.config=e).engy=e.engy||{},this.engyConf={fileNameSeparator:e.engy.fileNameSeparator||_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.PATH_SEPARATOR,fileNamePrepend:e.engy.fileNamePrepend||_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.NAME_PREPEND,ext:e.engy.ext||_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.EXT,componentsUrl:e.engy.componentsUrl||_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.COMPONENTS.URL},this.endPromise=balle__WEBPACK_IMPORTED_MODULE_0___default().one(),this.stats={time:0,elements:0,requested:{},xhrTot:0}}return(0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_8__.Z)(Processor,[{key:"getFileName",value:function(e){var t=e.split(/\/|\|/),n=e,r=this.engyConf,e=t.length-1;return t[e]=r.fileNamePrepend+t[e],n=t.join(r.fileNameSeparator),[r.componentsUrl,r.componentsUrl.match(/\/$/)?"":"/",n,r.ext].join("")}},{key:"run",value:function run(){var self=this,langFunc=_i18n__WEBPACK_IMPORTED_MODULE_5__.Z.parse,elementsN=0,start=+new Date,end,xhrTot=0,requested={},cback,computeStats=_config__WEBPACK_IMPORTED_MODULE_6__.Z.ENGY.STATS;return function solve(){var component=searchhash__WEBPACK_IMPORTED_MODULE_1___default().forKey(self.config,"component",{limit:1}),componentName,cached,preLoaded,xhrStart=0,xhrEnd=0;component.length?(component=component[0],componentName=self.getFileName(component.value),component.value in requested?requested[component.value]++:(requested[component.value]=1,elementsN++),cached=componentName in components,preLoaded=componentName in preloadedComponents,cback=function cback(cntORobj){xhrEnd=+new Date,xhrTot+=xhrEnd-xhrStart;var params=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(component.container+"/params",self.config),obj,usedParams,foundParam,foundParamValue,foundParamValueReplaced,i,l,obj=preLoaded?(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.lc)(cntORobj):(cached||(components[componentName]=(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.lc)(cntORobj)),cntORobj=cntORobj.replace(/^[^{]*/,"").replace(/(;?([\n\s]*)?)$/,""),eval("("+cntORobj+")"));if(params&&(usedParams=searchhash__WEBPACK_IMPORTED_MODULE_1___default().forValue(obj,/#PARAM{([^}|]*)?\|?([^}]*)}/),l=usedParams.length,l))for(i=0;i<l;i++)foundParam=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(usedParams[i].regexp[1],params),foundParamValue=(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__.Z)(foundParam)!==_core__WEBPACK_IMPORTED_MODULE_4__.TF?foundParam:usedParams[i].regexp[2]||"",(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_9__.Z)(foundParamValue).match(/string/i)?(foundParamValueReplaced=(0,_core__WEBPACK_IMPORTED_MODULE_4__.RV)(usedParams[i].path,obj).replace(usedParams[i].regexp[0],foundParamValue),(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.bq)(obj,usedParams[i].path,foundParamValueReplaced)):(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.bq)(obj,usedParams[i].path,foundParamValue);component.container?(0,_utilities__WEBPACK_IMPORTED_MODULE_2__.u1)(self.config,component.container,obj):self.config=obj,solve()},xhrStart=+new Date,preLoaded?cback(preloadedComponents[componentName]):cached?cback(components[componentName]):_io__WEBPACK_IMPORTED_MODULE_3__.Z.get(componentName,cback,!0,null,!0,function(e){cback(cmp404(componentName))})):(end=+new Date,self.stats.time=end-start,self.stats.elements=elementsN,self.stats.requested=requested,self.stats.xhrTot=xhrTot,self.endPromise.resolve([self.config,computeStats&&self.stats]))}(),langFunc&&langFunc(self.config),self.endPromise}}]),Processor}()},45:(e,t,n)=>{n.d(t,{lc:()=>r,u1:()=>_,bq:()=>s});var o=n(2),a=n(707);function i(t,e){var n,r=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)),r}function c(r){for(var e=1;e<arguments.length;e++){var o=null!=arguments[e]?arguments[e]:{};e%2?i(Object(o),!0).forEach(function(e){var t,n;t=r,e=o[n=e],n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(o)):i(Object(o)).forEach(function(e){Object.defineProperty(r,e,Object.getOwnPropertyDescriptor(o,e))})}return r}var r=function e(t){if(null==t||"object"!==(0,o.Z)(t))return t;var n,r=t.constructor();for(n in t)t.hasOwnProperty(n)&&(r[n]=e(t[n]));return r},s=function(e,t,n){for(var r=t.split(/\.|\//),o=r.length,i=0;i<o-1;)e=e[r[i++]];e[r[o-1]]=n},_=function(e,t,n){var r,o=(0,a.RV)(t,e),i=c({},n);for(r in o)r.match(/component|params/)||(i[r]=o[r]);s(e,t,i)}},510:(e,t,n)=>{n.d(t,{Z:()=>r});const r={AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!0,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"Widgzard",NAME:"Widgzard",VERSION:{WIDGZARD:"2.0.0",ENGY:"1.0.0"}}},251:(e,t,n)=>{n.d(t,{Z:()=>r});var c=n(707);var s={enabled:!0,cookie_nocookiesaround:!1,initCheck:function(){return c.W.navigator.cookieEnabled},set:function(e,t,n,r,o,i){if(!s.enabled)return!1;this.cookie_nocookiesaround=!1;var a=new Date,a=new Date(a.getTime()+n);return c.WD.cookie=[e,"=",c.W.escape(t),n?";expires="+a.toGMTString():"",r?";path="+r:"",o?";domain="+o:"",i?";secure":""].join(),!0},get:function(e){var t=c.WD.cookie.split(";"),n=t.length,r="",o="",i=!1,a=0;if(!NS.LIB.cookie.enabled)return!1;for(;a<n;a+=1){if((r=t[a].split("="))[0].replace(/^\s+|\s+$/g,"")===e)return i=!0,o=1<r.length?c.W.unescape(r[1].replace(/^\s+|\s+$/g,"")):o;r=null}return i},del:function(e,t,n){if(!s.enabled)return!1;var r=!1;return this.get(e)&&(c.WD.cookie=[e,"=",t?";path="+t:"",n?";domain="+n:"",";expires=Thu, 01-Jan-1970 00:00:01 GMT"].join(""),r=!0),r},delall:function(){if(!s.enabled)return!1;for(var e,t=c.WD.cookie.split(/;/),n=t.length,r=0;r<n;r+=1)e=t[r].split(/=/),this.del(e[0],!1,!1);return this.cookie_nocookiesaround=!0},getall:function(){return!!s.enabled&&(""===c.WD.cookie||this.cookie_nocookiesaround?[]:c.WD.cookie.split(";").forEach(function(e){e=e.split("=");return{name:e[0],value:e[1]}}))}};const r=s},707:(e,t,n)=>{n.d(t,{W:()=>a,TF:()=>c,WD:()=>r,vK:()=>o,RV:()=>s,ZT:()=>_});var i=n(2),a=window,c="undefined",r=a.document,n=a.history,o={U:c,F:"function"},s=function(e,t){var n=(e=e.replace(/^\//,"")).split(/\.|\//),r=n.length,o=0;if(t=(0,i.Z)(t)!==c?t:a,!e)return t;for(;o<r;o+=1){if((0,i.Z)(t[n[o]])===c)return;t=t[n[o]]}return t},_=function(){}},262:(e,t,n)=>{n.d(t,{Z:()=>o});var i=n(2);var t=n(945),a=n.n(t),c=n(707),n=n(510),r={},s={lang:n.Z.lang,check:function(e){return e.match(/i18n\(([^}|]*)?\|?([^}]*)\)/)},dynamicLoad:function(e,t){for(t in e)s.lang in e[t]&&(r[t]=e[t][s.lang])},get:function(e,t){return(0,c.RV)(e,r)||t||"no Value"},load:function(e){!function(e){throw new TypeError('"'+e+'" is read-only')}("data")},parse:function(e){for(var t,n=a().forValue(e,/i18n\(([^}|]*)?\|?([^}]*)\)/),r=n.length,o=0;o<r;o++)(0,i.Z)(n[o].regexp).match(/boolean/i)||(t=s.check(n[o].regexp[0]))&&((0,c.RV)(n[o].container,e)[n[o].key]=s.get(t[1],t[2]))}};const o=s},541:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__=__webpack_require__(2),_core__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__(707),_cookie__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__(251),_object__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__(247),xdr=(0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_3__.Z)(_core__WEBPACK_IMPORTED_MODULE_0__.W.XDomainRequest)!==_core__WEBPACK_IMPORTED_MODULE_0__.vK.U&&document.all&&!navigator.userAgent.match(/opera/i),_={getxhr:function(e){var t,n=0,r=["Msxml2.XMLHTTP","Msxml3.XMLHTTP","Microsoft.XMLHTTP"],o=r.length;if(xdr&&e.cors)t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.XDomainRequest;else try{t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.XMLHttpRequest}catch(e){for(;n<o;n+=1)try{t=new _core__WEBPACK_IMPORTED_MODULE_0__.W.ActiveXObject(r[n])}catch(e){continue}t||_core__WEBPACK_IMPORTED_MODULE_0__.W.alert("No way to initialize XHR")}return t},setHeaders:function(e,t){e.setRequestHeader("Accept",({xml:"text/xml",html:"text/html",json:"application/json"}[t]||"text/html")+"charset=utf-8")},setMultipartHeader:function(e){return e.setRequestHeader("Content-Type","multipart/form-data")},setCookiesHeaders:function(e){for(var t=_cookie__WEBPACK_IMPORTED_MODULE_1__.Z.getall(),n=t.length,r=0;r<n;)e.setRequestHeader("Cookie",t[r].name+"="+t[r].value),r++},ajcall:function(e,t){var n,r,o,i,a=t&&t.method||"POST",c=t&&t.cback,s=t&&t.opened||_core__WEBPACK_IMPORTED_MODULE_0__.ZT,u=t&&t.loading||_core__WEBPACK_IMPORTED_MODULE_0__.ZT,l=t&&t.error||_core__WEBPACK_IMPORTED_MODULE_0__.ZT,f=t&&t.abort||_core__WEBPACK_IMPORTED_MODULE_0__.ZT,p=t&&t.sync,h=t&&t.type||"text/html",d=!t||void 0===t.cache||t.cache,E="xml"===h?"responseXML":"responseText",m=t&&t.timeout||1e4,b=t&&t.hasFiles,g=_.getxhr(t),P=t&&t.data||{},O=!1,y=!1;if(d||(P.C=+new Date),"GET"===a)P=_object__WEBPACK_IMPORTED_MODULE_2__.Z.toQs(P).substr(1);else{for(i in n=new _core__WEBPACK_IMPORTED_MODULE_0__.W.FormData,P)P.hasOwnProperty(i)&&n.append(i,P[i]);P=n}if(xdr&&t.cors)g.open(a,"GET"===a?e+(P?"?"+P:""):e),g.onerror=l,g.ontimeout=function(){},g.onprogress=function(e){e.lengthComputable&&(e=e.loaded/e.total*100,console.log(e+"% uploaded"))},g.onload=function(){c(g.responseText)},g.timeout=m,_.setHeaders(g,b,h),g.contentType=i={xml:"text/xml",html:"text/html",json:"application/json"}[h]||"text/html",window.setTimeout(function(){g.send()},20);else{g.onreadystatechange=function(){if(y===g.readyState)return!1;if(y=g.readyState,404==g.status||4===parseInt(g.readyState,10)&&0===parseInt(g.status,10))return g.onerror({error:404,xhr:g,url:e}),g.abort(),!1;if("complete"===y||4===parseInt(y,10)&&200===parseInt(g.status,10))return O=!0,404===parseInt(g.status,10)?(g.onerror.call(g),!1):(c&&(r=g[E],c(r)),o=g[E],_core__WEBPACK_IMPORTED_MODULE_0__.W.setTimeout(function(){g=null},50),o);if(3===y)u(g);else if(2===y)s(g);else if(1===y)switch(b?_.setHeaders(g,"json"):_.setHeaders(g,h),a){case"POST":case"PUT":try{g.send(P||!0)}catch(e){}break;case"DELETE":case"GET":try{g.send(null)}catch(e){}break;default:_core__WEBPACK_IMPORTED_MODULE_0__.W.alert(a),g.send(null)}return!0},g.onerror=function(){l&&l.apply(null,arguments)},g.onabort=function(){f&&f.apply(null,arguments)},g.open(a,"GET"===a?e+(P?"?"+P:""):e,p),_core__WEBPACK_IMPORTED_MODULE_0__.W.setTimeout(function(){O||(O=!0,g.abort())},m);try{return"responseXML"==E?g[E].childNodes[0]:g[E]}catch(e){}}return!0}};const __WEBPACK_DEFAULT_EXPORT__={getxhr:_.getxhr,post:function post(uri,_cback,sync,data,cache,files,error){return _.ajcall(uri,{cback:function cback(r){files?(r=r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm,""),_cback(_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON&&_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON.parse?JSON.parse(r):eval(["(",r,")"].join("")))):_cback(r)},method:"POST",sync:sync,data:data,cache:cache,error:error,hasFiles:!!files})},get:function(e,t,n,r,o,i){return _.ajcall(e,{cback:t||_core__WEBPACK_IMPORTED_MODULE_0__.ZT,method:"GET",sync:n,data:r,cache:o,error:i})},put:function(e,t,n,r,o,i){return _.ajcall(e,{cback:t,method:"PUT",sync:n,data:r,cache:o,error:i})},getJson:function getJson(uri,_cback2,data,cors){return _.ajcall(uri,{type:"json",method:"GET",sync:!1,cback:function cback(r){r=r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm,""),_cback2(_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON&&_core__WEBPACK_IMPORTED_MODULE_0__.W.JSON.parse?JSON.parse(r):eval(["(",r,")"].join("")))},data:data,cors:!!cors})},getXML:function(e,t){return _.ajcall(e,{method:"GET",sync:!1,type:"xml",cback:t||_core__WEBPACK_IMPORTED_MODULE_0__.ZT})}}},247:(e,t,o)=>{o.d(t,{Z:()=>n});var i=o(2),r=o(707),a={extract:function(e,t){var n,r=t||(void 0!==o.g?o.g:"undefined"!=typeof window?window:void 0);for(n in e)e.hasOwnProperty(n)&&(r[n]=e[n])},fromQs:function(){for(var e,t=document.location.search.substr(1).split("&"),n=t.length,r=0,o=[];r<n;r+=1)o[(e=t[r].split("="))[0]]||(o[e[0]]=decodeURIComponent(e[1]));return o},clone:function(e){var t,n,r;if(null===e||"object"!==(0,i.Z)(e))return e;if(e instanceof Date)return(t=new Date).setTime(e.getTime()),t;if(e instanceof Array){for(t=[],n=0,r=e.length;n<r;n++)t[n]=a.clone(e[n]);return t}if(e instanceof Object){for(n in t={},e)e.hasOwnProperty(n)&&(t[n]=a.clone(e[n]));return t}throw new Error("Unable to copy obj! Its type isn't supported.")},extend:function(e,t,n){var r,o=a.clone(e);for(r in t)!t.hasOwnProperty(r)||r in o&&!n||(o[r]=t[r]);return o},keyize:function(e,t){for(var n={},r=0,o=e.length;r<o;r++)t in e[r]&&!(e[r][t]in n)&&(n[e[r][t]]=e[r]);return n},isString:function(e){return"string"==typeof e||e instanceof String},jCompare:function(e,t){return n=e,("object"===("undefined"==typeof Node?"undefined":(0,i.Z)(Node))?n instanceof W.Node:n&&"object"===(0,i.Z)(n)&&"number"==typeof n.nodeType&&"string"==typeof n.nodeName)||("undefined"==typeof JSON?"undefined":(0,i.Z)(JSON))===r.TF?e===t:JSON.stringify(e)===JSON.stringify(t);var n},toQs:function(e){return function(e,t){var n,r="";for(n in e)e.hasOwnProperty(n)&&(r+=t(e,n,r));return r}(e,function(e,t,n){return[n?"&":"?",encodeURIComponent(t),"=",encodeURIComponent(e[t])].join("").replace(/'/g,"%27")})}};const n=a},969:e=>{function r(e){var t=this,n=!1;this.status=r.STATUSES.PENDING,this.value=null,this.cause=null,this.resolvers=this.resolvers||[],this.rejectors=this.rejectors||[],this.finalizers=this.finalizers||[],e=e||function(){};try{e(function(e){n||t.status!==r.STATUSES.PENDING||(n=!0,t.status=r.STATUSES.FULFILLED,t.value=e,r.roll(t.resolvers,"value",t),r.roll(t.finalizers,"value",t))},function(e){n||t.status!==r.STATUSES.PENDING||(n=!0,t.status=r.STATUSES.REJECTED,t.cause=e,r.roll(t.rejectors,"cause",t),r.roll(t.finalizers,"cause",t))})}catch(e){return r.reject(e.message)}return this}r.roll=function(e,t,n){e.forEach(function(e){e(n[t])},n)},r.prototype.resolve=function(n){return r.call(this,function(e,t){return e(n)})},r.prototype.reject=function(n){return r.call(this,function(e,t){return t(n)})},r.prototype.launch=function(e){return r.call(this,e)},r.prototype.then=function(e,t){switch(this.status){case r.STATUSES.REJECTED:r.roll(this.rejectors,"cause",this);break;case r.STATUSES.PENDING:this.resolvers.push(e),t&&this.rejectors.push(t);break;case r.STATUSES.FULFILLED:e(this.value)}return this},r.prototype.catch=function(e){switch(this.status){case r.STATUSES.PENDING:this.rejectors.push(e);break;case r.STATUSES.REJECTED:return e.call(this,this.cause)}return this},r.prototype.finally=function(e){return this.finalizers.push(e),this.status!==r.STATUSES.PENDING&&r.roll(this.finalizers,"value",this),this},r.STATUSES={PENDING:"PENDING",FULFILLED:"FULFILLED",REJECTED:"REJECTED"},r._isFunc=function(e){return"function"==typeof e},r._isIterable=function(e){return null!=e&&r._isFunc(e[Symbol.iterator])},r.one=function(e){return new r(e)},r.all=function(e){if(!r._isIterable(e))return r.reject("Balle.all acceps an Iterable Promise only");var o=[],i=e.length,a=0;return new r(function(n,r){e.forEach(function(e,t){"REJECTED"==e.status&&r(e.cause),e.then(function(e){a++,o[t]=e,a==i&&n(o)}).catch(r)})})},r.race=function(e){return r._isIterable(e)?new r(function(t,n){e.forEach(function(e){e.then(t).catch(n)})}):r.reject("Balle.race acceps an Iterable Promise only")},r.chain=function(i){if(!r._isIterable(i))return r.reject("Balle.chain acceps an Iterable Promise only");var a=i.length;return new r(function(r,o){!function t(n,e){return n===a?r(e):i[n](e).then(function(e){t(++n,e)}).catch(function(e){o(e)})}(0)})},r.reject=function(n){return new r(function(e,t){return t(n)})},r.resolve=function(n){return new r(function(e,t){n instanceof r?n.then(e).catch(t):e(n)})},e.exports=r},945:e=>{function h(e){return e instanceof RegExp}function r(e,s,t,_){if(n=s,o=String(n)!==n,i=n===Object(n),a="function"!=typeof n,n={}.toString.call(n).match(/\[object\sObject\]/),!(o&&i&&a&&n&&n.length||(a=s,n={}.toString.call(a).match(/\[object\sArray\]/),String(a)!==a&&n&&n.length)))throw new Error("BAD PARAM: must search into an object or an array");function r(e,t){return("string"==typeof(n=e)||n instanceof String)&&h(t)?e.match(t):(t=t,JSON.stringify(e)===JSON.stringify(t)&&!h(t));var n}function c(e,t,n,r,o){var i=[].concat.call(e,[t]),a=l(t,r[t],n),c=_.min<=o&&o<=_.max,e=i.length;c&&a&&(f.push({obj:r,value:r[t],key:i[e-1],parentKey:i[e-2],path:i.join("/"),getter:function(){return i.reduce(function(e,t){return e[t]},s)},container:i.slice(0,e-1).join("/"),parentContainer:i.slice(0,e-2).join("/"),regexp:a,level:o}),u++),p(r[t],n,i,o+1)}var n,o,i,a,u=0,l={key:function(e,t,n){return"function"==typeof n?n(e):r(e,n)},value:function(e,t,n){return"function"==typeof n?n(t):r(t,n)},keyvalue:function(e,t,n){return("function"==typeof n.key&&n.key(e)||r(e,n.key))&&("function"==typeof n.value&&n.value(t)||r(t,n.value))}}[e],f=[],p=function(e,t,n,r){var o,i,a;if((o=e)&&"object"==typeof o&&void 0!==o.nodeType&&1===o.nodeType&&"string"==typeof o.nodeName)console.log("ELEMENT");else if(e instanceof Array)for(i=0,a=e.length;i<a&&(c(n,i,t,e,r),_.limit!==u);i++);else if("object"==typeof e)for(i in e)if(c(n,i,t,e,r),_.limit===u)break};return _.limit="limit"in _?~~_.limit:1/0,_.min="min"in _?~~_.min:0,_.max="max"in _?~~_.max:1/0,0===_.limit?f:(_.min=_.min<0?0:_.min,_.max<_.min&&(e=_.min,_.min=_.max,_.max=e),p(s,t,[],0),_.sorter?f.sort(_.sorter):f)}e.exports={forKey:function(e,t,n){return r("key",e,t,n||{})},forValue:function(e,t,n){return r("value",e,t,n||{})},forKeyValue:function(e,t,n){return r("keyvalue",e,t,n||{})}}},671:(e,t,n)=>{n.d(t,{Z:()=>function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}})},144:(e,t,n)=>{function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,{Z:()=>function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e}})},2:(e,t,n)=>{function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}n.d(t,{Z:()=>r})}},__webpack_module_cache__={};function __webpack_require__(e){var t=__webpack_module_cache__[e];if(void 0!==t)return t.exports;t=__webpack_module_cache__[e]={exports:{}};return __webpack_modules__[e](t,t.exports,__webpack_require__),t.exports}__webpack_require__.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return __webpack_require__.d(t,{a:t}),t},__webpack_require__.d=(e,t)=>{for(var n in t)__webpack_require__.o(t,n)&&!__webpack_require__.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},__webpack_require__.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),__webpack_require__.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),__webpack_require__.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var __webpack_exports__={};(()=>{__webpack_require__.r(__webpack_exports__);var _=__webpack_require__(2),e=__webpack_require__(1),t=__webpack_require__.n(e),u=__webpack_require__(707);(0,_.Z)(Object.assign)!==u.vK.F&&Object.defineProperty(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),r=1,o=arguments.length;r<o;r++){var i=arguments[r];if(null!=i)for(var a in i)!{}.hasOwnProperty.call(i,a)||(n[a]=i[a])}return n},writable:!0,configurable:!0});var e=__webpack_require__(969),a=__webpack_require__.n(e),r=["innerHTML","style","dataset","className"];const n={remove:function(e){return e.parentNode&&e.parentNode.removeChild(e)},setText:function(e,t){e.appendChild(document.createTextNode(t))},setHtml:function(e,t){e.innerHTML=""+t},setStyle:function(e,t){if((0,_.Z)(t)===u.vK.U)throw new Error("ERR: styles needed");for(var n in t)"float"===n?e.style[n.replace(/^float$/i,"cssFloat")]=t[n]:e.style[n]=t[n]},setAttrs:function(e,t){if((0,_.Z)(t)===u.vK.U)throw new Error("ERR: attrs needed");for(var n in t)r.indexOf(n)<0&&e.setAttribute(n,t[n])},unsetAttrs:function(e,t){if((0,_.Z)(t)===u.vK.U)throw new Error("ERR: attrs needed");for(var n in t)r.indexOf(n)<0&&e.removeAttribute(n,t[n])},setData:function(e,t){if((0,_.Z)(t)===u.vK.U)throw new Error("ERR: data needed");for(var n in t)e.dataset[n]=t[n]},unsetData:function(e,t){if((0,_.Z)(t)===u.vK.U)throw new Error("ERR: data needed");for(var n in t)delete e.dataset[n]}};var i={events:{getElementDeterminant:function(e){return e.tagName.match(/input|textarea|select/i)?"value":"innerHTML"},getElementEvent:function(e){return e.tagName.match(/input|textarea/i)?"input":"change"}},unhandlers:{},bindErr:function(e){return"No straight way to ".concat(e?"":"un","bind an event")}};var c="addEventListener"in u.W?function(e,t,n,r){e.addEventListener.apply(e,[t,n,r=r||!1]),o(e,t,n)}:"attachEvent"in u.W?function(e,t,n){e.attachEvent.apply(e,["on"+t,n]),o(e,t,n)}:function(){throw new Error(bindErr(1))},s="removeEventListener"in u.W?function(e,t,n){e.removeEventListener(t,n)}:"detachEvent"in u.W?function(e,t,n){e.detachEvent.apply(e,["on"+t,n])}:function(){throw new Error(bindErr(0))},e=function(){var e,t,n=this,r="complete",o=setInterval(function(){if(document.readyState===r)for(clearInterval(o),e=0,t=i.length;e<t;e++)i[e].call(this)},10),i=[];return function(e){document.readyState===r?e.call(n):i.push(e)}}();function o(e,t,n){var r,o;r=e,o=function(){s(e,t,n)},i.unhandlers[r]=i.unhandlers[r]||[],i.unhandlers[r].push(o)}const l={on:c,off:s,kill:function(e){return e||((e=u.W.event).cancelBubble=!0,e.returnValue=!1),"stopPropagation"in e&&e.stopPropagation(),e.preventDefault(),!1},once:function(n,r,o){c(n,r,function e(t){o.call(n,t),s(n,r,e)})},eventTarget:function(e){var t=(e=e||u.W.event).currentTarget||(0,_.Z)(e.target)!==TYPES.U?e.target:e.srcElement;if(!t)return!1;for(;3===t.nodeType&&null!==t.parentNode;)t=t.parentNode;return t},ready:e,unhandle:function(e){i.unhandlers[e]&&i.unhandlers[e].forEach(function(e){e()}),i.unhandlers=[]}};function f(e,t){this.config=e,this.map=t,this.parent=e.target,this.tag=e.tag||"div",this.node=this.config.ns?document.createElementNS(e.ns,this.tag):document.createElement(this.tag),this.rendered=!1,this.toSolve=0,this.state="state"in e?e.state:{},this.data="data"in e?e.data:{},this.init="init"in e&&e.init,this.rootNode="rootNode"in e?e.rootNode:this,this.parentNode="parentNode"in e?e.parentNode:this,this.paramsFromChildren=[],this.root=this.map.rootNode,this.abort=this.map.abort,this.getNode=this.map.getNode,this.getNodes=this.map.getNodes,this.lateWid=this.map.lateWid,this.getElements=this.map.getElements,this.getElement=this.map.getElement,this.resolve=function(){},this.reset=function(){},this.setMethods(),this.prepareState(),this.initialize(),this.checkInit(),this.checkEnd()}f.prototype.prepareState=function(){var e="state"in this.config?this.config.state:{};this.state=(0,_.Z)(e)===u.vK.F?e.call(this):e},f.prototype.initialize=function(){this.rendered=!1,this.setCall("Ref,Events,Text,Html,Style,Attrs,Data,Children,Cbs"),(0,_.Z)(this.config[f.identifier])!==u.vK.U&&(0,_.Z)(this.config.map.elements[this.config[f.identifier]])===u.vK.U&&this.map.add(this.config[f.identifier],this)},f.prototype.setCall=function(e){var t=this;e.split(/,/).forEach(function(e){t["set"+e]()})},f.prototype.cleanup=function(){this.node.innerHTML="",this.node.parentNode.removeChild(this.node)},f.prototype.setChildren=function(){var t=this,e=[];"children"in this.config&&(e=((0,_.Z)(this.config.children)===u.vK.F?this.config.children.call(this):this.config.children).map(function(e){return new f(Object.assign({},e,{target:t.node,rootNode:t.rootNode,map:t.map,parentNode:t}),t.map)})),this.toSolve=e.length,this.children=e},f.prototype.setMethods=function(){var t,n=this;Object.keys(this.config).forEach(function(e){(t=e.match(/^method_(\w*)$/i))&&(t[1]in n?console.warn("[WARNING] : method `"+t[0]+" cant be added, would override existing element."):n[t[1]]=n.config[t[0]].bind(n))})},f.prototype.setRef=function(e,t){e?(t||this).map[e]=t||this:(0,_.Z)(this.config.ref)!==u.vK.U&&this.map.add(this.config.ref,this)},f.prototype.setCbs=function(){this.cb=("cb"in this.config&&(0,_.Z)(this.config.cb)===u.vK.F?this.config.cb:this.solve).bind(this)},f.prototype.setStyle=function(e){e&&(this.config.style=Object.assign({},this.config.style,e)),this.config.style&&n.setStyle(this.node,this.config.style)},f.prototype.setAttrs=function(e){e&&(this.config.attrs=Object.assign({},this.config.attrs,e)),this.config.attrs&&n.setAttrs(this.node,this.config.attrs)},f.prototype.setData=function(e){e&&(this.config.data=Object.assign({},this.config.data,e)),this.config.data&&(this.data=this.config.data,n.setData(this.node,this.data))},f.prototype.setText=function(e){(0,_.Z)(e)!==u.vK.U&&(this.config.text=e),(0,_.Z)(this.config.text)!==u.vK.U&&n.setText(this.node,this.config.text)},f.prototype.setHtml=function(e){(0,_.Z)(e)!==u.vK.U&&(this.config.html=e),(0,_.Z)(this.config.html)!==u.vK.U&&n.setHtml(this.node,this.config.html)},f.prototype.killEvent=function(e){l.kill(e)},f.prototype.checkInit=function(e){return"init"in this.config&&(0,_.Z)(this.config.init)===u.vK.F&&(this.config.init.call(this)||this.abort()),this},f.prototype.checkEnd=function(e){var t=this;return"end"in this.config&&(0,_.Z)(this.config.end)===u.vK.F&&this.map.endFunctions.push(function(){t.config.end.call(t)}),this},f.prototype.unhandle=function(e){l.unhandle(e||this.node)},f.prototype.setEvents=function(){var e,n,t,r=this;for(t in r.config)(e=t.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(n=e[3].toLowerCase(),function(t){l[e[1]](r.node,n,function(e){return r.config[t].call(r,e)})}(t));return this},f.prototype.setState=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.state[t]=e)},f.prototype.dox=function(){alert("x")},f.prototype.done=f.prototype.solve=function(){var e=this.node,t=[].slice.call(arguments,0);t.length&&this.parentNode.paramsFromChildren.push(t),this.parentNode.toSolve--,this.toSolve<=0&&(this.node.parentNode?(this.setData(),this.parent.replaceChild(e,this.node)):this.parent.appendChild(this.node),this.rendered=!0,this.resolve(this))},f.prototype.render=function(){var e,n=this,t=new(a())(function(e,t){n.resolve=e,n.reject=t});return this.rendered=!1,0<this.toSolve?this.children.forEach(function(e,t){e.render().then(function(){n.node.appendChild(e.node),0===n.toSolve&&(n.paramsFromChildren.length?n.cb(n.paramsFromChildren):n.cb())})}):(this.rendered=!0,(e=this.cb(n.paramsFromChildren))&&this.rootNode.paramsFromChildren.push(e)),t},f.prototype.report=function(){var e=JSON.stringify(this.config).length,t=this.node.innerHTML.length;return(t/e).toFixed(2)+" (html:"+t+" / json:"+e+")"},f.isUnode=function(e){return e instanceof f},f.identifier="id";const p=f;var h,d=__webpack_require__(995);const E={solve:function(e,r,o){var i=+new Date;return a().one(function(n){return new d.Z(e).run().then(function(e){e[1]&&function(e){var t,n=new Array(37).join("-");for(t in console.log(n),console.log("Engy used "+e.elements+" component"+(1===e.elements?"":"s")),console.log("usage: "),e.requested)console.log("> "+t+": "+e.requested[t]+" time"+(1<e.requested[t]?"s":""));console.log("Engy total time: "+e.time+"ms ("+(e.time-e.xhrTot)+" unfolding, "+e.xhrTot+" xhr)"),console.log(n)}(e[1]);var t=+new Date;console.log("Engy process tot: "+(t-i)),n([e[0],r,o])})})}};function m(e,t,n){var r=!0,o=e.target,i=o.innerHTML,a=document.createDocumentFragment(),c={abort:function(){return r=!1,o.innerHTML=i,"onAbort"in e&&(0,_.Z)(e.onAbort)===u.vK.F&&e.onAbort.call(null,e),!1},add:function(e,t){c.elements[e]=t},getNode:function(e){return c.elements[e]||!1},getNodes:function(){return c.elements},lateWid:function(e){c.elements[e]=this},elements:{},endFunctions:[],getElement:b,getElements:g},s=new p(Object.assign({},e,{target:a}),c);return!n||n in h||(h[n]=s),!0===t&&(o.innerHTML=""),s.render().then(function(){if(!r)return s;for(o.appendChild(a);c.endFunctions.length;)c.endFunctions.pop()()})}function b(e){return e in h&&h[e]}function g(){return h}window.hokuto=(h={},{render:m,renderWithComponents:function(e,t,n){return E.solve(e,t,n).then(function(e){return m.apply(null,e)})},cleanup:function(e,t){return m({target:e,children:[{html:t||""}]},!0)},get:function(e){var t=document.createElement("div");return[e.target=t,m(e).value]},preload:function(e){var t=document.createElement("script");document.getElementsByTagName("head")[0].appendChild(t),t.onload=function(){return t.parentNode.removeChild(t)},t.src=e},getElement:b,getElements:g,channel:t()})})(),module.exports=__webpack_exports__})();