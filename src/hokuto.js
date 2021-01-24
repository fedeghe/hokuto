var hokuto = (function () {

    var _U_ = 'undefined',
        _ = {},
        LIB = {};

    
    var NS = {};

    maltaF('core.js')

    maltaF('_balle.js')

    maltaF('_searchhash.js')




    maltaF('events.js')

    maltaF('poly.js')

    maltaF('dom.js')


    // console.log("maltaV('NS')")
    
    maltaF('Unode.js');
    
    maltaF('engy.js');

    var __renders = {};

    function render(config, clear, name) {
        var target = config.target,
            fragment = document.createDocumentFragment(),
            wn = new Unode(
                Object.assign(
                    {},
                    config,
                    {
                        target: fragment,
                    }, {
                        map: {}
                    }
                )
            );
        if (name && !(name in __renders)) {
            __renders[name] = wn;
        }
        if (clear === true) {
            target.innerHTML = '';
        }
        return wn.render().then(function () {
            target.appendChild(fragment);
        });
    }

    function renderWithComponents(config) {
        console.log('init', config)
        // return Engy.solve(config).then(render)
    }
    
    function cleanup (trg, msg) {
        render({ target: trg, children: [{ html: msg || '' }] }, true);
    }

    function get (params) {
        var r = document.createElement('div'),
            unode;
        params.target = r;
        unode = render(params);
        return [r, unode.value];
    }

    function preload (src) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);

        // when finished remove the script tag
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
        s.src = src;
    }

    function getElement (n) {
        return n in __renders ? __renders[n] : false;
    }

    function getElements () {
        return __renders;
    }

    

    return {
        render: render,
        renderWithComponents: renderWithComponents ,
        cleanup: cleanup,
        get: get,
        preload: preload,
        getElement: getElement,
        getElements: getElements,
    };
})();