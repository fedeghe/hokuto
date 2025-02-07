import SearchHash from 'searchhash'
import { checkns } from './core'
import config from './config';

let data = {};
const RX_LANG = /i18n\(([^}|]*)?\|?([^}]*)\)/,
    i18n = {
        lang: config.LANG,
        check: lab => lab.match(RX_LANG),
        dynamicLoad: (lo, _label) => {
            for (_label in lo) {
                i18n.lang in lo[_label] && (data[_label] = lo[_label][i18n.lang]);
            }
        },
        get: (k, fallback) => checkns(k, data) || fallback || 'no Value',
        load: dict => { data = dict;},
        parse: obj => {
            const replacing = SearchHash.forValue(obj, RX_LANG),
                l = replacing.length;
                
            let mayP, ref, i = 0, r;
            for (null; i < l; i++) {
                r = replacing[i];
                if ((typeof r.regexp).match(/boolean/i)) continue;

                mayP = i18n.check(r.regexp[0]);

                if (mayP) {
                    ref = checkns(r.container, obj);
                    ref[r.key] = r.value.replace(mayP[0], i18n.get(mayP[1], mayP[2]));
                }
            }
        }
    };

export default i18n