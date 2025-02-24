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

with ~17.9KB of ❤️

Federico Ghedina <fedeghe@gmail.com>

*/
var hokuto=function(_){"use strict";function Knot(t,n){var e=this;this.config=t,this.clearTarget=n,this.rendered=!!t.rendered,this.frag=document.createDocumentFragment(),
this.target=this.config.target||document.body,this.children=this.config.children||[],this.childrenKnots=[],this.debt=~~this.children.length,this.solved=0===this.debt,
this.cb=this.config.cb||resolutive,this.parentKnot=this.config.parentKnot||null,this.rootKnot=this.config.rootKnot||this,this.initCheck=this.config.initCheck||resolutive,
this.abort=this.config.abort||resolutive,this.aborted=!1,this.ender=!1,this.state="state"in t?t.state:{},this.nodes=t.nodes||this.rootKnot.nodes,this.rootNodeUnhandlersCollector=[],this.unhandlers={},
this.abort.call(this).then().catch(function(){e.rootKnot.aborted=!0}),this.initTag(),this.initialize()}function render(t,n,e){return Hok.solve(t).then(function(t){
return"target"in t||(t.target=document.currentScript.parentNode),t.endFunctions=[],t.nodes=__nodes,new Knot(t,n).render().then(function(t){return e&&(__renders[e]=t),t})})}function get(t){
var n=document.createElement("div");return t.target=n,render(t)}var searchHash=function(){function t(t,n){return JSON.stringify(t)===JSON.stringify(n)&&!e(n)}function n(t){
return"string"==typeof t||t instanceof String}function e(t){return t instanceof RegExp}function o(t){
var n=String(t)!==t,e=t===Object(t),o="function"!=typeof t,r={}.toString.call(t).match(/\[object\sObject\]/);return n&&e&&o&&!(!r||!r.length)}function r(t){
var n={}.toString.call(t).match(/\[object\sArray\]/);return String(t)!==t&&!(!n||!n.length)}function i(t){return t&&"object"==typeof t&&void 0!==t.nodeType&&1===t.nodeType&&"string"==typeof t.nodeName
}function s(s,c,a,u){if(!o(c)&&!r(c))throw new Error("BAD PARAM: must search into an object or an array");var f,h=0,l=function(o,r){return n(o)&&e(r)?o.match(r):t(o,r)},d={key:function(t,n,e){
return"function"==typeof e?e(t):l(t,e)},value:function(t,n,e){return"function"==typeof e?e(n):l(n,e)},keyvalue:function(t,n,e){
return("function"==typeof e.key&&e.key(t)||l(t,e.key))&&("function"==typeof e.value&&e.value(n)||l(n,e.value))}}[s],p=[],m=function(t,n,e,o,r){
var i=[].concat.call(t,[n]),s=d(n,o[n],e),a=u.min<=r&&r<=u.max,f=i.length;a&&s&&(p.push({obj:o,value:o[n],key:i[f-1],parentKey:i[f-2],path:i.join("/"),getter:function(){return i.reduce(function(t,n){
return t[n]},c)},container:i.slice(0,f-1).join("/"),parentContainer:i.slice(0,f-2).join("/"),regexp:s,level:r}),h++),g(o[n],e,i,r+1)},g=function(t,n,e,o){if(!i(t)){var r,s
;if(t instanceof Array)for(r=0,s=t.length;r<s&&(m(e,r,n,t,o),u.limit!==h);r++);else if("object"==typeof t)for(r in t)if(m(e,r,n,t,o),u.limit===h)break}};return u.limit="limit"in u?~~u.limit:1/0,
u.min="min"in u?~~u.min:0,u.max="max"in u?~~u.max:1/0,0===u.limit?p:(u.min=u.min<0?0:u.min,u.max<u.min&&(f=u.min,u.min=u.max,u.max=f),g(c,a,[],0),u.sorter?p.sort(u.sorter):p)}return{
forKey:function(t,n,e){return s("key",t,n,e||{})},forValue:function(t,n,e){return s("value",t,n,e||{})},forKeyValue:function(t,n,e){return s("keyvalue",t,n,e||{})}}}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=searchHash);var Hok={W:_,_U_:"undefined",WD:_.document,H:_.history,TYPES:{U:"undefined",F:"function"},noop:function(){},
CONFIG:{},ns:{},dom:{},events:{},cookie:{},history:{},i18n:{},io:{},utils:{}};!function(t){t.type={},t.type.isFunction=function(t){return"function"==typeof t},t.type.isObject=function(n){
var e=String(n)!==n,o=n===Object(n),r=t.type.isFunction(n),i={}.toString.call(n).match(/\[object\sObject\]/);return e&&o&&r&&!(!i||!i.length)},t.type.isArray=function(t){
if(Array.isArray&&Array.isArray(t))return!0;var n=String(t)!==t,e={}.toString.call(t).match(/\[object\sArray\]/);return n&&!(!e||!e.length)}}(Hok.utils),Hok.ns.check=function(t,n){
t=t.replace(/^\//,"");var e=t.split(/\.|\//),o=e.length,r=0;if(n=typeof n!==Hok._U_?n:Hok.W,!t)return n;for(null;r<o;r+=1){if(typeof n[e[r]]===Hok._U_)return;n=n[e[r]]}return n},Hok.CONFIG={
AUTHOR:"Federico Ghedina",LANG:"en",ENGY:{STATS:!0,MODES:["PRE","LIVE"],MODE:0,COMPONENTS:{EXT:".js",URL:"/components/",NAME_PREPEND:"",PATH_SEPARATOR:"/"}},NS:"hokuto",NAME:"hokuto",VERSION:"0.1.0"},
function(t){t.noAttrs=["innerHTML","style","dataset","className"],t.setStyle=function(t,n){if(typeof n===Hok.TYPES.U)throw new Error("ERR: styles needed")
;for(var e in n)"float"===e?t.style[e.replace(/^float$/i,"cssFloat")]=n[e]:t.style[e]=n[e]},t.setAttrs=function(n,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var o in e)t.noAttrs.indexOf(o)<0&&n.setAttribute(o,e[o])},t.unsetAttrs=function(n,e){if(typeof e===Hok.TYPES.U)throw new Error("ERR: attrs needed")
;for(var o in e)t.noAttrs.indexOf(o)<0&&n.removeAttribute(o,e[o])},t.setData=function(t,n){if(typeof n===Hok.TYPES.U)throw new Error("ERR: data needed");for(var e in n)t.dataset[e]=n[e]},
t.setClass=function(t,n){n.split(",").forEach(function(n){t.classList.add(n)})},t.unsetData=function(t,n){if(typeof n===Hok.TYPES.U)throw new Error("ERR: data needed")
;for(var e in n)delete t.dataset[e]},t.remove=function(t){return t.parentNode&&t.parentNode.removeChild(t)},t.filterHtml=function(t){return""+t},t.setText=function(t,n){
t.appendChild(document.createTextNode(n))},t.setHtml=function(n,e){n.innerHTML=t.filterHtml(e)}}(Hok.dom),function(t){t.get=function(t,n,e){return fetch(t).then(function(t){return t.ok?t:(e(),
Promise.reject())}).then(function(t){return t.text()}).then(n)},t.post=function(t,n,e,o){return fetch(t,{method:"POST",headers:{"Content-type":"application/x-www-form-urlencoded; charset=UTF-8"},
body:new URLSearchParams(n)}).then(function(t){return t.ok?t:(o(),Promise.reject())}).then(function(t){return t.json()}).then(e)},t.getJson=function(t,n,e){return fetch(t).then(function(t){
return t.ok?t:(e(),Promise.reject())}).then(function(t){return t.json()}).then(n).catch(e)},t.getXML=function(t,n,e){return fetch(t).then(function(t){
if(!t.ok)throw new Error("Network response was not ok");return t.text()}).then(function(t){return(new DOMParser).parseFromString(t,"text/xml")}).then(n).catch(e)}}(Hok.io),function(t){t._={events:{
getElementDeterminant:function(t){return t.tagName.match(/input|textarea|select/i)?"value":"innerHTML"},getElementEvent:function(t){return t.tagName.match(/input|textarea/i)?"input":"change"}},
unhandlers:{},bindErr:function(t){return"No straight way to "+(t?"":"un")+"}bind an event"}},t.saveUnhandler=function(n,e){t._.unhandlers[n]=t._.unhandlers[n]||[],t._.unhandlers[n].push(e)},
t.unhandle=function(n){t._.unhandlers[n]&&t._.unhandlers[n].forEach(function(t){t()}),t._.unhandlers=[]},t.on=function(){function n(n,e,o){t.saveUnhandler(n,function(){t.off(n,e,o)})}
return"addEventListener"in Hok.W?function(t,e,o,r){r=r||!1,t.addEventListener.apply(t,[e,o,r]),n(t,e,o)}:"attachEvent"in Hok.W?function(t,e,o){t.attachEvent.apply(t,["on"+e,o]),n(t,e,o)}:function(){
throw new Error(t._.bindErr(1))}}(),t.off=function(){return"removeEventListener"in Hok.W?function(t,n,e){t.removeEventListener(n,e)}:"detachEvent"in Hok.W?function(t,n,e){
t.detachEvent.apply(t,["on"+n,e])}:function(){throw new Error(t._.bindErr(0))}}(),t.kill=function(t){return t||(t=Hok.W.event,t.cancelBubble=!0,t.returnValue=!1),
"stopPropagation"in t&&t.stopPropagation(),t.preventDefault(),!1},t.once=function(n,e,o){t.on(n,e,function r(i){o.call(n,i),t.off(n,e,r)})},t.eventTarget=function(t){t=t||Hok.W.event
;var n=t.currentTarget||typeof t.target!==Hok.TYPES.U?t.target:t.srcElement;if(!n)return!1;for(;3===n.nodeType&&null!==n.parentNode;)n=n.parentNode;return n},t.noEvents=function(n,e,o){function r(t){
i&&window.clearTimeout(i),i=window.setTimeout(function(){e(t)},o)}o=o||3e3,e=e||function(){};var i;t.on(n,"mousemove",r),t.on(n,"click",r),t.on(n,"touchstart",r)},t.ready=function(){
var t,n,e=setInterval(function(){if("complete"===document.readyState)for(clearInterval(e),t=0,n=o.length;t<n;t++)o[t].call(this)},10),o=[];return function(t){
"complete"===document.readyState?t.call(this):o.push(t)}}()}(Hok.events),function(t){var n={},e=/i18n\(([^}|]*)?\|?([^}]*)\)/;t.lang=Hok.CONFIG.LANG,t.switchLang=function(t){Hok.i18n.lang=t},
t.check=function(t){return t.match(e)},t.dynamicLoad=function(t,e){var o=Hok.i18n.lang;for(e in t)o in t[e]&&(n[e]=t[e][o])},t.get=function(t,e){return Hok.ns.check(t,n)||e||t+"<sup>&#2417;</sup>"},
t.load=function(t){n=t},t.parse=function(t){var n,o,r,i=searchHash.forValue(t,e),s=i.length,c=0;for(null;c<s;c++)r=i[c],
(typeof r.regexp).match(/boolean/i)||(n=Hok.i18n.check(r.regexp[0]))&&(o=Hok.ns.check(r.container,t),o[r.key]=r.value.replace(n[0],Hok.i18n.get(n[1],n[2])))}}(Hok.i18n),Hok.solve=function(){
function Processor(t){this.content=t,this.stats={};var n=t.engy;this.config={fileNameSeparator:n&&n.fileNameSeparator?n.fileNameSeparator:Hok.CONFIG.ENGY.COMPONENTS.PATH_SEPARATOR,
fileNamePrepend:n&&n.fileNamePrepend?n.fileNamePrepend:Hok.CONFIG.ENGY.COMPONENTS.NAME_PREPEND,ext:n&&n.ext?n.ext:Hok.CONFIG.ENGY.COMPONENTS.EXT,
componentsUrl:n&&n.componentsUrl?n.componentsUrl:Hok.CONFIG.ENGY.COMPONENTS.URL}}function report(t){var n=new Array(37).join("-");(0,
console.log)(n+"\n"+["%cHokuto%c used",t.elements,"component"+(1===t.elements?"":"s"),"\n"].join(" ")+"usage: \n"+Object.keys(t.requested).reduce(function(n,e){
return n+["•",e+":",t.requested[e],"time"+(t.requested[e]>1?"s":""),"\n"].join(" ")
},"")+["total time:",t.time+"ms","\n"].join(" ")+["◦ unfolding:",t.time-t.xhrTot+"ms","\n"].join(" ")+["◦ xhr:",t.xhrTot+"ms","\n"].join(" ")+n,"color:#6af;font-size:1.5em","")}var _clone=function(t){
if(null==t||"object"!=typeof t)return t;var n,e=t.constructor();for(n in t)t.hasOwn(n)&&(e[n]=_clone(t[n]));return e},_overwrite=function(t,n,e){
for(var o=n.split(/\.|\//),r=o.length,i=0;i<r-1;)t=t[o[i++]];t[o[r-1]]=e},_mergeComponent=function(t,n,e){var o,r=Hok.ns.check(n,t),i=Object.assign({},e)
;for(o in r)!o.match(/component|params/)&&(i[o]=r[o]);e.protected?_overwrite(t,n,e):_overwrite(t,n,i)},components={},preloadedComponents={},computeStats=Hok.CONFIG.ENGY.STATS,cmp404=function(t){
return JSON.stringify({tag:"div",style:{border:"1px solid red",backgroundColor:"pink",color:"red",padding:"10px"},html:"no component found ("+t+")",protected:!0})}
;return Processor.prototype.getFileName=function(t){var n=t.split(/\/|\|/),e=t,o=this.config,r=n.length-1;return n[r]=o.fileNamePrepend+n[r],e=n.join(o.fileNameSeparator),
[o.componentsUrl,o.componentsUrl.match(/\/$/)?"":"/",e,o.ext].join("")},Processor.prototype.resetStats=function(){this.stats={time:0,elements:0,requested:{},xhrTot:0}},
Processor.prototype.parse=function(){var self=this,langFunc=Hok.i18n.parse,elementsN=0,start=+new Date,end,xhrTot=0,requested={},cback,hasStats=!1;return new Promise(function(resolve){
!function solve(){var component=searchHash.forKey(self.content,"component",{limit:1}),componentName,cached,preLoaded,xhrStart=0,xhrEnd=0,trackEnd=function(){end=+new Date,self.stats.time=end-start,
self.stats.elements=elementsN,self.stats.requested=requested,self.stats.xhrTot=xhrTot};component.length?(hasStats=!0,component=component[0],componentName=self.getFileName(component.value),
component.value in requested?requested[component.value]++:(requested[component.value]=1,elementsN++),cached=componentName in components,preLoaded=componentName in preloadedComponents,
cback=function(cntORobj){xhrEnd=+new Date,xhrTot+=xhrEnd-xhrStart;var params=Hok.ns.check(component.container+"/params",self.content),obj,evaluator;if(preLoaded)obj=_clone(cntORobj);else{
cached||(components[componentName]=_clone(cntORobj));try{evaluator=eval("(function (){return "+cntORobj+";})()"),obj=evaluator(params)}catch(t){
console.error("Error evaluating component '"+componentName+"'"),console.error(t)}}
component.container?_mergeComponent(self.content,component.container,obj):(obj.protected?self.config=Object.assign({},self.config,obj):self.config=Object.assign({},obj,self.config),
self.content=Object.assign({},obj,self.content),delete self.content.component,delete self.content.params),langFunc&&langFunc(self.content),trackEnd(),solve()},xhrStart=+new Date,
preLoaded?cback(preloadedComponents[componentName]):cached?cback(components[componentName]):Hok.io.get(componentName,cback,function(){cback(cmp404(componentName))})):(trackEnd(),
langFunc&&langFunc(self.content),resolve([self.content,hasStats&&computeStats&&self.stats]))}()})},function(t){return new Processor(t).parse().then(function(t){return t[1]&&report(t[1]),t[0]})}}()
;var resolutive=function(){return Promise.resolve()},isDefined=function(t){return typeof t!==Hok.TYPES.U},isFunction=function(t){return typeof t===Hok.TYPES.F},functionize=function(t,n){
return isFunction(n)?n.call(t):n};Knot.prototype.initTag=function(){this.tag=this.config.tag||"div",
this.node=this.config.ns?document.createElementNS(this.config.ns,this.tag):document.createElement(this.tag)},Knot.prototype.initialize=function(){
this.setCall("Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods")},Knot.prototype.initRerender=function(){
this.setCall("Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods"),this.cb&&this.cb.call(this),this.childrenKnots.forEach(function(t){t.initRerender()})},
Knot.prototype.setState=function(t){if(isDefined(t))for(var n in t)t.hasOwnProperty(n)&&(this.state[n]=t[n]);else{var e="state"in this.config,t=e?this.config.state:{};this.state=functionize(this,t)}
return this},Knot.prototype.setId=function(t){var n,e=isDefined(this.config[Knot.identifier]),o={};(e||t)&&(n=e?this.config[Knot.identifier]:t,o[Knot.identifier]=n,this.setAttrs(o))},
Knot.prototype.setCall=function(t){var n=this;t.split(/,/).forEach(function(t){n["set"+t]()})},Knot.prototype.lateKid=function(t){
t in this.nodes?consolw.warn('node already present by "'+Knot.byIdIdentifier+'"'):this.nodes[t]=this},Knot.prototype.setByRef=function(){if(Knot.byIdIdentifier in this.config){
var t=this.config[Knot.byIdIdentifier];this.nodes[t]=this}},Knot.prototype.getByRef=function(t){return t in this.nodes?this.nodes[t]:null},Knot.prototype.setRef=function(t,n){
t?(n||this).nodes[t]=n||this:isDefined(this.config.ref)&&(this.nodes[this.config.ref]=this)},Knot.prototype.setClassname=function(){
this.config.className&&Hok.dom.setClass(this.node,this.config.className)},Knot.prototype.setStyle=function(t){var n=this;this.config.style=functionize(this,this.config.style||{}),
t&&(this.config.style=Object.assign({},n.config.style,functionize(n,t))),this.config.style&&Hok.dom.setStyle(this.node,this.config.style)},Knot.prototype.setAttrs=function(t){var n=this
;this.config.attrs=functionize(this,this.config.attrs||{}),t&&(this.config.attrs=Object.assign({},n.config.attrs,functionize(n,t))),this.config.attrs&&Hok.dom.setAttrs(this.node,this.config.attrs)},
Knot.prototype.unsetAttrs=function(t){t&&Hok.dom.unsetAttrs(this.node,t)},Knot.prototype.setData=function(t){t&&(this.config.data=Object.assign({},this.config.data,t)),
this.config.data&&(this.data=this.config.data,Hok.dom.setData(this.node,this.data))},Knot.prototype.unsetData=function(t){t&&Hok.dom.unsetData(this.node,t)},Knot.prototype.setText=function(t){
isDefined(t)&&(this.config.text=t),isDefined(this.config.text)&&Hok.dom.setText(this.node,this.config.text)},Knot.prototype.setHtml=function(t){isDefined(t)&&(this.config.html=t),
isDefined(this.config.html)&&(isFunction(this.config.html)?Hok.dom.setHtml(this.node,this.config.html.call(this)):Hok.dom.setHtml(this.node,this.config.html))},Knot.prototype.setMethods=function(){
var t,n=this,e=Object.keys(this.config);e.forEach(function(e){
(t=e.match(/^method_(\w*)$/i))&&(t[1]in n?console.warn("[WARNING] : method '"+t[0]+"' cant be added, would override existing element."):n["_"+t[1]]=n.config[t[0]].bind(n))})},
Knot.prototype.setEvents=function(){var t,n,e,o=this;o.unhandlers={};for(e in o.config)(t=e.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/))&&(n=t[3].toLowerCase(),function(e){var r=function(t){
return o.config[e].call(o,t)};Hok.events[t[1]](o.node,n,r),o.unhandlers[n]=r}(e));return this.unhandleEvents=function(){return Object.entries(o.unhandlers).forEach(function(t){
Hok.events.off(o.node,t[0],t[1])}),o},this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents),this},Knot.prototype.unhandle=function(t){var n=this
;n.unhandlers=Object.entries(n.unhandlers).reduce(function(e,o){return o[0]===t?Hok.events.off(n.node,o[0],o[1]):e[o[0]]=o[1],e},{})},Knot.prototype.setEnd=function(){var t=this
;return!this.rendered&&"end"in this.config&&isFunction(this.config.end)&&(this.ender=t.config.end.call(t)),this},Knot.prototype.render=function(){var t=this;return this.rendered?(this.initRerender(),
Promise.resolve(this)):(this.frag.appendChild(this.node),this.debt?this.children.reduce(function(n,e){var o=Object.assign({rendered:t.rendered},e,{target:t.node,parentKnot:t,rootKnot:t.rootKnot
}),r=new Knot(o);return t.childrenKnots.push(r),n.then(function(){return r.render()})},Promise.resolve()).then(function(){return t}):this.initCheck.call(this).then(function(){
return t.cb.call(t).then(function(){return t.aborted||(t.clearTarget&&!t.rendered&&(t.target.innerHTML=""),t.rendered||t.target.appendChild(t.frag),t.rendered=!0),t})}).then(function(){
return t.parentKnot&&t.parentKnot.solve(),t}).catch(function(){t.frag.removeChild(t.node)}))},Knot.prototype.clear=function(){this.ender&&this.ender(),this.target.removeChild(this.node),
this.unhandleEvents()},Knot.prototype.solve=function(){this.debt>0&&this.debt--,this.debt<=0&&(this.solved=!0,this.render())},Knot.prototype.report=function(){
var t=JSON.stringify(this.config).length,n=this.node.innerHTML.length;return(n/t).toFixed(2)+" (html:"+n+" / json:"+t+")"},Knot.isknot=function(t){return t instanceof Knot},Knot.identifier="id",
Knot.byIdIdentifier="ref";var __renders={},__nodes={};return{io:Hok.io,i18n:Hok.i18n,dom:Hok.dom,events:Hok.events,utils:Hok.utils,render:render,get:get,getKnotById:function(t){
return t in __nodes?__nodes[t]:null},getElement:function(t){return t in __renders&&__renders[t]},getElements:function(){return __renders}}}(window);"object"==typeof exports&&(module.exports=hokuto);