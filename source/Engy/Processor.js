import Balle from 'balle'
import SearchHash from 'searchhash'
import { _clone, _overwrite, _mergeComponent } from './utilities'
import io from '../io'
import { checkns, _U_ } from '../core'
import i18n from '../i18n'
import CONF from '../config'

const components = {},
    preloadedComponents = {},
    config = {
        fileNameSeparator: '/',
        fileNamePrepend: CONF.ENGY.COMPONENTS.NAME_PREPEND,
        ext: CONF.ENGY.COMPONENTS.EXT,
        componentsUrl: CONF.ENGY.COMPONENTS.URL
    };

export default class Processor {
    constructor(conf) {
        this.config = conf;
        this.endPromise = Balle.one();
        this.stats = {
            time: 0,
            elements: 0,
            requested: {},
            xhrTot: 0
        }
    }

    static getFileName(n) {
        let els = n.split(/\/|\|/),
            res = n;

        const len = els.length - 1;

        els[len] = config.fileNamePrepend + els[len];
        res = els.join(config.fileNameSeparator);

        return [
            config.componentsUrl,
            config.componentsUrl.match(/\/$/) ? '' : '/',
            res,
            config.ext
        ].join('');
    }

    run() {

        var self = this,
            langFunc = i18n.parse,
            elementsN = 0,
            start = +new Date(),
            end,
            xhrTot = 0,
            requested = {},
            cback,
            computeStats = CONF.ENGY.STATS;


        (function solve() {


            var component = SearchHash.forKey(
                    self.config,
                    'component', { limit: 1 }
                ),
                componentName,
                cached, preLoaded,
                xhrStart = 0,
                xhrEnd = 0;

            if (!component.length) {
                end = +new Date();
                self.stats.time = end - start;
                self.stats.elements = elementsN;
                self.stats.requested = requested;
                self.stats.xhrTot = xhrTot;
                self.endPromise.resolve([self.config, computeStats && self.stats]);
            } else {
                component = component[0];
                componentName = Processor.getFileName(component.value);
                if (component.value in requested) {
                    requested[component.value]++;
                } else {
                    requested[component.value] = 1;
                    elementsN++;
                }
                cached = componentName in components;
                preLoaded = componentName in preloadedComponents;

                cback = function(cntORobj) {
                    xhrEnd = +new Date();
                    xhrTot += xhrEnd - xhrStart;
                    var params = checkns(component.container + '/params', self.config),
                        obj,
                        usedParams, foundParam, foundParamValue, foundParamValueReplaced, i, l;
                    if (preLoaded) {
                        obj = _clone(cntORobj);
                    } else {
                        if (!cached) {
                            components[componentName] = _clone(cntORobj);
                        }
                        cntORobj = cntORobj.replace(/^[^{]*/, '')
                            // .replace(/;?\n?$/, '')
                            .replace(/(;?([\n\s]*)?)$/, '');
                        // obj = eval('(' + cntORobj + ')');
                        obj = eval('(' + cntORobj + ')');
                    }
                    // before merging the object check for the presence of parameters
                    if (params) {
                        // check if into the component are used var placeholders
                        usedParams = SearchHash.forValue(obj, /#PARAM{([^}|]*)?\|?([^}]*)}/);
                        l = usedParams.length;
                        if (l) {
                            for (i = 0; i < l; i++) {
                                // check if the label of the placeholder is in the params
                                foundParam = checkns(usedParams[i].regexp[1], params);
                                // in case use it otherwise, the fallback otherwise cleanup
                                foundParamValue = typeof foundParam !== _U_ ? foundParam : (usedParams[i].regexp[2] || '');
                                // string or an object?
                                if ((typeof foundParamValue).match(/string/i)) {
                                    foundParamValueReplaced = checkns(usedParams[i].path, obj)
                                        .replace(usedParams[i].regexp[0], foundParamValue);

                                    _overwrite(obj, usedParams[i].path, foundParamValueReplaced);
                                } else {
                                    _overwrite(obj, usedParams[i].path, foundParamValue);
                                }
                            }
                        }
                    }
                    if (component.container) {
                        _mergeComponent(self.config, component.container, obj);
                    } else {
                        self.config = obj;
                    }
                    solve();
                };
                xhrStart = +new Date();
                // cached?
                if (preLoaded) {
                    cback(preloadedComponents[componentName]);
                } else if (cached) {
                    cback(components[componentName]);
                } else {
                    io.get(componentName, cback, true, null, true, (e) => {
                        cback(JSON.stringify({
                            tag: 'h2',
                            html: `no component found (${componentName})`
                        }))
                    });
                }
            }
        })();

        // now i18n, maybe
        //
        langFunc && langFunc(self.config);
        return self.endPromise;
    }
}