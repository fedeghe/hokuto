'use strict';
/*

HOKUTO

version 0.0.2 ~5KB
build #174 on 30/9/2020
with Malta 4.1.25
*/
var hokuto=function(){function t(e){var n=this,i=!1;this.status=t.STATUSES.PENDING,this.value=null,this.cause=null,this.resolvers=this.resolvers||[],this.rejectors=this.rejectors||[],this.finalizers=this.finalizers||[],e=e||function(){};try{e(function(e){i||n.status!==t.STATUSES.PENDING||(i=!0,n.status=t.STATUSES.FULFILLED,n.value=e,t.roll(n.resolvers,"value",n),t.roll(n.finalizers,"value",n))},function(e){i||n.status!==t.STATUSES.PENDING||(i=!0,n.status=t.STATUSES.REJECTED,n.cause=e,t.roll(n.rejectors,"cause",n),t.roll(n.finalizers,"cause",n))})}catch(e){return t.reject(e.message)}return this}function e(t){this.config=t,this.parent=t.target,this.node=document.createElement(t.tag||"div"),this.rendered=!1,this.toSolve=0,this.data="data"in t?t.data:{},this.dataSet={},this.rootNode="rootNode"in t?t.rootNode:this,this.parentNode="parentNode"in t?t.parentNode:this,this.resolve=function(){},this.reset=function(){},this.init(),this.setMethods()}t.roll=function(t,e,n){t.forEach(function(t){t(n[e])},n)},t.prototype.resolve=function(e){return t.call(this,function(t,n){return t(e)})},t.prototype.reject=function(e){return t.call(this,function(t,n){return n(e)})},t.prototype.launch=function(e){return t.call(this,e)},t.prototype.then=function(e,n){switch(this.status){case t.STATUSES.REJECTED:t.roll(this.rejectors,"cause",this);break;case t.STATUSES.PENDING:this.resolvers.push(e),n&&this.rejectors.push(n);break;case t.STATUSES.FULFILLED:e(this.value)}return this},t.prototype.catch=function(e){switch(this.status){case t.STATUSES.PENDING:this.rejectors.push(e);break;case t.STATUSES.REJECTED:return e.call(this,this.cause)}return this},t.prototype.finally=function(e){return this.finalizers.push(e),this.status!==t.STATUSES.PENDING&&t.roll(this.finalizers,"value",this),this},t.STATUSES={PENDING:"PENDING",FULFILLED:"FULFILLED",REJECTED:"REJECTED"},t._isFunc=function(t){return"function"==typeof t},t._isIterable=function(e){return null!=e&&t._isFunc(e[Symbol.iterator])},t.one=function(e){return new t(e)},t.all=function(e){if(!t._isIterable(e))return t.reject("Balle.all acceps an Iterable Promise only");var n=[],i=e.length,o=0;return new t(function(t,s){e.forEach(function(e,r){"REJECTED"==e.status&&s(e.cause),e.then(function(e){o++,n[r]=e,o==i&&t(n)}).catch(s)})})},t.race=function(e){return t._isIterable(e)?new t(function(t,n){e.forEach(function(e){e.then(t).catch(n)})}):t.reject("Balle.race acceps an Iterable Promise only")},t.chain=function(e){if(!t._isIterable(e))return t.reject("Balle.chain acceps an Iterable Promise only");var n=e.length;return new t(function(t,i){!function o(s,r){return s===n?t(r):e[s](r).then(function(t){o(++s,t)}).catch(function(t){i(t)})}(0)})},t.reject=function(e){return new t(function(t,n){return n(e)})},t.resolve=function(e){return new t(function(n,i){e instanceof t?e.then(n).catch(i):n(e)})},"object"==typeof exports&&(module.exports=t);var n=function(){function t(t,e){var n;if(typeof e!==c)for(n in e)"float"===n?t.style[n.replace(/^float$/i,"cssFloat")]=e[n]:t.style[n]=e[n]}function e(t,e){if(typeof e!==c)for(var n in e)a.indexOf(n)<0&&t.setAttribute(n,e[n])}function n(t,e){if(typeof e!==c)for(var n in e)t.dataset[n]=e[n]}function i(t){return""+t}function o(t,e){t.appendChild(document.createTextNode(e))}function s(t,e){t.innerHTML=i(e)}function r(t){return t instanceof Wnode}var c="undefined",a=["innerHTML","style","dataset","className"];return{isWnode:r,setText:o,setHtml:s,setStyle:t,setAttrs:e,setData:n}}();return e.prototype.init=function(){this.rendered=!1,this.setCall("Text,Html,Style,Attrs,Data,Cbs,Children")},e.prototype.setCall=function(t){var e=this;t.split(/,/).forEach(function(t){e["set"+t]()})},e.prototype.cleanup=function(){this.node.innerHTML="",this.node.parentNode.removeChild(this.node)},e.prototype.setChildren=function(){var t=this,n=[];if("children"in this.config){var i={target:t.node,rootNode:t.rootNode,parentNode:t};n="function"==typeof this.config.children?this.config.children.call(this).map(function(t){return new e(Object.assign({},t,i))}):this.config.children.map(function(t){return new e(Object.assign({},t,i))})}this.toSolve=n.length,this.children=n},e.prototype.setMethods=function(){var t,e=this,n=Object.keys(this.config);return n.forEach(function(n){(t=n.match(/^method_(\w*)$/i))&&(t[1]in e?console.warn("[WARNING] : method `"+t[0]+" cant be added, would override existing element."):e[t[1]]=e.config[t[0]].bind(e))}),this},e.prototype.setCbs=function(){this.cb="cb"in this.config&&"function"==typeof this.config.cb?this.config.cb.bind(this):this.solve.bind(this)},e.prototype.setStyle=function(){this.config.style&&n.setStyle(this.node,this.config.style)},e.prototype.setAttrs=function(){this.config.attrs&&n.setAttrs(this.node,this.config.attrs)},e.prototype.setData=function(){this.config.dataSet&&(this.dataSet=this.config.dataSet,n.setDataSet(this.node,this.dataSet))},e.prototype.setText=function(){void 0!==this.config.text&&n.setText(this.node,this.config.text)},e.prototype.setHtml=function(){void 0!==this.config.html&&n.setHtml(this.node,this.config.html)},e.prototype.done=e.prototype.solve=function(){--this.toSolve<=0&&(this.parent.appendChild(this.node),this.rendered=!0,this.resolve())},e.prototype.render=function(){var e=this,n=new t(function(t,n){e.resolve=t,e.reject=n});return this.rendered?(this.cleanup(),this.init(),this.render()):this.toSolve>0?this.children.forEach(function(t){t.render().then(function(){e.node.appendChild(t.node),e.cb()})}):this.cb(),n},{}.solve=function(t){return{then:function(e){return e(t)}}},{render:function(t){var n=t.target,i=document.createDocumentFragment();new e(Object.assign({},t,{target:i})).render().then(function(){n.appendChild(i)})},renderWithComponents:function(t){console.log("init",t)}}}();