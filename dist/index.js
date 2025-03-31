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

with ~21.02KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto=function(_){function Knot(t,e){var n=this;this.config=t,this.clearTarget=e,this.rendered=!!t.rendered,this.frag=document.createDocumentFragment(),
this.target=this.config.target||document.body,this.children=this.config.children||[],this.childrenKnots=[],this.debt=~~this.children.length,this.solved=0===this.debt,
this.cb=this.config.cb||resolutive,this.parentKnot=this.config.parentKnot||null,this.rootKnot=this.config.rootKnot||this,this.initCheck=this.config.initCheck||resolutive,
this.abort=this.config.abort||resolutive,this.aborted=!1,this.ender=!1,this.state="state"in t?t.state:{},this.nodes=t.nodes||this.rootKnot.nodes,this.rootNodeUnhandlersCollector=[],this.unhandlers={},
this.abort.call(this).then().catch(function(){n.rootKnot.aborted=!0}),this.initTag(),this.initialize()}function render(t){
if(!Hok.utils.type.isDefined(t)||!Hok.utils.type.isDefined(t.config))throw"Nothing to render";var e=t.config,n=!!t.clear,o=t.name,i=t.vanish,r=document.currentScript,s=r&&r.parentNode
;return Hok.solve(e).then(function(t){return"target"in t||!s||(t.target=s),t.endFunctions=[],t.nodes=__nodes,new Knot(t,n).render().then(function(t){return o&&(__renders[o]=t),t}).finally(function(){
i&&s.removeChild(r)})})}function get(t){var e=document.createElement("div");return t.target=e,render(t)}var Hok={W:_,_U_:"undefined",WD:_.document,H:_.history,TYPES:{U:"undefined",F:"function"},
noop:function(){},CONFIG:{},ns:{},dom:{},events:{},history:{},i18n:{},io:{},utils:{}};!function(t){"use strict";var e=function(){function t(t,e){return JSON.stringify(t)===JSON.stringify(e)&&!n(e)}
function e(t){return"string"==typeof t||t instanceof String}function n(t){return t instanceof RegExp}function o(t){
var e=String(t)!==t,n=t===Object(t),o="function"!=typeof t,i={}.toString.call(t).match(/\[object\sObject\]/);return e&&n&&o&&!(!i||!i.length)}function i(t){
var e={}.toString.call(t).match(/\[object\sArray\]/);return String(t)!==t&&!(!e||!e.length)}function r(t){return t&&"object"==typeof t&&void 0!==t.nodeType&&1===t.nodeType&&"string"==typeof t.nodeName
}function s(s,c,a,u){if(!o(c)&&!i(c))throw new Error("BAD PARAM: must search into an object or an array");var f,l=0,h=function(o,i){return e(o)&&n(i)?o.match(i):t(o,i)},d={key:function(t,e,n){
return"function"==typeof n?n(t):h(t,n)},value:function(t,e,n){return"function"==typeof n?n(e):h(e,n)},keyvalue:function(t,e,n){
return("function"==typeof n.key&&n.key(t)||h(t,n.key))&&("function"==typeof n.value&&n.value(e)||h(e,n.value))}}[s],p=[],m=function(t,e,n,o,i){
var r=[].concat.call(t,[e]),s=d(e,o[e],n),a=u.min<=i&&i<=u.max,f=r.length;a&&s&&(p.push({obj:o,value:o[e],key:r[f-1],parentKey:r[f-2],path:r.join("/"),getter:function(){return r.reduce(function(t,e){
return t[e]},c)},container:r.slice(0,f-1).join("/"),parentContainer:r.slice(0,f-2).join("/"),regexp:s,level:i}),l++),y(o[e],n,r,i+1)},y=function(t,e,n,o){if(!r(t)){var i,s
;if(t instanceof Array)for(i=0,s=t.length;i<s&&(m(n,i,e,t,o),u.limit!==l);i++);else if("object"==typeof t)for(i in t)if(m(n,i,e,t,o),u.limit===l)break}};return u.limit="limit"in u?~~u.limit:1/0,
u.min="min"in u?~~u.min:0,u.max="max"in u?~~u.max:1/0,0===u.limit?p:(u.min=u.min<0?0:u.min,u.max<u.min&&(f=u.min,u.min=u.max,u.max=f),y(c,a,[],0),u.sorter?p.sort(u.sorter):p)}return{
forKey:function(t,e,n){return s("key",t,e,n||{})},forValue:function(t,e,n){return s("value",t,e,n||{})},forKeyValue:function(t,e,n){return s("keyvalue",t,e,n||{})}}}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=e),t.searchHash=e}(Hok),function(t){"use strict";var e=function(){var t={},e=function(t,e){return t.indexOf(e)},n=function(){
this.topic2cbs={},this.lateTopics={},this.enabled=!0},o=function(t,e){var n=t.enabled;return t.enabled=e,n!==t.enabled},i=n.prototype;return i.enable=function(){return o(this,!0)},
i.disable=function(){return o(this,!1)},i.pub=function(t,e){var n,o=0,i=[];if(e instanceof Array||(e=[e]),!(t in this.topic2cbs&&this.enabled))return t in this.lateTopics?this.lateTopics[t].push({
args:e}):this.lateTopics[t]=[{args:e}],null;if("*"in this.topic2cbs)for(o=0,n=this.topic2cbs["*"].length;o<n;o+=1)i.push(this.topic2cbs["*"][o].apply(null,e));for(o=0,
n=this.topic2cbs[t].length;o<n;o+=1)i.push(this.topic2cbs[t][o].apply(null,e));return i},i.sub=function(t,e,n){var o,i=0,r=[];if(t in this.topic2cbs&&this.enabled||(this.topic2cbs[t]=[]),
this.topic2cbs[t].push(e),n&&t in this.lateTopics){for(i=0,o=this.lateTopics[t].length;i<o;i++)r.push(e.apply(null,this.lateTopics[t][i].args));return r}},i.unsub=function(t,n){var o=0
;return t in this.topic2cbs&&(o=e(this.topic2cbs[t],n))>=0&&this.topic2cbs[t].splice(o,1)&&0===this.topic2cbs[t].length&&delete this.topic2cbs[t],t in this.lateTopics&&delete this.lateTopics[t],this},
i.once=function(t,e,n){function o(){return i.unsub(t,o),e.apply(null,Array.prototype.slice.call(arguments,0))}var i=this;return this.sub(t,o,n)},i.reset=function(){
var t=Array.prototype.slice.call(arguments,0),e=t.length,n=0;if(!e)return this.topic2cbs={},this.lateTopics={},this;for(null;n<e;n+=1)t[n]in this.topic2cbs&&delete this.topic2cbs[t[n]],
t[n]in this.lateTopics&&delete this.lateTopics[t[n]];return this},{getChannels:function(e){var n,o={};if("boolean"==typeof e)for(n in t)t[n].enabled===e&&(o[n]=t[n]);else o=t;return o},
get:function(e){return e in t||(t[e]=new n),t[e]}}}();"object"==typeof exports&&(module.exports=e),t.channeljs=e}(Hok),function(t){"use strict";var e={};!function(t,e){
var n=function(){},o=function(t,e){var n=Object.assign({},t);for(var o in e)e.hasOwnProperty(o)&&(n[o]=e[o]);return n},i=function(t){
var i=t.url,r=t.timeout||0,s=t.user||null,c=t.password||null,a=t.responseType,u=t.contentType,f=t.body||null,l=t.method,h=t.onCompleted||n,d=t.onLoad||n,p=t.onError||n,m=t.onAbort||n,y=t.onProgress||n,g=t.onLoadend||n,v=t.onLoadstart||n,b=t.onTimeout||n,k=t.headers||{},E=!!t.withCredentials,H=new XMLHttpRequest,T=!1
;H.responseType=a,H.withCredentials=E,H.timeout=r||null,H.addEventListener("load",d),H.addEventListener("progress",y),H.addEventListener("error",p),H.addEventListener("timeout",b),
H.addEventListener("abort",m),H.addEventListener("loadend",function(){g(H)}),H.addEventListener("loadstart",function(){v(H)}),H.onreadystatechange=function(){if(H.readyState===XMLHttpRequest.DONE){
var t=H.status;(0===t||t>=200&&t<400)&&(!T&&h(H),T=!0)}},"application/xml"===u&&H.overrideMimeType("text/xml"),f&&(k=o(k,{"X-Requested-With":"XMLHttpRequest"}),
e.FormData&&f instanceof e.FormData||(k=o(k,{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"})),f=new URLSearchParams(f)),H.open(l,i,!0,s,c);for(var N in k)H.setRequestHeader(N,k[N])
;return H.send(f),H};t.getJson=function(t){return i(o(t,{method:"GET",responseType:"json",contentType:"application/json"}))},t.getXML=function(t){return i(o(t,{method:"GET",responseType:"document",
contentType:"application/xml"}))},"GET POST PUT PATCH DELETE HEAD OPTIONS TRACE CONNECT".split(/\s/).forEach(function(e){t[e.toLowerCase()]=function(t){return i(o({method:e,responseType:"text"},t))}})
}(e,"undefined"!=typeof global?global:window),"object"==typeof exports&&(module.exports=e),t.get=e.get,t.getJson=e.getJson,t.getXML=e.getXML,t.post=e.post}(Hok.io),function(t){t.type={},
t.type.isFunction=function(t){return typeof t===Hok.TYPES.F},t.type.isDefined=function(t){return typeof t!==Hok.TYPES.U},t.type.isObject=function(e){
var n=String(e)!==e,o=e===Object(e),i=t.type.isFunction(e),r={}.toString.call(e).match(/\[object\sObject\]/);return n&&o&&!i&&!(!r||!r.length)},t.type.isArray=function(t){
if(Array.isArray&&Array.isArray(t))return!0;var e=String(t)!==t,n={}.toString.call(t).match(/\[object\sArray\]/);return e&&!(!n||!n.length)}}(Hok.utils),Hok.ns.make=function(t,e,n){
t=t.replace(/^\//,"");var o,i=t.split(/\.|\//),r=i.length;return typeof n===Hok._U_&&(n=Hok.W),typeof e===Hok._U_&&(e={}),"function"==typeof e&&(e=e()),n[i[0]]||(n[i[0]]=1===r?e:{}),o=n[i[0]],
r>1?Hok.ns.make(i.slice(1).join("."),e,n[i[0]]):o},Hok.ns.check=function(t,e){t=t.replace(/^\//,"");var n=t.split(/\.|\//),o=n.length,i=0;if(e=typeof e!==Hok._U_?e:Hok.W,!t)return e
;for(null;i<o;i+=1){if(typeof e[n[i]]===Hok._U_)return;e=e[n[i]]}return e},Hok.ns.extend=function(t,e){var n,o="function"==typeof e?e():e;for(n in o)typeof t[n]===Hok._U_&&(t[n]=o[n]);return t},
Hok.CONFIG={AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!1,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"hokuto",NAME:"hokuto",
VERSION:"0.0.20"},function(t){t.noAttrs=["innerHTML","style","dataset","className"],t.setStyle=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: styles needed")
;for(var n in e)"float"===n?t.style[n.replace(/^float$/i,"cssFloat")]=e[n]:t.style[n]=e[n]},t.setAttrs=function(e,n){if(typeof n===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var o in n)t.noAttrs.indexOf(o)<0&&e.setAttribute(o,n[o])},t.unsetAttrs=function(e,n){if(typeof n===Hok.TYPES.U)throw new Error("ERR: attrs needed");n.forEach(function(n){
t.noAttrs.indexOf(n)<0&&e.removeAttribute(n)})},t.setData=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: data needed");for(var n in e)t.dataset[n]=e[n]},t.setClass=function(t,e){
e.split(",").forEach(function(e){t.classList.add(e)})},t.unsetData=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: data needed");e.forEach(function(e){delete t.dataset[e]})},
t.remove=function(t){return t.parentNode&&t.parentNode.removeChild(t)},t.filterHtml=function(t){return""+t},t.setText=function(t,e){t.appendChild(document.createTextNode(e))},t.setHtml=function(e,n){
e.innerHTML=t.filterHtml(n)},t.script=function(e,n){if(!(typeof e!==Hok.TYPES.U&&("content"in e||"attrs"in e&&"src"in e.attrs)))throw new Error("Missing script params")
;var o=document.createElement("script"),i=e&&e.attrs;return i&&t.setAttrs(o,i),n&&(o.onload=function(){o.parentNode.removeChild(o)}),e.content&&(o.innerHTML=e.content),o},t.style=function(e){
if(!(typeof e!==Hok.TYPES.U&&("content"in e||"href"in e)))throw new Error("Missing style params");var n=e.content?{tag:"style",attrs:{}}:{tag:"link",attrs:{rel:"stylesheet",href:e.href}
},o=document.createElement(n.tag),i=Object.assign(n.attrs,e&&e.attrs||{});return t.setAttrs(o,i),e.content&&(o.innerHTML=e.content),o},t.head=document.getElementsByTagName("head")[0]}(Hok.dom),
function(t){function e(e,n,o){t.saveUnhandler(e,function(){t.off(e,n,o)})}t._={unhandlers:{},bindErr:function(t){return"No straight way to "+(t?"":"un")+"}bind an event"}},
t.saveUnhandler=function(e,n){t._.unhandlers[e]=t._.unhandlers[e]||[],t._.unhandlers[e].push(n)},t.unhandle=function(e){t._.unhandlers[e]&&t._.unhandlers[e].forEach(function(t){t()}),t._.unhandlers=[]
},t.on=function(t,n,o,i){i=i||!1,t.addEventListener.apply(t,[n,o,i]),e(t,n,o)},t.off=function(t,e,n){t.removeEventListener(e,n)},t.kill=function(t){return t||(t=Hok.W.event,t.cancelBubble=!0,
t.returnValue=!1),"stopPropagation"in t&&t.stopPropagation(),t.preventDefault(),!1},t.once=function(e,n,o){t.on(e,n,function i(r){o.call(e,r),t.off(e,n,i)})},t.eventTarget=function(t){t=t||Hok.W.event
;var e=t.currentTarget||typeof t.target!==Hok.TYPES.U?t.target:t.srcElement;if(!e)return!1;for(;3===e.nodeType&&null!==e.parentNode;)e=e.parentNode;return e},t.noEvents=function(e,n,o){function i(t){
r&&window.clearTimeout(r),r=window.setTimeout(function(){n(t)},o)}o=o||3e3;var r;t.on(e,"mousemove",i),t.on(e,"click",i),t.on(e,"touchstart",i)},t.ready=function(){var t,e,n=setInterval(function(){
if("complete"===document.readyState)for(clearInterval(n),t=0,e=o.length;t<e;t++)o[t].call(this)},100),o=[];return function(t){"complete"===document.readyState?t.call(this):o.push(t)}}()}(Hok.events),
function(t){var e={},n=/i18n\(([^}|]*)?\|?([^}]*)\)/;t.lang=Hok.CONFIG.LANG,t.switchLang=function(t){Hok.i18n.lang=t},t.check=function(t){return t.match(n)},t.get=function(t,n){
return Hok.ns.check(t,e)||n||t+"<sup>&#2417;</sup>"},t.load=function(t){e=t},t.parse=function(t){var e,o,i,r=Hok.searchHash.forValue(t,n),s=r.length,c=0;for(null;c<s;c++)i=r[c],
(typeof i.regexp).match(/boolean/i)||(e=Hok.i18n.check(i.regexp[0]))&&(o=Hok.ns.check(i.container,t),o[i.key]=i.value.replace(e[0],Hok.i18n.get(e[1],e[2])))}}(Hok.i18n),Hok.solve=function(){
function Processor(t){this.content=t,this.stats={};var e=t.engy;this.config={fileNameSeparator:e&&e.fileNameSeparator?e.fileNameSeparator:Hok.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,
fileNamePrepend:e&&e.fileNamePrepend?e.fileNamePrepend:Hok.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,ext:e&&e.ext?e.ext:Hok.CONFIG.ENGY.COMPONENTS.EXT,
componentsUrl:e&&e.componentsUrl?e.componentsUrl:Hok.CONFIG.ENGY.COMPONENTS.URL}}function report(t){var e=new Array(37).join("-");(0,
console.log)(e+"\n"+["%cHokuto%c used",t.elements,"component"+(1===t.elements?"":"s"),"\n"].join(" ")+"usage: \n"+Object.keys(t.requested).reduce(function(e,n){
return e+["•",n+":",t.requested[n],"time"+(t.requested[n]>1?"s":""),"\n"].join(" ")
},"")+["total time:",t.time+"ms","\n"].join(" ")+["◦ unfolding:",t.time-t.xhrTot+"ms","\n"].join(" ")+["◦ xhr:",t.xhrTot+"ms","\n"].join(" ")+e,"color:#6af;font-size:1.5em","")}
var _overwrite=function(t,e,n){for(var o=e.split(/\.|\//),i=o.length,r=0;r<i-1;)t=t[o[r++]];t[o[i-1]]=n},_mergeComponent=function(t,e,n){var o,i=Hok.ns.check(e,t),r=Object.assign({},n)
;for(o in i)!o.match(/component|params/)&&(r[o]=i[o]);n.protected?_overwrite(t,e,n):_overwrite(t,e,r)},components={},preloadedComponents={},computeStats=Hok.CONFIG.ENGY.STATS,cmp404=function(t){
return JSON.stringify({tag:"div",style:{border:"1px solid red",backgroundColor:"pink",color:"red",padding:"10px"},html:"no component found ("+t+")",protected:!0})}
;return Processor.prototype.getFileName=function(t){var e=t.split(/\/|\|/),n=t,o=this.config,i=e.length-1;return e[i]=o.fileNamePrepend+e[i],n=e.join(o.fileNameSeparator),
[o.componentsUrl,o.componentsUrl.match(/\/$/)?"":"/",n,o.ext].join("")},Processor.prototype.resetStats=function(){this.stats={time:0,elements:0,requested:{},xhrTot:0}},
Processor.prototype.evalTextFunctionWithParams=function(scriptContent,params){var evaluator=eval("(function (){return "+scriptContent+";})()");return evaluator(params)},
Processor.prototype.parse=function(){var t,e,n=this,o=Hok.i18n.parse,i=0,r=+new Date,s=0,c={},a=!1;return new Promise(function(u){!function f(){
var l,h,d,p=Hok.searchHash.forKey(n.content,"component",{limit:1}),m=0,y=0,g=function(){t=+new Date,n.stats.time=t-r,n.stats.elements=i,n.stats.requested=c,n.stats.xhrTot=s};p.length?(a=!0,p=p[0],
l=n.getFileName(p.value),p.value in c?c[p.value]++:(c[p.value]=1,i++),h=l in components,d=l in preloadedComponents,e=function(t){var e=t.responseText;y=+new Date,s+=y-m
;var i,r=Hok.ns.check(p.container+"/params",n.content);if(d)i=String(e);else{h||(components[l]=String(e));try{i=n.evalTextFunctionWithParams(e,r)}catch(t){
console.error("Error evaluating component '"+l+"'"),console.error(t)}}
p.container?_mergeComponent(n.content,p.container,i):(i.protected?n.config=Object.assign({},n.config,i):n.config=Object.assign({},i,n.config),n.content=Object.assign({},i,n.content),
delete n.content.component,delete n.content.params),o&&o(n.content),g(),f()},m=+new Date,d?e({responseText:preloadedComponents[l]}):h?e({responseText:components[l]}):Hok.io.get({url:l,onCompleted:e,
onError:function(){e(cmp404(l))}})):(g(),o&&o(n.content),u([n.content,a&&computeStats&&n.stats]))}()})},function(t){return new Processor(t).parse().then(function(t){return t[1]&&report(t[1]),t[0]})}
}();var resolutive=function(){return Promise.resolve()},functionize=function(t,e){return Hok.utils.type.isFunction(e)?e.call(t):e};Knot.prototype.initTag=function(){this.tag=this.config.tag||"div",
this.node=this.config.ns?document.createElementNS(this.config.ns,this.tag):document.createElement(this.tag)},Knot.prototype.initialize=function(){
this.setCall("Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods")},Knot.prototype.initRerender=function(){
this.setCall("Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),this.cb&&this.cb.call(this),this.childrenKnots.forEach(function(t){t.initRerender()})},
Knot.prototype.setState=function(t){var e=functionize(this,this.config.state||{}),n=functionize(this,t||{}),o=Object.assign({},e,this.state,n);return this.state=o,this},
Knot.prototype.setId=function(t){var e,n=Hok.utils.type.isDefined(this.config[Knot.identifier]),o={};(n||t)&&(e=n?this.config[Knot.identifier]:t,o[Knot.identifier]=e,this.setAttrs(o))},
Knot.prototype.setCall=function(t){var e=this;t.split(/,/).forEach(function(t){e["set"+t]()})},Knot.prototype.lateKid=function(t){
t in this.nodes?consolw.warn('node already present by "'+Knot.byIdIdentifier+'"'):this.nodes[t]=this},Knot.prototype.setByRef=function(){if(Knot.byIdIdentifier in this.config){
var t=this.config[Knot.byIdIdentifier];this.nodes[t]=this}},Knot.prototype.getByRef=function(t){return t in this.nodes?this.nodes[t]:null},Knot.prototype.setRef=function(t,e){
t?(e||this).nodes[t]=e||this:Hok.utils.type.isDefined(this.config.ref)&&(this.nodes[this.config.ref]=this)},Knot.prototype.setClassname=function(t){
var e=functionize(this,this.config.className||""),n=functionize(this,t||""),o=[e,n].filter(Boolean).join(",");return o&&Hok.dom.setClass(this.node,o),this},Knot.prototype.setStyle=function(t){
var e=functionize(this,this.config.style||{}),n=functionize(this,t||{}),o=Object.assign({},e,n);return Hok.dom.setStyle(this.node,o),this},Knot.prototype.setAttrs=function(t){
var e=functionize(this,this.config.attrs||{}),n=functionize(this,t||{}),o=Object.assign({},e,n);return Hok.dom.setAttrs(this.node,o),this},Knot.prototype.unsetAttrs=function(t){
return t&&Hok.dom.unsetAttrs(this.node,t),this},Knot.prototype.setData=function(t){var e=functionize(this,this.config.data||{}),n=functionize(this,t||{}),o=Object.assign({},e,n)
;return o&&Hok.dom.setData(this.node,o),this},Knot.prototype.unsetData=function(t){return t&&Hok.dom.unsetData(this.node,t),this},Knot.prototype.setText=function(t){
var e=functionize(this,this.config.text||""),n=functionize(this,t||""),o=n||e;return Hok.dom.setText(this.node,o),this},Knot.prototype.setHtml=function(t){Hok.utils.type.isDefined(t)||(t="")
;var e=functionize(this,"html"in this.config?this.config.html:""),n=functionize(this,t),o=n||e;return o&&Hok.dom.setHtml(this.node,o),this},Knot.prototype.setMethods=function(){
var t,e=this,n=Object.keys(this.config);n.forEach(function(n){
(t=n.match(/^method_(\w*)$/i))&&(t[1]in e?console.warn("[WARNING] : method '"+t[0]+"' cant be added, would override existing element."):e["_"+t[1]]=e.config[t[0]].bind(e))})},
Knot.prototype.setEvents=function(){var t,e,n,o=this;o.unhandlers={};for(n in o.config)(t=n.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(e=t[3].toLowerCase(),function(n){var i=function(t){
return o.config[n].call(o,t)};Hok.events[t[1]](o.node,e,i),o.unhandlers[e]=i}(n));return this.unhandleEvents=function(){return Object.entries(o.unhandlers).forEach(function(t){
Hok.events.off(o.node,t[0],t[1])}),o},this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents),this},Knot.prototype.unhandle=function(t){var e=this
;e.unhandlers=Object.entries(e.unhandlers).reduce(function(n,o){return o[0]===t?Hok.events.off(e.node,o[0],o[1]):n[o[0]]=o[1],n},{})},Knot.prototype.setEnd=function(){var t=this
;return!this.rendered&&"end"in this.config&&Hok.utils.type.isFunction(this.config.end)&&(this.ender=t.config.end.call(t)),this},Knot.prototype.render=function(){var t=this
;return this.rendered?(this.initRerender(),Promise.resolve(this)):(this.frag.appendChild(this.node),this.debt?this.children.reduce(function(e,n){var o=new Knot(Object.assign({rendered:t.rendered},n,{
target:t.node,parentKnot:t,rootKnot:t.rootKnot}));return t.childrenKnots.push(o),e.then(function(){return o.render()})},Promise.resolve()).then(function(){return t
}):this.initCheck.call(this).then(function(){return t.cb.call(t).then(function(){return t.aborted||(t.clearTarget&&!t.rendered&&(t.target.innerHTML=""),t.rendered||t.target.appendChild(t.frag),
t.rendered=!0),t})}).then(function(){return t.parentKnot&&t.parentKnot.solve(),t}).catch(function(){t.frag.removeChild(t.node)}))},Knot.prototype.addSibling=function(t){
return this.node.parentNode.appendChild(t),this},Knot.prototype.clear=function(){this.ender&&this.ender(),this.target.removeChild(this.node),this.unhandleEvents()},Knot.prototype.solve=function(){
this.debt>0&&this.debt--,this.debt<=0&&(this.solved=!0,this.render())},Knot.prototype.report=function(){var t=JSON.stringify(this.config).length,e=this.node.innerHTML.length
;return(e/t).toFixed(2)+" (html:"+e+" / json:"+t+")"},Knot.isknot=function(t){return t instanceof Knot},Knot.identifier="id",Knot.byIdIdentifier="ref",Hok.fx=function(){function t(t){t=t||{}
;var e=((t.duration||500)/1e3).toFixed(1),n=t.additionalStyles||"",o=hokuto._.dom.style({content:"body{transition:opacity "+e+"s ease-in-out; opacity: 1;}"+n});document.body.appendChild(o)}return{
fadeIn:t}}();var __renders={},__nodes={};return{_:Hok,render:render,get:get,getKnotById:function(t){return t in __nodes?__nodes[t]:null},getElement:function(t){return t in __renders&&__renders[t]},
getElements:function(){return __renders}}}(window);"object"==typeof exports&&(module.exports=hokuto);