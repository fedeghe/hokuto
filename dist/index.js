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

with ~20.4KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto=function(_){"use strict";function Knot(t,e){var n=this;this.config=t,this.clearTarget=e,this.rendered=!!t.rendered,this.frag=document.createDocumentFragment(),
this.target=this.config.target||document.body,this.children=this.config.children||[],this.childrenKnots=[],this.debt=~~this.children.length,this.solved=0===this.debt,
this.cb=this.config.cb||resolutive,this.parentKnot=this.config.parentKnot||null,this.rootKnot=this.config.rootKnot||this,this.initCheck=this.config.initCheck||resolutive,
this.abort=this.config.abort||resolutive,this.aborted=!1,this.ender=!1,this.state="state"in t?t.state:{},this.nodes=t.nodes||this.rootKnot.nodes,this.rootNodeUnhandlersCollector=[],this.unhandlers={},
this.abort.call(this).then().catch(function(){n.rootKnot.aborted=!0}),this.initTag(),this.initialize()}function render(t,e,n){return Hok.solve(t).then(function(t,o){
return"target"in t||(t.target=document.currentScript.parentNode),t.endFunctions=[],t.nodes=__nodes,new Knot(t,e).render().then(function(t){return n&&(__renders[n]=t),t})}).catch(function(t){
console.log({r:t})})}function get(t){var e=document.createElement("div");return t.target=e,render(t)}var searchHash=function(){function t(t,e){return JSON.stringify(t)===JSON.stringify(e)&&!n(e)}
function e(t){return"string"==typeof t||t instanceof String}function n(t){return t instanceof RegExp}function o(t){
var e=String(t)!==t,n=t===Object(t),o="function"!=typeof t,r={}.toString.call(t).match(/\[object\sObject\]/);return e&&n&&o&&!(!r||!r.length)}function r(t){
var e={}.toString.call(t).match(/\[object\sArray\]/);return String(t)!==t&&!(!e||!e.length)}function i(t){return t&&"object"==typeof t&&void 0!==t.nodeType&&1===t.nodeType&&"string"==typeof t.nodeName
}function s(s,c,a,f){if(!o(c)&&!r(c))throw new Error("BAD PARAM: must search into an object or an array");var u,l=0,d=function(o,r){return e(o)&&n(r)?o.match(r):t(o,r)},h={key:function(t,e,n){
return"function"==typeof n?n(t):d(t,n)},value:function(t,e,n){return"function"==typeof n?n(e):d(e,n)},keyvalue:function(t,e,n){
return("function"==typeof n.key&&n.key(t)||d(t,n.key))&&("function"==typeof n.value&&n.value(e)||d(e,n.value))}}[s],p=[],m=function(t,e,n,o,r){
var i=[].concat.call(t,[e]),s=h(e,o[e],n),a=f.min<=r&&r<=f.max,u=i.length;a&&s&&(p.push({obj:o,value:o[e],key:i[u-1],parentKey:i[u-2],path:i.join("/"),getter:function(){return i.reduce(function(t,e){
return t[e]},c)},container:i.slice(0,u-1).join("/"),parentContainer:i.slice(0,u-2).join("/"),regexp:s,level:r}),l++),k(o[e],n,i,r+1)},k=function(t,e,n,o){if(!i(t)){var r,s
;if(t instanceof Array)for(r=0,s=t.length;r<s&&(m(n,r,e,t,o),f.limit!==l);r++);else if("object"==typeof t)for(r in t)if(m(n,r,e,t,o),f.limit===l)break}};return f.limit="limit"in f?~~f.limit:1/0,
f.min="min"in f?~~f.min:0,f.max="max"in f?~~f.max:1/0,0===f.limit?p:(f.min=f.min<0?0:f.min,f.max<f.min&&(u=f.min,f.min=f.max,f.max=u),k(c,a,[],0),f.sorter?p.sort(f.sorter):p)}return{
forKey:function(t,e,n){return s("key",t,e,n||{})},forValue:function(t,e,n){return s("value",t,e,n||{})},forKeyValue:function(t,e,n){return s("keyvalue",t,e,n||{})}}}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=searchHash);var Hok={W:window,_U_:"undefined",WD:window.document,H:window.history,TYPES:{U:"undefined",F:"function"},
noop:function(){},CONFIG:{},ns:{},dom:{},events:{},cookie:{},history:{},i18n:{},io:{}};typeof Object.assign!==Hok.TYPES.F&&Object.defineProperty(Object,"assign",{value:function(t,e){
if(null===t||void 0===t)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(t),o=1,r=arguments.length;o<r;o++){var i=arguments[o]
;if(null!==i&&void 0!==i)for(var s in i)({}).hasOwnProperty.call(i,s)&&(n[s]=i[s])}return n},writable:!0,configurable:!0}),Hok.ns.make=function(t,e,n){t=t.replace(/^\//,"")
;var o,r=t.split(/\.|\//),i=r.length;return typeof n===Hok._U_&&(n=Hok.W),typeof e===Hok._U_&&(e={}),"function"==typeof e&&(e=e()),n[r[0]]||(n[r[0]]=1===i?e:{}),o=n[r[0]],
i>1?Hok.ns.make(r.slice(1).join("."),e,n[r[0]]):o},Hok.ns.check=function(t,e){t=t.replace(/^\//,"");var n=t.split(/\.|\//),o=n.length,r=0;if(e=typeof e!==Hok._U_?e:Hok.W,!t)return e
;for(null;r<o;r+=1){if(typeof e[n[r]]===Hok._U_)return;e=e[n[r]]}return e},Hok.ns.extend=function(t,e){var n,o="function"==typeof e?e():e;for(n in o)typeof t[n]===_U_&&(t[n]=o[n])},Hok.CONFIG={
AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!0,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"hokuto",NAME:"hokuto",VERSION:"0.1.0"},
Hok.object=function(){var t=function(t,e){var n,o="";for(n in t)t.hasOwnProperty(n)&&(o+=e(t,n,o));return o},e=function(t){
return"object"==typeof Node?t instanceof Hok.W.Node:t&&"object"==typeof t&&"number"==typeof t.nodeType&&"string"==typeof t.nodeName},n=function(t,e){
var n,o=e||("undefined"!=typeof global?global:"undefined"!=typeof window?window:this);for(n in t)t.hasOwnProperty(n)&&(o[n]=t[n])},o={extract:n,fromQs:function(){
var t,e=document.location.search.substr(1).split("&"),n=e.length,o=0,r=[];for(null;o<n;o+=1)t=e[o].split("="),!r[t[0]]&&(r[t[0]]=decodeURIComponent(t[1]));return r},clone:function(t){var e,n,r
;if(null===t||"object"!=typeof t)return t;if(t instanceof Date)return e=new Date,e.setTime(t.getTime()),e;if(t instanceof Array){for(e=[],n=0,r=t.length;n<r;n++)e[n]=o.clone(t[n]);return e}
if(t instanceof Object){e={};for(n in t)t.hasOwnProperty(n)&&(e[n]=o.clone(t[n]));return e}throw new Error("Unable to copy obj! Its type isn't supported.")},extend:function(t,e,n){var r,i=o.clone(t)
;for(r in e)!e.hasOwnProperty(r)||r in i&&!n||(i[r]=e[r]);return i},keyize:function(t,e){var n={},o=0,r=t.length;for(null;o<r;o++)e in t[o]&&!(t[o][e]in n)&&(n[t[o][e]]=t[o]);return n},
isString:function(t){return"string"==typeof t||t instanceof String},jCompare:function(t,n){return e(t)||typeof JSON===Hok._U_?t===n:JSON.stringify(t)===JSON.stringify(n)},toQs:function(e){
return t(e,function(t,e,n){return[n?"&":"?",encodeURIComponent(e),"=",encodeURIComponent(t[e])].join("").replace(/'/g,"%27")})}};return o}(),Hok.cookie={enabled:!0,cookie_nocookiesaround:!1,
initCheck:function(){return Hok.W.navigator.cookieEnabled},set:function(t,e,n,o,r,i){if(!Hok.cookie.enabled)return!1;Hok.cookie.cookie_nocookiesaround=!1;var s=new Date,c=new Date(s.getTime()+n)
;return Hok.WD.cookie=[t,"=",Hok.W.escape(e),n?";expires="+c.toGMTString():"",o?";path="+o:"",r?";domain="+r:"",i?";secure":""].join(),!0},del:function(t,e,n){if(!Hok.cookie.enabled)return!1;var o=!1
;return Hok.cookie.get(t)&&(Hok.WD.cookie=[t,"=",e?";path="+e:"",n?";domain="+n:"",";expires=Thu, 01-Jan-1970 00:00:01 GMT"].join(""),o=!0),o},get:function(t){
var e=Hok.WD.cookie.split(";"),n=e.length,o="",r="",i=!1,s=0;if(!Hok.cookie.enabled)return!1;for(null;s<n;s+=1){if(o=e[s].split("="),o[0].replace(/^\s+|\s+$/g,"")===t)return i=!0,
o.length>1&&(r=W.unescape(o[1].replace(/^\s+|\s+$/g,""))),r;o=null,""}return i},delall:function(){if(!Hok.cookie.enabled)return!1;var t,e=Hok.WD.cookie.split(/;/),n=e.length,o=0
;for(null;o<n;o+=1)t=e[o].split(/=/),Hok.cookie.del(t[0],!1,!1);return Hok.cookie.cookie_nocookiesaround=!0,!0},getall:function(){
return!!Hok.cookie.enabled&&(""===Hok.WD.cookie?[]:Hok.cookie.cookie_nocookiesaround?[]:Hok.WD.cookie.split(";").forEach(function(t){var e=t.split("=");return{name:e[0],value:e[1]}}))}},
Hok.dom.noAttrs=["innerHTML","style","dataset","className"],Hok.dom.setStyle=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: styles needed")
;for(var n in e)"float"===n?t.style[n.replace(/^float$/i,"cssFloat")]=e[n]:t.style[n]=e[n]},Hok.dom.setAttrs=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var n in e)Hok.dom.noAttrs.indexOf(n)<0&&t.setAttribute(n,e[n])},Hok.dom.unsetAttrs=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var n in e)Hok.dom.noAttrs.indexOf(n)<0&&t.removeAttribute(n,e[n])},Hok.dom.setData=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: data needed");for(var n in e)t.dataset[n]=e[n]},
Hok.dom.setClass=function(t,e){e.split(",").forEach(function(e){t.classList.add(e)})},Hok.dom.unsetData=function(t,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: data needed")
;for(var n in e)delete t.dataset[n]},Hok.dom.remove=function(t){return t.parentNode&&t.parentNode.removeChild(t)},Hok.dom.filterHtml=function(t){return""+t},Hok.dom.setText=function(t,e){
t.appendChild(document.createTextNode(e))},Hok.dom.setHtml=function(t,e){t.innerHTML=Hok.dom.filterHtml(e)},Hok.io=function(){function t(t,e,n){return fetch(t).then(function(t){return t.ok?t:(n(),
Promise.reject())}).then(function(t){return t.text()}).then(e)}function e(t,e,n){return fetch(t).then(function(t){return t.ok?t:(n(),Promise.reject())}).then(function(t){return t.json()
}).then(e).catch(n)}function n(t,e,n){return fetch(t).then(function(t){if(!t.ok)throw new Error("Network response was not ok");return t.text()}).then(function(t){
return(new DOMParser).parseFromString(t,"text/xml")}).then(e).catch(n)}return{get:t,getJson:e,getXML:n}}(),Hok.events._={events:{getElementDeterminant:function(t){
return t.tagName.match(/input|textarea|select/i)?"value":"innerHTML"},getElementEvent:function(t){return t.tagName.match(/input|textarea/i)?"input":"change"}},unhandlers:{},bindErr:function(t){
return"No straight way to "+(t?"":"un")+"}bind an event"}},Hok.events.saveUnhandler=function(t,e){Hok.events._.unhandlers[t]=Hok.events._.unhandlers[t]||[],Hok.events._.unhandlers[t].push(e)},
Hok.events.unhandle=function(t){Hok.events._.unhandlers[t]&&Hok.events._.unhandlers[t].forEach(function(t){t()}),Hok.events._.unhandlers=[]},Hok.events.on=function(){function t(t,e,n){
Hok.events.saveUnhandler(t,function(){Hok.events.off(t,e,n)})}return"addEventListener"in Hok.W?function(e,n,o,r){r=r||!1,e.addEventListener.apply(e,[n,o,r]),t(e,n,o)
}:"attachEvent"in Hok.W?function(e,n,o){e.attachEvent.apply(e,["on"+n,o]),t(e,n,o)}:function(){throw new Error(Hok.events._.bindErr(1))}}(),Hok.events.off=function(){
return"removeEventListener"in Hok.W?function(t,e,n){t.removeEventListener(e,n)}:"detachEvent"in Hok.W?function(t,e,n){t.detachEvent.apply(t,["on"+e,n])}:function(){
throw new Error(Hok.events._.bindErr(0))}}(),Hok.events.kill=function(t){return t||(t=Hok.W.event,t.cancelBubble=!0,t.returnValue=!1),"stopPropagation"in t&&t.stopPropagation(),t.preventDefault(),!1},
Hok.events.once=function(t,e,n){Hok.events.on(t,e,function o(r){n.call(t,r),Hok.events.off(t,e,o)})},Hok.events.eventTarget=function(t){t=t||Hok.W.event
;var e=t.currentTarget||typeof t.target!==Hok.TYPES.U?t.target:t.srcElement;if(!e)return!1;for(;3===e.nodeType&&null!==e.parentNode;)e=e.parentNode;return e},Hok.events.noEvents=function(t,e,n){
function o(t){r&&window.clearTimeout(r),r=window.setTimeout(function(){e(t)},n)}n=n||3e3,e=e||function(){};var r;Hok.events.on(t,"mousemove",o),Hok.events.on(t,"click",o),
Hok.events.on(t,"touchstart",o)},Hok.events.ready=function(){var t,e,n=setInterval(function(){if("complete"===document.readyState)for(clearInterval(n),t=0,e=o.length;t<e;t++)o[t].call(this)},10),o=[]
;return function(t){"complete"===document.readyState?t.call(this):o.push(t)}}(),Hok.history=function(){var t=[],e=function(e,n,o){return document.title=o,t.forEach(function(t){t(e,n,o)})};return{
push:function(t,n,o){Hok.H.pushState(n||{},o||"",t),e(t,n,o)},registerHandler:function(e){return t.push(e)},replace:function(t,n,o){Hok.H.replaceState(n||{},o||"",t),e(t,n,o)},back:function(){
Hok.H.back()},resetHandlers:function(){t=[]},state:function(){return Hok.H.state}}}(),Hok.i18n=function(){var t={},e=/i18n\(([^}|]*)?\|?([^}]*)\)/;return{lang:Hok.CONFIG.LANG,switchLang:function(t){
Hok.i18n.lang=t},check:function(t){return t.match(e)},dynamicLoad:function(e,n){var o=Hok.i18n.lang;for(n in e)o in e[n]&&(t[n]=e[n][o])},get:function(e,n){return Hok.ns.check(e,t)||n||"no Value"},
load:function(e){t=e},parse:function(t){var n,o,r,i=searchHash.forValue(t,e),s=i.length,c=0;for(null;c<s;c++)r=i[c],
(typeof r.regexp).match(/boolean/i)||(n=Hok.i18n.check(r.regexp[0]))&&(o=Hok.ns.check(r.container,t),o[r.key]=r.value.replace(n[0],Hok.i18n.get(n[1],n[2])))}}}(),Hok.solve=function(){
function Processor(t){this.content=t,this.stats={};var e=t.engy;this.config={fileNameSeparator:e&&e.fileNameSeparator?e.fileNameSeparator:Hok.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,
fileNamePrepend:e&&e.fileNamePrepend?e.fileNamePrepend:Hok.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,ext:e&&e.ext?e.ext:Hok.CONFIG.ENGY.COMPONENTS.EXT,
componentsUrl:e&&e.componentsUrl?e.componentsUrl:Hok.CONFIG.ENGY.COMPONENTS.URL}}var _clone=function(t){if(null==t||"object"!=typeof t)return t;var e,n=t.constructor()
;for(e in t)t.hasOwnProperty(e)&&(n[e]=_clone(t[e]));return n},_overwrite=function(t,e,n){for(var o=e.split(/\.|\//),r=o.length,i=0;i<r-1;)t=t[o[i++]];t[o[r-1]]=n},_mergeComponent=function(t,e,n){
var o,r=Hok.ns.check(e,t),i=Object.assign({},n);for(o in r)!o.match(/component|params/)&&(i[o]=r[o]);n.protected?_overwrite(t,e,n):_overwrite(t,e,i)
},components={},preloadedComponents={},PARAMETERS_RX=/\${([^}|]*)?\|?([^}]*)}/,cmp404=function(t){return JSON.stringify({tag:"div",style:{border:"1px solid red",backgroundColor:"pink",color:"red",
padding:"10px"},html:"no component found ("+t+")",protected:!0})};return Processor.prototype.getFileName=function(t){var e=t.split(/\/|\|/),n=t,o=this.config,r=e.length-1
;return e[r]=o.fileNamePrepend+e[r],n=e.join(o.fileNameSeparator),[o.componentsUrl,o.componentsUrl.match(/\/$/)?"":"/",n,o.ext].join("")},Processor.prototype.resetStats=function(){this.stats={time:0,
elements:0,requested:{},xhrTot:0}},Processor.prototype.parse=function(){
var self=this,langFunc=Hok.i18n.parse,elementsN=0,start=+new Date,end,xhrTot=0,requested={},cback,computeStats=Hok.CONFIG.ENGY.STATS;return new Promise(function(resolve,reject){!function solve(){
var component=searchHash.forKey(self.content,"component",{limit:1}),componentName,cached,preLoaded,xhrStart=0,xhrEnd=0;component.length?(component=component[0],
componentName=self.getFileName(component.value),component.value in requested?requested[component.value]++:(requested[component.value]=1,elementsN++),cached=componentName in components,
preLoaded=componentName in preloadedComponents,cback=function(cntORobj){xhrEnd=+new Date,xhrTot+=xhrEnd-xhrStart;var params=Hok.ns.check(component.container+"/params",self.content),obj
;if(preLoaded)obj=_clone(cntORobj);else{cached||(components[componentName]=_clone(cntORobj));var evaluator=eval("(function (){return "+cntORobj+";})()");obj=evaluator(params)}
component.container?_mergeComponent(self.content,component.container,obj):(obj.protected?self.config=Object.assign({},self.config,obj):self.config=Object.assign({},obj,self.config),
self.content=Object.assign({},obj,self.content),delete self.content.component,delete self.content.params),langFunc&&langFunc(self.content),resolve(self.content,computeStats&&self.stats)},
xhrStart=+new Date,preLoaded?cback(preloadedComponents[componentName]):cached?cback(components[componentName]):Hok.io.get(componentName,cback,function(t){cback(cmp404(componentName))
})):(end=+new Date,self.stats.time=end-start,self.stats.elements=elementsN,self.stats.requested=requested,self.stats.xhrTot=xhrTot,resolve(self.content,{}))}()})},function(t){
return new Processor(t).parse()}}();var resolutive=function(){return Promise.resolve()},isDefined=function(t){return typeof t!==Hok.TYPES.U},isFunction=function(t){return typeof t===Hok.TYPES.F}
;Knot.prototype.initTag=function(){this.tag=this.config.tag||"div",this.node=this.config.ns?document.createElementNS(this.config.ns,this.tag):document.createElement(this.tag)},
Knot.prototype.initialize=function(){this.setCall("Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods")},Knot.prototype.initRerender=function(){
this.setCall("Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),this.cb&&this.cb.call(this),this.childrenKnots.forEach(function(t){t.initRerender()})},
Knot.prototype.setState=function(t){if(isDefined(t))for(var e in t)t.hasOwnProperty(e)&&(this.state[e]=t[e]);else{var n="state"in this.config,t=n?this.config.state:{}
;this.state=isFunction(t)?t.call(this):t}return this},Knot.prototype.setId=function(t){var e,n=isDefined(this.config[Knot.identifier]),o={};(n||t)&&(e=n?this.config[Knot.identifier]:t,
o[Knot.identifier]=e,this.setAttrs(o))},Knot.prototype.setCall=function(t){var e=this;t.split(/,/).forEach(function(t){e["set"+t]()})},Knot.prototype.lateKid=function(t){
t in this.nodes?consolw.warn('node already present by "'+Knot.byIdIdentifier+'"'):this.nodes[t]=this},Knot.prototype.setByRef=function(){if(Knot.byIdIdentifier in this.config){
var t=this.config[Knot.byIdIdentifier];this.nodes[t]=this}},Knot.prototype.getByRef=function(t){return t in this.nodes?this.nodes[t]:null},Knot.prototype.setRef=function(t,e){
t?(e||this).nodes[t]=e||this:isDefined(this.config.ref)&&(this.nodes[this.config.ref]=this)},Knot.prototype.setClassname=function(){
this.config.className&&Hok.dom.setClass(this.node,this.config.className)},Knot.prototype.setStyle=function(t){t&&(this.config.style=Object.assign({},this.config.style,t)),
this.config.style&&Hok.dom.setStyle(this.node,this.config.style)},Knot.prototype.setAttrs=function(t){var e=isFunction(this.config.attrs)?this.config.attrs.call(this):this.config.attrs
;t&&(e=Object.assign({},e,t)),e&&Hok.dom.setAttrs(this.node,e)},Knot.prototype.setData=function(t){t&&(this.config.data=Object.assign({},this.config.data,t)),
this.config.data&&(this.data=this.config.data,Hok.dom.setData(this.node,this.data))},Knot.prototype.setText=function(t){isDefined(t)&&(this.config.text=t),
isDefined(this.config.text)&&Hok.dom.setText(this.node,this.config.text)},Knot.prototype.setHtml=function(t){isDefined(t)&&(this.config.html=t),
isDefined(this.config.html)&&(isFunction(this.config.html)?Hok.dom.setHtml(this.node,this.config.html.call(this)):Hok.dom.setHtml(this.node,this.config.html))},Knot.prototype.setMethods=function(){
var t,e=this,n=Object.keys(this.config);n.forEach(function(n){
(t=n.match(/^method_(\w*)$/i))&&(t[1]in e?console.warn("[WARNING] : method '"+t[0]+"' cant be added, would override existing element."):e["_"+t[1]]=e.config[t[0]].bind(e))})},
Knot.prototype.setEvents=function(){var t,e,n,o=this;o.unhandlers={};for(n in o.config)(t=n.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(e=t[3].toLowerCase(),function(n){var r=function(t){
return o.config[n].call(o,t)};Hok.events[t[1]](o.node,e,r),o.unhandlers[e]=r}(n));return this.unhandleEvents=function(){return Object.entries(o.unhandlers).forEach(function(t){
Hok.events.off(o.node,t[0],t[1])}),o},this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents),this},Knot.prototype.unhandle=function(t){var e=this
;e.unhandlers=Object.entries(e.unhandlers).reduce(function(n,o){return o[0]===t?Hok.events.off(e.node,o[0],o[1]):n[o[0]]=o[1],n},{})},Knot.prototype.setEnd=function(t){var e=this
;return!this.rendered&&"end"in this.config&&isFunction(this.config.end)&&(this.ender=e.config.end.call(e)),this},Knot.prototype.render=function(){var t=this;return this.rendered?(this.initRerender(),
Promise.resolve(this)):(this.frag.appendChild(this.node),this.debt?this.children.reduce(function(e,n){var o=Object.assign({rendered:t.rendered},n,{target:t.node,parentKnot:t,rootKnot:t.rootKnot
}),r=new Knot(o);return t.childrenKnots.push(r),e.then(function(){return r.render()})},Promise.resolve()).then(function(){return t}):this.initCheck.call(this).then(function(){
return t.cb.call(t).then(function(){return t.aborted||(t.clearTarget&&!t.rendered&&(t.target.innerHTML=""),t.rendered||t.target.appendChild(t.frag),t.rendered=!0),t})}).then(function(){
return t.parentKnot&&t.parentKnot.solve(),t}).catch(function(){t.frag.removeChild(t.node)}))},Knot.prototype.clear=function(){this.ender&&this.ender(),this.target.removeChild(this.node),
this.unhandleEvents()},Knot.prototype.solve=function(){this.debt>0&&this.debt--,this.debt<=0&&(this.solved=!0,this.render())},Knot.prototype.report=function(){
var t=JSON.stringify(this.config).length,e=this.node.innerHTML.length;return(e/t).toFixed(2)+" (html:"+e+" / json:"+t+")"},Knot.isknot=function(t){return t instanceof Knot},Knot.identifier="id",
Knot.byIdIdentifier="ref";var __renders={},__nodes={};return{io:Hok.io,i18n:Hok.i18n,dom:Hok.dom,events:Hok.events,render:render,get:get,getKnotById:function(t){return t in __nodes?__nodes[t]:null},
getElement:function(t){return t in __renders&&__renders[t]},getElements:function(){return __renders}}}(window);"object"==typeof exports&&(module.exports=hokuto);