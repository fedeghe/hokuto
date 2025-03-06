// eslint-disable-next-line no-unused-vars
var hokuto = (function (_) {
        
    //+++++++++++++++++++++++++++++++++++++++++++++++
    //libz
    // can be ignored cause it is 💯 (https://www.npmjs.com/package/searchhash)
    /* istanbul ignore next */
    maltaF('../node_modules/searchhash/dist/index.js');
    
    //hokuto
    maltaF('core.js');
    maltaF('utils.js');
    // maltaF('poly.js')
    maltaF('ns.js');
    maltaF('config.js');
    // maltaF('object.js')
    maltaF('cookie.js');
    maltaF('dom.js');
    maltaF('io.js');
    maltaF('events.js');
    // maltaF('history.js')
    maltaF('i18n.js');
    
    maltaF('solve.js');
    maltaF('knot.js');
    //+++++++++++++++++++++++++++++++++++++++++++++++

    var __renders = {},
        __nodes = {};

    function render(cnf, clear, name) {
        var scriptParent = document.currentScript && document.currentScript.parentNode;
        return Hok.solve(cnf).then(
            function (config){
                if(!('target' in config) && scriptParent){
                    config.target = scriptParent;
                }
                config.endFunctions = [];
                config.nodes = __nodes;
                
                return new Knot(config, clear).render().then(function (n) {
                    if (name){
                        __renders[name] = n;
                    }
                    return n;
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
        io: Hok.io,
        i18n: Hok.i18n,
        dom: Hok.dom,
        events: Hok.events,
        utils: Hok.utils,
        cookie: Hok.cookie,

        render: render,
        get: get,
        getKnotById: function (id) {
            return id in __nodes
                ? __nodes[id]
                : null;
        },
        getElement: function(n) { return n in __renders ? __renders[n] : false; },
        getElements: function() { return __renders; },
    };
})(window);
(typeof exports === 'object') && (module.exports = hokuto);