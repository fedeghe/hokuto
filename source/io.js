// ignore since 💯 https://www.npmjs.com/package/rexhr
/* istanbul ignore next */
(function (ctx){
    maltaF('../node_modules/rexhr/dist/index.js');
    ctx.get = rexhr.get;
    ctx.getJson = rexhr.getJson;
    ctx.getXML = rexhr.getXML;
    ctx.post = rexhr.post;
})(Hok.io);
