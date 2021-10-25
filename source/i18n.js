import SearchHash from 'searchhash'
import { checkns } from './core'
import config from './config';

const data = {},
    i18n = {
        lang: config.lang,
        check: lab => lab.match(/i18n\(([^}|]*)?\|?([^}]*)\)/),

        dynamicLoad: (lo, _label) => {
            for (_label in lo) {
                i18n.lang in lo[_label] && (data[_label] = lo[_label][i18n.lang]);
            }
        },

        get: (k, fallback) => checkns(k, data) || fallback || 'no Value',

        load: dict => {
            data = dict;
        },

        parse: obj => {
            const replacing = SearchHash.forValue(obj, /i18n\(([^}|]*)?\|?([^}]*)\)/),
                l = replacing.length;
                
            let mayP, ref, i = 0;

            for (; i < l; i++) {null
                if ((typeof replacing[i].regexp).match(/boolean/i)) continue;

                mayP = i18n.check(replacing[i].regexp[0]);

                if (mayP) {
                    ref = checkns(replacing[i].container, obj);
                    // ref[replacing[i].key] = mayP;
                    ref[replacing[i].key] = i18n.get(mayP[1], mayP[2]);
                }
            }
        }
    };

export default i18n