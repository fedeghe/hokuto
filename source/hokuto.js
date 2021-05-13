import './poly'
import Unode from './unode'
import TIMER from './timer'

window.hokuto = (function() {

    var TYPES = {
            U: 'undefined',
            F: 'function'
        },
        _ = {},
        W = window,
        WD = W.document,
        NS = {};

    var __renders = {};

    function render(config, clear, name) {
        var timeStart = +new Date(),
            timeEnd,
            target = config.target,
            originalHTML = target.innerHTML,
            fragment = document.createDocumentFragment(),
            active = true,
            map = {
                abort: function() {
                    active = false;
                    target.innerHTML = originalHTML;
                    'onAbort' in config
                        &&
                        (typeof config.onAbort === TYPES.F) &&
                        config.onAbort.call(null, config);
                    return false;
                },
                add: function(id, inst) { map.elements[id] = inst; },
                getNode: function(id) {
                    return map.elements[id] || false;
                },
                getNodes: function() { return map.elements; },
                lateWid: function(wid) { map.elements[wid] = this; },
                elements: {},
                endFunctions: [],
                getElement: getElement,
                getElements: getElements
            },
            rootNode = new Unode(
                Object.assign({},
                    config, {
                        target: fragment,
                    }
                ),
                map
            );
        if (name && !(name in __renders)) {
            __renders[name] = rootNode;
        }
        if (clear === true) {
            target.innerHTML = '';
        }
        return rootNode.render().then(function() {
            if (!active) returnrootNode
            target.appendChild(fragment);
            timeEnd = +new Date();
            TIMER.add(timeEnd - timeStart);
            while (map.endFunctions.length) map.endFunctions.pop()();
        });
    }

    function renderWithComponents(config) {
        console.log('init', config)
            // return Engy.solve(config).then(render)
    }

    function cleanup(trg, msg) {
        render({ target: trg, children: [{ html: msg || '' }] }, true);
    }

    function get(params) {
        var r = document.createElement('div'),
            unode;
        params.target = r;
        unode = render(params);
        return [r, unode.value];
    }

    function preload(src) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);

        // when finished remove the script tag
        s.onload = function() {
            s.parentNode.removeChild(s);
        };
        s.src = src;
    }

    function getElement(n) {
        return n in __renders ? __renders[n] : false;
    }

    function getElements() {
        return __renders;
    }

    return {
        render: render,
        renderWithComponents: renderWithComponents,
        cleanup: cleanup,
        get: get,
        preload: preload,
        getElement: getElement,
        getElements: getElements,
    };
})();