'use strict';
/*
    *        *
    


               *
        *
        
        
      *  
    

    *



      *

北斗

hokuto v. 0.0.25

with ~21.98KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto=function(t){function e(t,e){var n=this;this.config=t,this.clearTarget=e,this.rendered=!!t.rendered,this.frag=document.createDocumentFragment(),this.target=this.config.target||document.body,
this.children=this.config.children||[],this.childrenKnots=[],this.debt=~~this.children.length,this.solved=0===this.debt,this.cb=this.config.cb||r,this.parentKnot=this.config.parentKnot||null,
this.rootKnot=this.config.rootKnot||this,this.initCheck=this.config.initCheck||r,this.abort=this.config.abort||r,this.aborted=!1,this.ender=!1,this.state="state"in t?t.state:{},
this.nodes=t.nodes||this.rootKnot.nodes,this.rootNodeUnhandlersCollector=[],this.unhandlers={},this.abort.call(this).then().catch(function(){n.rootKnot.aborted=!0}),this.initTag(),this.initialize()}
function n(t){if(!i.utils.type.isDefined(t)||!i.utils.type.isDefined(t.config))throw"Nothing to render";var n=t.config,o=!!t.clear,r=t.name,s=t.vanish,u=document.currentScript,f=u&&u.parentNode
;return i.solve(n).then(function(t){return"target"in t||!f||(t.target=f),t.endFunctions=[],t.nodes=c,new e(t,o).render().then(function(t){return r&&(a[r]=t),t}).finally(function(){s&&f.removeChild(u)
})})}function o(t){var e=document.createElement("div");return t.target=e,n(t)}var i={W:t,_U_:"undefined",WD:t.document,H:t.history,TYPES:{U:"undefined",F:"function"},noop:function(){},CONFIG:{},ns:{},
dom:{},events:{},history:{},i18n:{},io:{},utils:{}};!function(t){"use strict";var e=function(){function t(t,e){return JSON.stringify(t)===JSON.stringify(e)&&!n(e)}function e(t){
return"string"==typeof t||t instanceof String}function n(t){return t instanceof RegExp}function o(t){
var e=String(t)!==t,n=t===Object(t),o="function"!=typeof t,i={}.toString.call(t).match(/\[object\sObject\]/);return e&&n&&o&&!(!i||!i.length)}function i(t){
var e={}.toString.call(t).match(/\[object\sArray\]/);return String(t)!==t&&!(!e||!e.length)}function r(t){return t&&"object"==typeof t&&void 0!==t.nodeType&&1===t.nodeType&&"string"==typeof t.nodeName
}function s(s,a,c,u){if(!o(a)&&!i(a))throw new Error("BAD PARAM: must search into an object or an array");var f,l=0,h=function(o,i){return e(o)&&n(i)?o.match(i):t(o,i)},d={key:function(t,e,n){
return"function"==typeof n?n(t):h(t,n)},value:function(t,e,n){return"function"==typeof n?n(e):h(e,n)},keyvalue:function(t,e,n){
return("function"==typeof n.key&&n.key(t)||h(t,n.key))&&("function"==typeof n.value&&n.value(e)||h(e,n.value))}}[s],p=[],g=function(t,e,n,o,i){
var r=[].concat.call(t,[e]),s=d(e,o[e],n),c=u.min<=i&&i<=u.max,f=r.length;c&&s&&(p.push({obj:o,value:o[e],key:r[f-1],parentKey:r[f-2],path:r.join("/"),getter:function(){return r.reduce(function(t,e){
return t[e]},a)},container:r.slice(0,f-1).join("/"),parentContainer:r.slice(0,f-2).join("/"),regexp:s,level:i}),l++),m(o[e],n,r,i+1)},m=function(t,e,n,o){if(!r(t)){var i,s
;if(t instanceof Array)for(i=0,s=t.length;i<s&&(g(n,i,e,t,o),u.limit!==l);i++);else if("object"==typeof t)for(i in t)if(g(n,i,e,t,o),u.limit===l)break}};return u.limit="limit"in u?~~u.limit:1/0,
u.min="min"in u?~~u.min:0,u.max="max"in u?~~u.max:1/0,0===u.limit?p:(u.min=u.min<0?0:u.min,u.max<u.min&&(f=u.min,u.min=u.max,u.max=f),m(a,c,[],0),u.sorter?p.sort(u.sorter):p)}return{
forKey:function(t,e,n){return s("key",t,e,n||{})},forValue:function(t,e,n){return s("value",t,e,n||{})},forKeyValue:function(t,e,n){return s("keyvalue",t,e,n||{})}}}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=e),t.searchHash=e}(i),function(t){"use strict";var e=function(){var t={},e=function(t,e){return t.indexOf(e)},n=function(){
this.topic2cbs={},this.lateTopics={},this.enabled=!0},o=function(t,e){var n=t.enabled;return t.enabled=e,n!==t.enabled},i=n.prototype;return i.enable=function(){return o(this,!0)},
i.disable=function(){return o(this,!1)},i.pub=function(t,e){var n,o=0,i=[];if(e instanceof Array||(e=[e]),!(t in this.topic2cbs&&this.enabled))return t in this.lateTopics?this.lateTopics[t].push({
args:e}):this.lateTopics[t]=[{args:e}],null;if("*"in this.topic2cbs)for(o=0,n=this.topic2cbs["*"].length;o<n;o+=1)i.push(this.topic2cbs["*"][o].apply(null,e));for(o=0,
n=this.topic2cbs[t].length;o<n;o+=1)i.push(this.topic2cbs[t][o].apply(null,e));return i},i.sub=function(t,e,n){var o,i=0,r=[];if(t in this.topic2cbs&&this.enabled||(this.topic2cbs[t]=[]),
this.topic2cbs[t].push(e),n&&t in this.lateTopics){for(i=0,o=this.lateTopics[t].length;i<o;i++)r.push(e.apply(null,this.lateTopics[t][i].args));return r}},i.unsub=function(t,n){var o=0
;return t in this.topic2cbs&&(o=e(this.topic2cbs[t],n))>=0&&this.topic2cbs[t].splice(o,1)&&0===this.topic2cbs[t].length&&delete this.topic2cbs[t],t in this.lateTopics&&delete this.lateTopics[t],this},
i.once=function(t,e,n){function o(){return i.unsub(t,o),e.apply(null,Array.prototype.slice.call(arguments,0))}var i=this;return this.sub(t,o,n)},i.reset=function(){
var t=Array.prototype.slice.call(arguments,0),e=t.length,n=0;if(!e)return this.topic2cbs={},this.lateTopics={},this;for(null;n<e;n+=1)t[n]in this.topic2cbs&&delete this.topic2cbs[t[n]],
t[n]in this.lateTopics&&delete this.lateTopics[t[n]];return this},{getChannels:function(e){var n,o={};if("boolean"==typeof e)for(n in t)t[n].enabled===e&&(o[n]=t[n]);else o=t;return o},
get:function(e){return e in t||(t[e]=new n),t[e]}}}();"object"==typeof exports&&(module.exports=e),t.channeljs=e}(i),function(t){"use strict";var e={};!function(t,e){
var n=function(){},o=function(t,e){var n=Object.assign({},t);for(var o in e)e.hasOwnProperty(o)&&(n[o]=e[o]);return n},i=function(t){
var i=t.url,r=t.timeout||0,s=t.user||null,a=t.password||null,c=t.responseType,u=t.contentType,f=t.body||null,l=t.method,h=t.onCompleted||n,d=t.onLoad||n,p=t.onError||n,g=t.onAbort||n,m=t.onProgress||n,y=t.onLoadend||n,v=t.onLoadstart||n,b=t.onTimeout||n,E=t.headers||{},T=!!t.withCredentials,N=new XMLHttpRequest,S=!1
;N.responseType=c,N.withCredentials=T,N.timeout=r||null,N.addEventListener("load",d),N.addEventListener("progress",m),N.addEventListener("error",p),N.addEventListener("timeout",b),
N.addEventListener("abort",g),N.addEventListener("loadend",function(){y(N)}),N.addEventListener("loadstart",function(){v(N)}),N.onreadystatechange=function(){if(N.readyState===XMLHttpRequest.DONE){
var t=N.status;(0===t||t>=200&&t<400)&&(!S&&h(N),S=!0)}},"application/xml"===u&&N.overrideMimeType("text/xml"),f&&(E=o(E,{"X-Requested-With":"XMLHttpRequest"}),
e.FormData&&f instanceof e.FormData||(E=o(E,{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"})),f=new URLSearchParams(f)),N.open(l,i,!0,s,a);for(var x in E)N.setRequestHeader(x,E[x])
;return N.send(f),N};t.getJson=function(t){return i(o(t,{method:"GET",responseType:"json",contentType:"application/json"}))},t.getXML=function(t){return i(o(t,{method:"GET",responseType:"document",
contentType:"application/xml"}))},"GET POST PUT PATCH DELETE HEAD OPTIONS TRACE CONNECT".split(/\s/).forEach(function(e){t[e.toLowerCase()]=function(t){return i(o({method:e,responseType:"text"},t))}})
}(e,"undefined"!=typeof global?global:window),"object"==typeof exports&&(module.exports=e),t.get=e.get,t.getJson=e.getJson,t.getXML=e.getXML,t.post=e.post}(i.io),function(t){t.type={},
t.type.isFunction=function(t){return typeof t===i.TYPES.F},t.type.isDefined=function(t){return typeof t!==i.TYPES.U},t.type.isObject=function(e){
var n=String(e)!==e,o=e===Object(e),i=t.type.isFunction(e),r={}.toString.call(e).match(/\[object\sObject\]/);return n&&o&&!i&&!(!r||!r.length)},t.type.isArray=function(t){
if(Array.isArray&&Array.isArray(t))return!0;var e=String(t)!==t,n={}.toString.call(t).match(/\[object\sArray\]/);return e&&!(!n||!n.length)}}(i.utils),i.ns.make=function(t,e,n){t=t.replace(/^\//,"")
;var o,r=t.split(/\.|\//),s=r.length;return typeof n===i._U_&&(n=i.W),typeof e===i._U_&&(e={}),"function"==typeof e&&(e=e()),n[r[0]]||(n[r[0]]=1===s?e:{}),o=n[r[0]],
s>1?i.ns.make(r.slice(1).join("."),e,n[r[0]]):o},i.ns.check=function(t,e){t=t.replace(/^\//,"");var n=t.split(/\.|\//),o=n.length,r=0;if(e=typeof e!==i._U_?e:i.W,!t)return e;for(null;r<o;r+=1){
if(typeof e[n[r]]===i._U_)return;e=e[n[r]]}return e},i.ns.extend=function(t,e){var n,o="function"==typeof e?e():e;for(n in o)typeof t[n]===i._U_&&(t[n]=o[n]);return t},i.CONFIG={
AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!1,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"hokuto",NAME:"hokuto",VERSION:"0.0.25"
},i.cookie={enabled:!0,cookie_nocookiesaround:!1,initCheck:function(){return i.W.navigator.cookieEnabled},set:function(t,e,n,o,r,s){if(!i.cookie.enabled)return!1;i.cookie.cookie_nocookiesaround=!1
;var a=new Date,c=new Date(a.getTime()+n);return i.WD.cookie=[t,"=",i.W.escape(e),n?";expires="+c.toGMTString():"",o?";path="+o:"",r?";domain="+r:"",s?";secure":""].join(" "),!0},del:function(t,e,n){
if(!i.cookie.enabled)return!1;var o=!1;return i.cookie.get(t)&&(i.WD.cookie=[t,"=",e?";path="+(e||"/"):"",n?";domain="+n:"",";expires=Thu, 01-Jan-1970 00:00:01 GMT"].join(""),o=!0),o},get:function(t){
var e=i.WD.cookie.split(";"),n=e.length,o="",r="",s=!1,a=0;if(!i.cookie.enabled)return!1;for(null;a<n;a+=1){if(o=e[a].split("="),o[0].replace(/^\s+|\s+$/g,"")===t)return s=!0,
o.length>1&&(r=i.W.unescape(o[1].replace(/^\s+|\s+$/g,""))),r;o=null,""}return s},delall:function(){if(!i.cookie.enabled)return!1;var t=i.WD.cookie.split(/;/),e=t.length,n=0;for(null;n<e;n+=1){
var o=t[n].split(/=/);i.cookie.del(o[0])}return i.cookie.cookie_nocookiesaround=!0,!0},getall:function(){
return!!i.cookie.enabled&&(""===i.WD.cookie?[]:i.cookie.cookie_nocookiesaround?[]:i.WD.cookie.split(";").forEach(function(t){var e=t.split("=");return{name:e[0],value:e[1]}}))}},function(t){
t.noAttrs=["innerHTML","style","dataset","className"],t.setStyle=function(t,e){if(typeof e===i.TYPES.U)throw new Error("ERR: styles needed")
;for(var n in e)"float"===n?t.style[n.replace(/^float$/i,"cssFloat")]=e[n]:t.style[n]=e[n]},t.setAttrs=function(e,n){if(typeof n===i.TYPES.U)throw new Error("ERR: attrs needed")
;for(var o in n)t.noAttrs.indexOf(o)<0&&e.setAttribute(o,n[o])},t.unsetAttrs=function(e,n){if(typeof n===i.TYPES.U)throw new Error("ERR: attrs needed");n.forEach(function(n){
t.noAttrs.indexOf(n)<0&&e.removeAttribute(n)})},t.setData=function(t,e){if(typeof e===i.TYPES.U)throw new Error("ERR: data needed");for(var n in e)t.dataset[n]=e[n]},t.setClass=function(t,e){
e.split(",").forEach(function(e){t.classList.add(e)})},t.unsetData=function(t,e){if(typeof e===i.TYPES.U)throw new Error("ERR: data needed");e.forEach(function(e){delete t.dataset[e]})},
t.remove=function(t){return t.parentNode&&t.parentNode.removeChild(t)},t.filterHtml=function(t){return""+t},t.setText=function(t,e){t.appendChild(document.createTextNode(e))},t.setHtml=function(e,n){
e.innerHTML=t.filterHtml(n)},t.script=function(e,n){if(!(typeof e!==i.TYPES.U&&("content"in e||"attrs"in e&&"src"in e.attrs)))throw new Error("Missing script params")
;var o=document.createElement("script"),r=e&&e.attrs;return r&&t.setAttrs(o,r),n&&(o.onload=function(){o.parentNode.removeChild(o)}),e.content&&(o.innerHTML=e.content),o},t.style=function(e){
if(!(typeof e!==i.TYPES.U&&("content"in e||"href"in e)))throw new Error("Missing style params");var n=e.content?{tag:"style",attrs:{}}:{tag:"link",attrs:{rel:"stylesheet",href:e.href}
},o=document.createElement(n.tag),r=Object.assign(n.attrs,e&&e.attrs||{});return t.setAttrs(o,r),e.content&&(o.innerHTML=e.content),o},t.head=document.getElementsByTagName("head")[0]}(i.dom),
function(t){function e(e,n,o){t.saveUnhandler(e,function(){t.off(e,n,o)})}t._={unhandlers:{},bindErr:function(t){return"No straight way to "+(t?"":"un")+"}bind an event"}},
t.saveUnhandler=function(e,n){t._.unhandlers[e]=t._.unhandlers[e]||[],t._.unhandlers[e].push(n)},t.unhandle=function(e){t._.unhandlers[e]&&t._.unhandlers[e].forEach(function(t){t()}),t._.unhandlers=[]
},t.on=function(t,n,o,i){i=i||!1,t.addEventListener.apply(t,[n,o,i]),e(t,n,o)},t.off=function(t,e,n){t.removeEventListener(e,n)},t.kill=function(t){return t||(t=i.W.event,t.cancelBubble=!0,
t.returnValue=!1),"stopPropagation"in t&&t.stopPropagation(),t.preventDefault(),!1},t.once=function(e,n,o){t.on(e,n,function i(r){o.call(e,r),t.off(e,n,i)})},t.eventTarget=function(t){
t=t||i.W.event||{};var e=t.currentTarget||typeof t.target!==i.TYPES.U?t.target:t.srcElement;if(!e)return!1;for(;3===e.nodeType&&null!==e.parentNode;)e=e.parentNode;return e},t.ready=function(){
var t,e,n=setInterval(function(){if("complete"===document.readyState)for(clearInterval(n),t=0,e=o.length;t<e;t++)o[t].call(this)},100),o=[];return function(t){
"complete"===document.readyState?t.call(this):o.push(t)}}()}(i.events),function(t){var e={},n=/i18n\(([^}|]*)?\|?([^}]*)\)/;t.lang=i.CONFIG.LANG,t.switchLang=function(t){i.i18n.lang=t},
t.check=function(t){return t.match(n)},t.get=function(t,n){return i.ns.check(t,e)||n||t+"<sup>&#2417;</sup>"},t.load=function(t){e=t},t.parse=function(t){
var e,o,r,s=i.searchHash.forValue(t,n),a=s.length,c=0;for(null;c<a;c++)r=s[c],(typeof r.regexp).match(/boolean/i)||(e=i.i18n.check(r.regexp[0]))&&(o=i.ns.check(r.container,t),
o[r.key]=r.value.replace(e[0],i.i18n.get(e[1],e[2])))}}(i.i18n),i.solve=function(){function t(t){this.content=t,this.stats={};var e=t.engy;this.config={
fileNameSeparator:e&&e.fileNameSeparator?e.fileNameSeparator:i.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,fileNamePrepend:e&&e.fileNamePrepend?e.fileNamePrepend:i.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,
ext:e&&e.ext?e.ext:i.CONFIG.ENGY.COMPONENTS.EXT,componentsUrl:e&&e.componentsUrl?e.componentsUrl:i.CONFIG.ENGY.COMPONENTS.URL}}function e(t){var e=new Array(37).join("-");(0,
console.log)(e+"\n"+["%cHokuto%c used",t.elements,"component"+(1===t.elements?"":"s"),"\n"].join(" ")+"usage: \n"+Object.keys(t.requested).reduce(function(e,n){
return e+["•",n+":",t.requested[n],"time"+(t.requested[n]>1?"s":""),"\n"].join(" ")
},"")+["total time:",t.time+"ms","\n"].join(" ")+["◦ unfolding:",t.time-t.xhrTot+"ms","\n"].join(" ")+["◦ xhr:",t.xhrTot+"ms","\n"].join(" ")+e,"color:#6af;font-size:1.5em","")}var n=function(t,e,n){
for(var o=e.split(/\.|\//),i=o.length,r=0;r<i-1;)t=t[o[r++]];t[o[i-1]]=n},o=function(t,e,o){var r,s=i.ns.check(e,t),a=Object.assign({},o);for(r in s)!r.match(/component|params/)&&(a[r]=s[r])
;o.protected?n(t,e,o):n(t,e,a)},r={},s={},a=i.CONFIG.ENGY.STATS,c=function(t){return JSON.stringify({tag:"div",style:{border:"1px solid red",backgroundColor:"pink",color:"red",padding:"10px"},
html:"no component found ("+t+")",protected:!0})};return t.prototype.getFileName=function(t){var e=t.split(/\/|\|/),n=t,o=this.config,i=e.length-1;return e[i]=o.fileNamePrepend+e[i],
n=e.join(o.fileNameSeparator),[o.componentsUrl,o.componentsUrl.match(/\/$/)?"":"/",n,o.ext].join("")},t.prototype.resetStats=function(){this.stats={time:0,elements:0,requested:{},xhrTot:0}},
t.prototype.evalTextFunctionWithParams=function(t,e){if("string"!=typeof t)return console.error("evalTextFunctionWithParams: expected string, got",typeof t),{};var n=t.trim()
;if(65279===n.charCodeAt(0)&&(n=n.slice(1)),!n)return console.error("evalTextFunctionWithParams: script is empty"),{};var o;try{if("function"==typeof(o=new Function("return ("+n+")")()))return o(e)
}catch(t){}for(var i,r=[],s=/(?:^|;|\s|})function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/gm;null!==(i=s.exec(n));)r.push(i[1]);for(var a=r.length-1;a>=0;a--)try{
if("function"==typeof(o=new Function(["return (function(){\n",n,"\nreturn typeof ",r[a],' !== "undefined" ? ',r[a]," : undefined;\n})();"].join(""))()))return o(e)}catch(t){}
return console.error("evalTextFunctionWithParams: script did not resolve to a function"),{}},t.prototype.parse=function(){var t,e,n=this,u=i.i18n.parse,f=0,l=+new Date,h=0,d={},p=!1
;return new Promise(function(g){!function m(){var y,v,b,E=i.searchHash.forKey(n.content,"component",{limit:1}),T=0,N=0,S=function(){t=+new Date,n.stats.time=t-l,n.stats.elements=f,n.stats.requested=d,
n.stats.xhrTot=h};E.length?(p=!0,E=E[0],y=n.getFileName(E.value),E.value in d?d[E.value]++:(d[E.value]=1,f++),v=y in r,b=y in s,e=function(t){var e=t.responseText;N=+new Date,h+=N-T
;var s,a=i.ns.check(E.container+"/params",n.content);if(b)s=String(e);else{v||(r[y]=String(e));try{s=n.evalTextFunctionWithParams(e,a)}catch(t){console.error("Error evaluating component '"+y+"'"),
console.error(t)}s||(s=c(y))}E.container?o(n.content,E.container,s):(s.protected?n.config=Object.assign({},n.config,s):n.config=Object.assign({},s,n.config),n.content=Object.assign({},s,n.content),
delete n.content.component,delete n.content.params),u&&u(n.content),S(),m()},T=+new Date,b?e({responseText:s[y]}):v?e({responseText:r[y]}):i.io.get({url:y,onCompleted:e,onError:function(){e(c(y))}
})):(S(),u&&u(n.content),g([n.content,p&&a&&n.stats]))}()})},function(n){return new t(n).parse().then(function(t){return t[1]&&e(t[1]),t[0]})}}();var r=function(){return Promise.resolve()
},s=function(t,e){return i.utils.type.isFunction(e)?e.call(t):e};e.prototype.initTag=function(){this.tag=this.config.tag||"div",
this.node=this.config.ns?document.createElementNS(this.config.ns,this.tag):document.createElement(this.tag)},e.prototype.initialize=function(){
this.setCall("Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods")},e.prototype.initRerender=function(){
this.setCall("Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),this.cb&&this.cb.call(this),this.childrenKnots.forEach(function(t){t.initRerender()})},
e.prototype.setState=function(t){var e=s(this,this.config.state||{}),n=s(this,t||{}),o=Object.assign({},e,this.state,n);return this.state=o,this},e.prototype.setId=function(t){
var n,o=i.utils.type.isDefined(this.config[e.identifier]),r={};(o||t)&&(n=o?this.config[e.identifier]:t,r[e.identifier]=n,this.setAttrs(r))},e.prototype.setCall=function(t){var e=this
;t.split(/,/).forEach(function(t){e["set"+t]()})},e.prototype.lateKid=function(t){t in this.nodes?consolw.warn('node already present by "'+e.byIdIdentifier+'"'):this.nodes[t]=this},
e.prototype.setByRef=function(){if(e.byIdIdentifier in this.config){var t=this.config[e.byIdIdentifier];this.nodes[t]=this}},e.prototype.getByRef=function(t){return t in this.nodes?this.nodes[t]:null
},e.prototype.setRef=function(t,e){return t?(e||this).nodes[t]=e||this:i.utils.type.isDefined(this.config.ref)&&(this.nodes[this.config.ref]=this),this},e.prototype.setClassname=function(t){
var e=s(this,this.config.className||""),n=s(this,t||""),o=[e,n].filter(Boolean).join(",");return o&&i.dom.setClass(this.node,o),this},e.prototype.setStyle=function(t){
var e=s(this,this.config.style||{}),n=s(this,t||{}),o=Object.assign({},e,n);return i.dom.setStyle(this.node,o),this},e.prototype.setAttrs=function(t){
var e=s(this,this.config.attrs||{}),n=s(this,t||{}),o=Object.assign({},e,n);return i.dom.setAttrs(this.node,o),this},e.prototype.unsetAttrs=function(t){return t&&i.dom.unsetAttrs(this.node,t),this},
e.prototype.setData=function(t){var e=s(this,this.config.data||{}),n=s(this,t||{}),o=Object.assign({},e,n);return o&&i.dom.setData(this.node,o),this},e.prototype.unsetData=function(t){
return t&&i.dom.unsetData(this.node,t),this},e.prototype.setText=function(t){var e=s(this,this.config.text||""),n=s(this,t||""),o=n||e;return i.dom.setText(this.node,o),this},
e.prototype.setHtml=function(t){i.utils.type.isDefined(t)||(t="");var e=s(this,"html"in this.config?this.config.html:""),n=s(this,t),o=n||e;return o&&i.dom.setHtml(this.node,o),this},
e.prototype.setMethods=function(){var t,e=this,n=Object.keys(this.config);return n.forEach(function(n){
(t=n.match(/^method_(\w*)$/i))&&(t[1]in e?console.warn("[WARNING] : method '"+t[0]+"' cant be added, would override existing element."):e["_"+t[1]]=e.config[t[0]].bind(e))}),this},
e.prototype.setEvents=function(){var t,e,n,o=this;o.unhandlers={};for(n in o.config)(t=n.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(e=t[3].toLowerCase(),function(n){var r=function(t){
return o.config[n].call(o,t)};i.events[t[1]](o.node,e,r),o.unhandlers[e]=r}(n));return this.unhandleEvents=function(){return Object.entries(o.unhandlers).forEach(function(t){
i.events.off(o.node,t[0],t[1])}),o},this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents),this},e.prototype.unhandle=function(t){var e=this
;return e.unhandlers=Object.entries(e.unhandlers).reduce(function(n,o){return o[0]===t?i.events.off(e.node,o[0],o[1]):n[o[0]]=o[1],n},{}),this},e.prototype.setEnd=function(){var t=this
;return!this.rendered&&"end"in this.config&&i.utils.type.isFunction(this.config.end)&&(this.ender=t.config.end.call(t)),this},e.prototype.render=function(){var t=this
;return this.rendered?(this.initRerender(),Promise.resolve(this)):(this.frag.appendChild(this.node),this.debt?this.children.reduce(function(n,o){var i=new e(Object.assign({rendered:t.rendered},o,{
target:t.node,parentKnot:t,rootKnot:t.rootKnot}));return t.childrenKnots.push(i),n.then(function(){return i.render()})},Promise.resolve()).then(function(){return t
}):this.initCheck.call(this).then(function(){return t.cb.call(t).then(function(){return t.aborted||(t.clearTarget&&!t.rendered&&(t.target.innerHTML=""),t.rendered||t.target.appendChild(t.frag),
t.rendered=!0),t})}).then(function(){return t.parentKnot&&t.parentKnot.solve(),t}).catch(function(){t.frag.removeChild(t.node)}))},e.prototype.addSibling=function(t){
return this.node.parentNode.appendChild(t),this},e.prototype.clear=function(){this.ender&&this.ender(),this.target.removeChild(this.node),this.unhandleEvents()},e.prototype.solve=function(){
this.debt>0&&this.debt--,this.debt<=0&&(this.solved=!0,this.render())},e.prototype.report=function(){var t=JSON.stringify(this.config).length,e=this.node.innerHTML.length
;return(e/t).toFixed(2)+" (html:"+e+" / json:"+t+")"},e.isknot=function(t){return t instanceof e},e.identifier="id",e.byIdIdentifier="ref",i.fx=function(){function t(t){t=t||{}
;var e=(((t.duration||500)/1e3).toFixed(1),t.additionalStyles||""),n=hokuto._.dom.style({content:"body{transition:opacity 3000s ease-in-out; opacity: 1;}"+e});document.body.appendChild(n)}return{
fadeIn:t}}();var a={},c={};return{_:i,render:n,get:o,getKnotById:function(t){return t in c?c[t]:null},getElement:function(t){return t in a&&a[t]},getElements:function(){return a}}}(window)
;"object"==typeof exports&&(module.exports=hokuto);