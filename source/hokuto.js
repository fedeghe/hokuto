import channeljs from "@fedeghe/channeljs";
import './poly'
import Unode from './unode'
import Engy from './Engy'
import i18n from './i18n'
import { TYPES } from './core'
import h from './history'
import './loader'
import io from './io'

window.hokuto = (function() {
    const __renders = {},
        render = (config, clear, name) => {
            let active = true;

            const target = config.target,
                originalHTML = target.innerHTML,
                originalText = target.innerText,
                fragment = document.createDocumentFragment(),
                map = {
                    abort: () => {
                        active = false;
                        target.innerHTML = originalHTML;
                        target.inneText = originalText;
                        'onAbort' in config
                            &&
                            (typeof config.onAbort === TYPES.F) &&
                            config.onAbort.call(null, config);
                        return false;
                    },
                    add: (id, inst) => { map.elements[id] = inst; },
                    getNode: id => map.elements[id] || false,
                    getNodes: () => map.elements,
                    // do not arrow here, ctx needed!
                    lateWid: function(wid) { map.elements[wid] = this; },
                    elements: {},
                    endFunctions: [],
                    getElement: getElement,
                    getElements: getElements,
                },
                rootNode = new Unode(
                    Object.assign({},
                        config, {
                            isRoot: true,
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
            // return rootNode.render().then(() => {
            rootNode.render().then(() => {
                if (!active) return rootNode
                target.appendChild(fragment);
                while (map.endFunctions.length) map.endFunctions.pop()();
            });
            return rootNode;
        },
        renderWithComponents = (config, clean, name) =>
            Engy.solve(config, clean, name).then(r => render.apply(null, r)),

        cleanup = (trg, msg) => render({ target: trg, html: msg || ''}, true),
        clear = n => {
            if(typeof n.ender === 'function') {
                n.ender.call(n);
            }
            n.rootNodeUnhandlersCollector.forEach(unhandler => unhandler());
            n.node.parentNode.removeChild(n.node);
            // n.node.parentNode.innerHTML = '';
        },
        get = params => {
            const r = document.createElement('div');
            let unode;
            params.target = r;
            unode = render(params);
            return [r, unode.value];
        },
        load = route => {
            const rx = (typeof route === 'string')? hokuto.routes[route] : route;
            if (!rx) throw 'No such route available';
            const {src, url, state, title, replace} = rx;
            const script = document.createElement('script');
            script.onload = () => script.parentNode.removeChild(script);
            script.src = src;
            document.getElementsByTagName('head')[0].appendChild(script);
            if (url && state && title) {
                h[replace ? 'replace' : 'push'](url, {src, url, state, title}, title)
            }
        },
        getElement = n => n in __renders ? __renders[n] : false,
        getElements = () => __renders;

    return {
        render,
        renderWithComponents,
        cleanup,
        clear,
        get,
        load,
        getElement,
        getElements,
        channel: channeljs,
        i18n,
        history: h,
        io,
    };
})();

