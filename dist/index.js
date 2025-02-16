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

with ~21.25KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto=function(_){"use strict";function Knot(e,t){this.config=e,this.clearTarget=t,this.rendered=!!e.rendered,this.frag=document.createDocumentFragment(),
this.target=this.config.target||document.body,this.children=this.config.children||[],this.childrenKnots=[],this.debt=~~this.children.length,this.solved=0===this.debt,
this.cb=this.config.cb||resolutive,this.parentKnot=this.config.parentKnot||null,this.rootKnot=this.config.rootKnot||this,this.initCheck=this.config.initCheck||resolutive,
this.abort=this.config.abort||resolutive,this.aborted=!1,this.ender=!1,this.state="state"in e?e.state:{},this.nodes=e.nodes||this.rootKnot.nodes,this.rootNodeUnhandlersCollector=[],this.unhandlers={},
this.abort.call(this).then().catch(function(){self.rootKnot.aborted=!0}),this.initTag(),this.initialize()}function render(e,t,n){return Hok.solve(e).then(function(e,o){
return"target"in e||(e.target=document.currentScript.parentNode),e.endFunctions=[],e.nodes=__nodes,new Knot(e,t).render().then(function(e){return n&&(__renders[n]=e),e}).catch(function(e){
console.log({r:e})})}).catch(function(e){console.log({r:e})})}function get(e){var t=document.createElement("div");return e.target=t,render(e)}var searchHash=function(){function e(e,t){
return JSON.stringify(e)===JSON.stringify(t)&&!n(t)}function t(e){return"string"==typeof e||e instanceof String}function n(e){return e instanceof RegExp}function o(e){
var t=String(e)!==e,n=e===Object(e),o="function"!=typeof e,r={}.toString.call(e).match(/\[object\sObject\]/);return t&&n&&o&&!(!r||!r.length)}function r(e){
var t={}.toString.call(e).match(/\[object\sArray\]/);return String(e)!==e&&!(!t||!t.length)}function i(e){return e&&"object"==typeof e&&void 0!==e.nodeType&&1===e.nodeType&&"string"==typeof e.nodeName
}function s(s,c,a,f){if(!o(c)&&!r(c))throw new Error("BAD PARAM: must search into an object or an array");var u,l=0,d=function(o,r){return t(o)&&n(r)?o.match(r):e(o,r)},h={key:function(e,t,n){
return"function"==typeof n?n(e):d(e,n)},value:function(e,t,n){return"function"==typeof n?n(t):d(t,n)},keyvalue:function(e,t,n){
return("function"==typeof n.key&&n.key(e)||d(e,n.key))&&("function"==typeof n.value&&n.value(t)||d(t,n.value))}}[s],p=[],m=function(e,t,n,o,r){
var i=[].concat.call(e,[t]),s=h(t,o[t],n),a=f.min<=r&&r<=f.max,u=i.length;a&&s&&(p.push({obj:o,value:o[t],key:i[u-1],parentKey:i[u-2],path:i.join("/"),getter:function(){return i.reduce(function(e,t){
return e[t]},c)},container:i.slice(0,u-1).join("/"),parentContainer:i.slice(0,u-2).join("/"),regexp:s,level:r}),l++),k(o[t],n,i,r+1)},k=function(e,t,n,o){if(!i(e)){var r,s
;if(e instanceof Array)for(r=0,s=e.length;r<s&&(m(n,r,t,e,o),f.limit!==l);r++);else if("object"==typeof e)for(r in e)if(m(n,r,t,e,o),f.limit===l)break}};return f.limit="limit"in f?~~f.limit:1/0,
f.min="min"in f?~~f.min:0,f.max="max"in f?~~f.max:1/0,0===f.limit?p:(f.min=f.min<0?0:f.min,f.max<f.min&&(u=f.min,f.min=f.max,f.max=u),k(c,a,[],0),f.sorter?p.sort(f.sorter):p)}return{
forKey:function(e,t,n){return s("key",e,t,n||{})},forValue:function(e,t,n){return s("value",e,t,n||{})},forKeyValue:function(e,t,n){return s("keyvalue",e,t,n||{})}}}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=searchHash);var Hok={W:window,_U_:"undefined",WD:window.document,H:window.history,TYPES:{U:"undefined",F:"function"},
noop:function(){},CONFIG:{},ns:{},dom:{},events:{},cookie:{},history:{},i18n:{},io:{}};typeof Object.assign!==Hok.TYPES.F&&Object.defineProperty(Object,"assign",{value:function(e,t){
if(null===e||void 0===e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),o=1,r=arguments.length;o<r;o++){var i=arguments[o]
;if(null!==i&&void 0!==i)for(var s in i)({}).hasOwnProperty.call(i,s)&&(n[s]=i[s])}return n},writable:!0,configurable:!0}),Hok.ns.make=function(e,t,n){e=e.replace(/^\//,"")
;var o,r=e.split(/\.|\//),i=r.length;return typeof n===Hok._U_&&(n=Hok.W),typeof t===Hok._U_&&(t={}),"function"==typeof t&&(t=t()),n[r[0]]||(n[r[0]]=1===i?t:{}),o=n[r[0]],
i>1?Hok.ns.make(r.slice(1).join("."),t,n[r[0]]):o},Hok.ns.check=function(e,t){e=e.replace(/^\//,"");var n=e.split(/\.|\//),o=n.length,r=0;if(t=typeof t!==Hok._U_?t:Hok.W,!e)return t
;for(null;r<o;r+=1){if(typeof t[n[r]]===Hok._U_)return;t=t[n[r]]}return t},Hok.ns.extend=function(e,t){var n,o="function"==typeof t?t():t;for(n in o)typeof e[n]===_U_&&(e[n]=o[n])},Hok.CONFIG={
AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!0,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"hokuto",NAME:"hokuto",
VERSION:"maltaV('package.version')"},Hok.object=function(){var e=function(e,t){var n,o="";for(n in e)e.hasOwnProperty(n)&&(o+=t(e,n,o));return o},t=function(e){
return"object"==typeof Node?e instanceof Hok.W.Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName},n=function(e,t){
var n,o=t||("undefined"!=typeof global?global:"undefined"!=typeof window?window:this);for(n in e)e.hasOwnProperty(n)&&(o[n]=e[n])},o={extract:n,fromQs:function(){
var e,t=document.location.search.substr(1).split("&"),n=t.length,o=0,r=[];for(null;o<n;o+=1)e=t[o].split("="),!r[e[0]]&&(r[e[0]]=decodeURIComponent(e[1]));return r},clone:function(e){var t,n,r
;if(null===e||"object"!=typeof e)return e;if(e instanceof Date)return t=new Date,t.setTime(e.getTime()),t;if(e instanceof Array){for(t=[],n=0,r=e.length;n<r;n++)t[n]=o.clone(e[n]);return t}
if(e instanceof Object){t={};for(n in e)e.hasOwnProperty(n)&&(t[n]=o.clone(e[n]));return t}throw new Error("Unable to copy obj! Its type isn't supported.")},extend:function(e,t,n){var r,i=o.clone(e)
;for(r in t)!t.hasOwnProperty(r)||r in i&&!n||(i[r]=t[r]);return i},keyize:function(e,t){var n={},o=0,r=e.length;for(null;o<r;o++)t in e[o]&&!(e[o][t]in n)&&(n[e[o][t]]=e[o]);return n},
isString:function(e){return"string"==typeof e||e instanceof String},jCompare:function(e,n){return t(e)||typeof JSON===Hok._U_?e===n:JSON.stringify(e)===JSON.stringify(n)},toQs:function(t){
return e(t,function(e,t,n){return[n?"&":"?",encodeURIComponent(t),"=",encodeURIComponent(e[t])].join("").replace(/'/g,"%27")})}};return o}(),Hok.cookie={enabled:!0,cookie_nocookiesaround:!1,
initCheck:function(){return Hok.W.navigator.cookieEnabled},set:function(e,t,n,o,r,i){if(!Hok.cookie.enabled)return!1;Hok.cookie.cookie_nocookiesaround=!1;var s=new Date,c=new Date(s.getTime()+n)
;return Hok.WD.cookie=[e,"=",Hok.W.escape(t),n?";expires="+c.toGMTString():"",o?";path="+o:"",r?";domain="+r:"",i?";secure":""].join(),!0},del:function(e,t,n){if(!Hok.cookie.enabled)return!1;var o=!1
;return Hok.cookie.get(e)&&(Hok.WD.cookie=[e,"=",t?";path="+t:"",n?";domain="+n:"",";expires=Thu, 01-Jan-1970 00:00:01 GMT"].join(""),o=!0),o},get:function(e){
var t=Hok.WD.cookie.split(";"),n=t.length,o="",r="",i=!1,s=0;if(!Hok.cookie.enabled)return!1;for(null;s<n;s+=1){if(o=t[s].split("="),o[0].replace(/^\s+|\s+$/g,"")===e)return i=!0,
o.length>1&&(r=W.unescape(o[1].replace(/^\s+|\s+$/g,""))),r;o=null,""}return i},delall:function(){if(!Hok.cookie.enabled)return!1;var e,t=Hok.WD.cookie.split(/;/),n=t.length,o=0
;for(null;o<n;o+=1)e=t[o].split(/=/),Hok.cookie.del(e[0],!1,!1);return Hok.cookie.cookie_nocookiesaround=!0,!0},getall:function(){
return!!Hok.cookie.enabled&&(""===Hok.WD.cookie?[]:Hok.cookie.cookie_nocookiesaround?[]:Hok.WD.cookie.split(";").forEach(function(e){var t=e.split("=");return{name:t[0],value:t[1]}}))}},
Hok.dom.noAttrs=["innerHTML","style","dataset","className"],Hok.dom.setStyle=function(e,t){if(typeof t===Hok.TYPES.U)throw new Error("ERR: styles needed")
;for(var n in t)"float"===n?e.style[n.replace(/^float$/i,"cssFloat")]=t[n]:e.style[n]=t[n]},Hok.dom.setAttrs=function(e,t){if(typeof t===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var n in t)Hok.dom.noAttrs.indexOf(n)<0&&e.setAttribute(n,t[n])},Hok.dom.unsetAttrs=function(e,t){if(typeof t===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var n in t)Hok.dom.noAttrs.indexOf(n)<0&&e.removeAttribute(n,t[n])},Hok.dom.setData=function(e,t){if(typeof t===Hok.TYPES.U)throw new Error("ERR: data needed");for(var n in t)e.dataset[n]=t[n]},
Hok.dom.setClass=function(e,t){t.split(",").forEach(function(t){e.classList.add(t)})},Hok.dom.unsetData=function(e,t){if(typeof t===Hok.TYPES.U)throw new Error("ERR: data needed")
;for(var n in t)delete e.dataset[n]},Hok.dom.remove=function(e){return e.parentNode&&e.parentNode.removeChild(e)},Hok.dom.filterHtml=function(e){return""+e},Hok.dom.setText=function(e,t){
e.appendChild(document.createTextNode(t))},Hok.dom.setHtml=function(e,t){e.innerHTML=Hok.dom.filterHtml(t)},Hok.io=function(){function e(e,t,n){return fetch(e).then(function(e){return e.ok?e:(n(),
Promise.reject())}).then(function(e){return e.text()}).then(t)}function t(e,t,n){return fetch(e).then(function(e){return e.ok?e:(n(),Promise.reject())}).then(function(e){return e.json()
}).then(t).catch(n)}function n(e,t,n){return fetch(e).then(function(e){if(!e.ok)throw new Error("Network response was not ok");return e.text()}).then(function(e){
return(new DOMParser).parseFromString(e,"text/xml")}).then(t).catch(n)}return{get:e,getJson:t,getXML:n}}(),Hok.events._={events:{getElementDeterminant:function(e){
return e.tagName.match(/input|textarea|select/i)?"value":"innerHTML"},getElementEvent:function(e){return e.tagName.match(/input|textarea/i)?"input":"change"}},unhandlers:{},bindErr:function(e){
return"No straight way to "+(e?"":"un")+"}bind an event"}},Hok.events.saveUnhandler=function(e,t){Hok.events._.unhandlers[e]=Hok.events._.unhandlers[e]||[],Hok.events._.unhandlers[e].push(t)},
Hok.events.unhandle=function(e){Hok.events._.unhandlers[e]&&Hok.events._.unhandlers[e].forEach(function(e){e()}),Hok.events._.unhandlers=[]},Hok.events.on=function(){function e(e,t,n){
Hok.events.saveUnhandler(e,function(){Hok.events.off(e,t,n)})}return"addEventListener"in Hok.W?function(t,n,o,r){r=r||!1,t.addEventListener.apply(t,[n,o,r]),e(t,n,o)
}:"attachEvent"in Hok.W?function(t,n,o){t.attachEvent.apply(t,["on"+n,o]),e(t,n,o)}:function(){throw new Error(Hok.events._.bindErr(1))}}(),Hok.events.off=function(){
return"removeEventListener"in Hok.W?function(e,t,n){e.removeEventListener(t,n)}:"detachEvent"in Hok.W?function(e,t,n){e.detachEvent.apply(e,["on"+t,n])}:function(){
throw new Error(Hok.events._.bindErr(0))}}(),Hok.events.kill=function(e){return e||(e=Hok.W.event,e.cancelBubble=!0,e.returnValue=!1),"stopPropagation"in e&&e.stopPropagation(),e.preventDefault(),!1},
Hok.events.once=function(e,t,n){Hok.events.on(e,t,function o(r){n.call(e,r),Hok.events.off(e,t,o)})},Hok.events.eventTarget=function(e){e=e||Hok.W.event
;var t=e.currentTarget||typeof e.target!==Hok.TYPES.U?e.target:e.srcElement;if(!t)return!1;for(;3===t.nodeType&&null!==t.parentNode;)t=t.parentNode;return t},Hok.events.noEvents=function(e,t,n){
function o(e){r&&window.clearTimeout(r),r=window.setTimeout(function(){t(e)},n)}n=n||3e3,t=t||function(){};var r;Hok.events.on(e,"mousemove",o),Hok.events.on(e,"click",o),
Hok.events.on(e,"touchstart",o)},Hok.events.ready=function(){var e,t,n=setInterval(function(){if("complete"===document.readyState)for(clearInterval(n),e=0,t=o.length;e<t;e++)o[e].call(this)},10),o=[]
;return function(e){"complete"===document.readyState?e.call(this):o.push(e)}}(),Hok.history=function(){var e=[],t=function(t,n,o){return document.title=o,e.forEach(function(e){e(t,n,o)})};return{
push:function(e,n,o){Hok.H.pushState(n||{},o||"",e),t(e,n,o)},registerHandler:function(t){return e.push(t)},replace:function(e,n,o){Hok.H.replaceState(n||{},o||"",e),t(e,n,o)},back:function(){
Hok.H.back()},resetHandlers:function(){e=[]},state:function(){return Hok.H.state}}}(),Hok.i18n=function(){var e={},t=/i18n\(([^}|]*)?\|?([^}]*)\)/;return{lang:Hok.CONFIG.LANG,switchLang:function(e){
Hok.i18n.lang=e},check:function(e){return e.match(t)},dynamicLoad:function(t,n){var o=Hok.i18n.lang;for(n in t)o in t[n]&&(e[n]=t[n][o])},get:function(t,n){return Hok.ns.check(t,e)||n||"no Value"},
load:function(t){e=t},parse:function(e){var n,o,r,i=searchHash.forValue(e,t),s=i.length,c=0;for(null;c<s;c++)r=i[c],
(typeof r.regexp).match(/boolean/i)||(n=Hok.i18n.check(r.regexp[0]))&&(o=Hok.ns.check(r.container,e),o[r.key]=r.value.replace(n[0],Hok.i18n.get(n[1],n[2])))}}}(),Hok.solve=function(){
function Processor(e){this.content=e,this.stats={};var t=e.engy;this.config={fileNameSeparator:t&&t.fileNameSeparator?t.fileNameSeparator:Hok.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,
fileNamePrepend:t&&t.fileNamePrepend?t.fileNamePrepend:Hok.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,ext:t&&t.ext?t.ext:Hok.CONFIG.ENGY.COMPONENTS.EXT,
componentsUrl:t&&t.componentsUrl?t.componentsUrl:Hok.CONFIG.ENGY.COMPONENTS.URL}}var _clone=function(e){if(null==e||"object"!=typeof e)return e;var t,n=e.constructor()
;for(t in e)e.hasOwnProperty(t)&&(n[t]=_clone(e[t]));return n},_overwrite=function(e,t,n){for(var o=t.split(/\.|\//),r=o.length,i=0;i<r-1;)e=e[o[i++]];e[o[r-1]]=n},_mergeComponent=function(e,t,n){
var o,r=Hok.ns.check(t,e),i=Object.assign({},n);for(o in r)!o.match(/component|params/)&&(i[o]=r[o]);n.protected?_overwrite(e,t,n):_overwrite(e,t,i)
},components={},preloadedComponents={},PARAMETERS_RX=/\${([^}|]*)?\|?([^}]*)}/,cmp404=function(e){return JSON.stringify({tag:"div",style:{border:"1px solid red",backgroundColor:"pink",color:"red",
padding:"10px"},html:"no component found ("+e+")",protected:!0})};return Processor.prototype.getFileName=function(e){var t=e.split(/\/|\|/),n=e,o=this.config,r=t.length-1
;return t[r]=o.fileNamePrepend+t[r],n=t.join(o.fileNameSeparator),[o.componentsUrl,o.componentsUrl.match(/\/$/)?"":"/",n,o.ext].join("")},Processor.prototype.resetStats=function(){this.stats={time:0,
elements:0,requested:{},xhrTot:0}},Processor.prototype.parse=function(){
var self=this,langFunc=Hok.i18n.parse,elementsN=0,start=+new Date,end,xhrTot=0,requested={},cback,computeStats=Hok.CONFIG.ENGY.STATS;return new Promise(function(resolve,reject){!function solve(){
var component=searchHash.forKey(self.content,"component",{limit:1}),componentName,cached,preLoaded,xhrStart=0,xhrEnd=0;component.length?(component=component[0],
componentName=self.getFileName(component.value),component.value in requested?requested[component.value]++:(requested[component.value]=1,elementsN++),cached=componentName in components,
preLoaded=componentName in preloadedComponents,cback=function(cntORobj){xhrEnd=+new Date,xhrTot+=xhrEnd-xhrStart
;var params=Hok.ns.check(component.container+"/params",self.content),obj,usedParams,foundParam,foundParamValue,foundParamValueReplaced,i,l;if(preLoaded)obj=_clone(cntORobj);else{
cached||(components[componentName]=_clone(cntORobj));var evaluator=eval("(function (){return "+cntORobj+";})()");obj=evaluator(params)}if(params&&(usedParams=searchHash.forValue(obj,PARAMETERS_RX),
l=usedParams.length))for(i=0;i<l;i++)foundParam=Hok.ns.check(usedParams[i].regexp[1],params),foundParamValue=typeof foundParam!==Hok._U_?foundParam:usedParams[i].regexp[2]||"",
(typeof foundParamValue).match(/string/i)&&(foundParamValueReplaced=Hok.ns.check(usedParams[i].path,obj).replace(usedParams[i].regexp[0],foundParamValue)),
_overwrite(obj,usedParams[i].path,foundParamValueReplaced||foundParamValue)
;component.container?_mergeComponent(self.content,component.container,obj):(obj.protected?self.config=Object.assign({},self.config,obj):self.config=Object.assign({},obj,self.config),
self.content=Object.assign({},obj,self.content),delete self.content.component,delete self.content.params),langFunc&&langFunc(self.content),resolve(self.content,computeStats&&self.stats)},
xhrStart=+new Date,preLoaded?cback(preloadedComponents[componentName]):cached?cback(components[componentName]):Hok.io.get(componentName,cback,function(e){cback(cmp404(componentName))
})):(end=+new Date,self.stats.time=end-start,self.stats.elements=elementsN,self.stats.requested=requested,self.stats.xhrTot=xhrTot,resolve(self.content,{}))}()})},function(e){
return new Processor(e).parse()}}();var resolutive=function(){return Promise.resolve()},isDefined=function(e){return typeof e!==Hok.TYPES.U},isFunction=function(e){return typeof e===Hok.TYPES.F}
;Knot.prototype.initTag=function(){this.tag=this.config.tag||"div",this.node=this.config.ns?document.createElementNS(this.config.ns,this.tag):document.createElement(this.tag)},
Knot.prototype.initialize=function(){this.setCall("Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),
isDefined(this.config[Knot.identifier])&&!isDefined(this.config.nodes[this.config[Knot.identifier]])&&(this.nodes[this.config[Knot.identifier]]=this)},Knot.prototype.initRerender=function(){
this.setCall("Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),
isDefined(this.config[Knot.identifier])&&!isDefined(this.config.nodes[this.config[Knot.identifier]])&&(this.nodes[this.config[Knot.identifier]]=this),this.cb&&this.cb.call(this),
this.childrenKnots.forEach(function(e){e.initRerender()})},Knot.prototype.setState=function(e){if(isDefined(e))for(var t in o)o.hasOwnProperty(t)&&(this.state[t]=o[t]);else{
var n="state"in this.config,e=n?this.config.state:{};this.state=isFunction(e)?e.call(this):e}return this},Knot.prototype.setState=function(e){for(var t in e)e.hasOwnProperty(t)&&(this.state[t]=e[t])},
Knot.prototype.setCall=function(e){var t=this;e.split(/,/).forEach(function(e){t["set"+e]()})},Knot.prototype.lateKid=function(e){
e in this.nodes?consolw.warn('node already present by "'+Knot.byIdIdentifier+'"'):this.nodes[e]=this},Knot.prototype.setByRef=function(){if(Knot.byIdIdentifier in this.config){
var e=this.config[Knot.byIdIdentifier];this.nodes[e]=this}},Knot.prototype.getByRef=function(e){return e in this.nodes?this.nodes[e]:null},Knot.prototype.setRef=function(e,t){
e?(t||this).nodes[e]=t||this:isDefined(this.config.ref)&&(this.nodes[this.config.ref]=this)},Knot.prototype.setClassname=function(){
this.config.className&&Hok.dom.setClass(this.node,this.config.className)},Knot.prototype.setStyle=function(e){e&&(this.config.style=Object.assign({},this.config.style,e)),
this.config.style&&Hok.dom.setStyle(this.node,this.config.style)},Knot.prototype.setAttrs=function(e){var t=isFunction(this.config.attrs)?this.config.attrs.call(this):this.config.attrs
;e&&(t=Object.assign({},t,e)),this.config.attrs&&Hok.dom.setAttrs(this.node,t)},Knot.prototype.setData=function(e){e&&(this.config.data=Object.assign({},this.config.data,e)),
this.config.data&&(this.data=this.config.data,Hok.dom.setData(this.node,this.data))},Knot.prototype.setText=function(e){isDefined(e)&&(this.config.text=e),
isDefined(this.config.text)&&Hok.dom.setText(this.node,this.config.text)},Knot.prototype.setHtml=function(e){isDefined(e)&&(this.config.html=e),
isDefined(this.config.html)&&(isFunction(this.config.html)?Hok.dom.setHtml(this.node,this.config.html.call(this)):Hok.dom.setHtml(this.node,this.config.html))},Knot.prototype.setMethods=function(){
var e,t=this,n=Object.keys(this.config);n.forEach(function(n){
(e=n.match(/^method_(\w*)$/i))&&(e[1]in t?console.warn("[WARNING] : method '"+e[0]+"' cant be added, would override existing element."):t["_"+e[1]]=t.config[e[0]].bind(t))})},
Knot.prototype.setEvents=function(){var e,t,n,o=this;o.unhandlers={};for(n in o.config)(e=n.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(t=e[3].toLowerCase(),function(n){var r=function(e){
return o.config[n].call(o,e)};Hok.events[e[1]](o.node,t,r),o.unhandlers[t]=r}(n));return this.unhandleEvents=function(){return Object.entries(o.unhandlers).forEach(function(e){
Hok.events.off(o.node,e[0],e[1])}),o},this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents),this},Knot.prototype.unhandle=function(e){var t=this
;t.unhandlers=Object.entries(t.unhandlers).reduce(function(n,o){return o[0]===e?Hok.events.off(t.node,o[0],o[1]):n[o[0]]=o[1],n},{})},Knot.prototype.setEnd=function(e){const t=this
;return!this.rendered&&"end"in this.config&&isFunction(this.config.end)&&(this.ender=t.config.end.call(t)),this},Knot.prototype.render=function(){var e=this;return this.rendered?(this.initRerender(),
Promise.resolve(this)):(this.frag.appendChild(this.node),this.debt?this.children.reduce(function(t,n){var o=Object.assign({rendered:e.rendered},n,{target:e.node,parentKnot:e,rootKnot:e.rootKnot
}),r=new Knot(o);return e.childrenKnots.push(r),t.then(function(){return r.render()})},Promise.resolve()).then(function(){return e}):this.initCheck.call(this).then(function(){
e.clearTarget&&!e.rendered&&(e.target.innerHTML=""),e.cb.call(e).then(function(){return e.aborted||(e.rendered||e.target.appendChild(e.frag),e.rendered=!0),e}).catch(function(){
console.log("cant render: ",e)})}).then(function(){return e.parentKnot&&e.parentKnot.solve(),e}).catch(function(){e.frag.removeChild(e.node)}))},Knot.prototype.clear=function(){
this.ender&&this.ender(),this.target.removeChild(this.node),this.unhandleEvents()},Knot.prototype.solve=function(){this.debt>0&&this.debt--,this.debt<=0&&(this.solved=!0,this.render())},
Knot.prototype.report=function(){const e=JSON.stringify(this.config).length,t=this.node.innerHTML.length;return(t/e).toFixed(2)+" (html:"+t+" / json:"+e+")"},Knot.isknot=function(e){
return e instanceof Knot},Knot.identifier="id",Knot.byIdIdentifier="ref";var __renders={},__nodes={};return{io:Hok.io,i18n:Hok.i18n,dom:Hok.dom,events:Hok.events,render:render,get:get,
getKnotById:function(e){return e in __nodes?__nodes[e]:null},getElement:function(e){return e in __renders&&__renders[e]},getElements:function(){return __renders}}}(window)
;"object"==typeof exports&&(module.exports=hokuto);