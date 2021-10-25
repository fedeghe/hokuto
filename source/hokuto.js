import './poly'
import Unode from './unode'
import Engy from './Engy'
import TIMER from './timer'
import { TYPES } from './core'

window.hokuto = (function() {
    const __renders = {},
        render = (config, clear, name) => {
            var timeStart = +new Date(),
                timeEnd,
                target = config.target,
                originalHTML = target.innerHTML,
                fragment = document.createDocumentFragment(),
                active = true,
                map = {
                    abort: () => {
                        active = false;
                        target.innerHTML = originalHTML;
                        'onAbort' in config
                            &&
                            (typeof config.onAbort === TYPES.F) &&
                            config.onAbort.call(null, config);
                        return false;
                    },
                    add: (id, inst) => { map.elements[id] = inst; },
                    getNode: id => map.elements[id] || false,
                    getNodes: () => map.elements,
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
            return rootNode.render().then(() => {
                if (!active) return rootNode
                target.appendChild(fragment);
                timeEnd = +new Date();
                TIMER.add(timeEnd - timeStart);
                while (map.endFunctions.length) map.endFunctions.pop()();
            });
        },
        renderWithComponents = (config, clean, name) =>
        Engy.solve(config, clean, name).then(r => render.apply(null, r)),

        cleanup = (trg, msg) => render({ target: trg, children: [{ html: msg || '' }] }, true),
        get = params => {
            const r = document.createElement('div');
            let unode;
            params.target = r;
            unode = render(params);
            return [r, unode.value];
        },
        preload = src => {
            const s = document.createElement('script');
            document.getElementsByTagName('head')[0].appendChild(s);
            s.onload = () => s.parentNode.removeChild(s);
            s.src = src;
        },
        getElement = n => n in __renders ? __renders[n] : false,
        getElements = () => __renders;

    return {
        render,
        renderWithComponents,
        cleanup,
        get,
        preload,
        getElement,
        getElements,
    };
})();