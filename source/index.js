// eslint-disable-next-line no-unused-vars
var hokuto = (function (_) {
        
    // define internal object to publish from
    // Hok
    maltaF('core.js');
    //+++++++++++++++++++++++++++++++++++++++++++++++
    // libz start
    maltaF('searchhash.js');
    maltaF('channeljs.js');
    maltaF('io.js');
    // libz end
    
    //hokuto
    maltaF('utils.js');
    // maltaF('poly.js')
    maltaF('ns.js');
    maltaF('config.js');
    // maltaF('object.js')
    maltaF('cookie.js');
    maltaF('dom.js');
    maltaF('events.js');
    // maltaF('history.js')
    maltaF('i18n.js');
    
    maltaF('solve.js');
    maltaF('knot.js');
    maltaF('fx.js');
    //+++++++++++++++++++++++++++++++++++++++++++++++

    var __renders = {},
        __nodes = {};

    //function render(cnf, clear, name) {
    function render(params) {
        if(!Hok.utils.type.isDefined(params) || !Hok.utils.type.isDefined(params.config)){
            throw "Nothing to render";
        }
        var config = params.config,
            clear = !!params.clear,
            name = params.name,
            vanish = params.vanish,
            currentScript = document.currentScript,
            scriptParent = currentScript && currentScript.parentNode;
        return Hok.solve(config).then(
            function (solvedConfig){
                if(!('target' in solvedConfig) && scriptParent){
                    solvedConfig.target = scriptParent;
                }
                solvedConfig.endFunctions = [];
                solvedConfig.nodes = __nodes;
                
                return new Knot(solvedConfig, clear).render().then(function (n) {
                    if (name){
                        __renders[name] = n;
                    }
                    return n;
                }).finally(function() {
                    vanish && scriptParent.removeChild(currentScript);
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
        _: Hok,
        render: render,
        get: get,
        getKnotById: function (id) {
            return id in __nodes
                ? __nodes[id]
                : null;
        },
        getElement: function(n) { return n in __renders ? __renders[n] : false; },
        getElements: function() { return __renders; }
    };
})(window);
(typeof exports === 'object') && (module.exports = hokuto);