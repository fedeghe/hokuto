import { _U_ } from './core'

const strMap = (o, fn) => {
        let ret = '',
            j;
        for (j in o) {
            if (o.hasOwnProperty(j)) {
                ret += fn(o, j, ret);
            }
        }
        return ret;
    },
        

    // Returns true if it is a DOM node
    isNode = o => typeof Node === 'object'
        ? o instanceof W.Node
        : o
            && typeof o === 'object'
            && typeof o.nodeType === 'number'
            && typeof o.nodeName === 'string',

    extract = (data, where) => {
        const g = where
            || ( typeof global !== 'undefined'
                ? global
                : (typeof window !== 'undefined' ? window : this)
            );
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                g[key] = data[key];
            }
        }
    };

const OBJECT = {
    extract: extract,
    fromQs: () => {
        const els = document.location.search.substr(1).split('&'),
            len = els.length;

        let i = 0,
            tmp,
            out = [];

        for (null; i < len; i += 1) {
            tmp = els[i].split('=');
            // do not override extra path out
            //
            !out[tmp[0]] && (out[tmp[0]] = decodeURIComponent(tmp[1]));
        }
        return out;
    },

    clone: obj => {
        let  copy,
            i, l;
        // Handle the 3 simple types, and null or undefined
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }

        // Handle Date
        if (obj instanceof Date) {
            copy = new Date();
            copy.setTime(obj.getTime());
            return copy;
        }

        // Handle Array
        if (obj instanceof Array) {
            copy = [];
            for (i = 0, l = obj.length; i < l; i++) {
                copy[i] = OBJECT.clone(obj[i]);
            }
            return copy;
        }

        // Handle Object
        if (obj instanceof Object) {
            copy = {};
            for (i in obj) {
                if (obj.hasOwnProperty(i)) {
                    copy[i] = OBJECT.clone(obj[i]);
                }
            }
            return copy;
        }
        throw new Error('Unable to copy obj! Its type isn\'t supported.');
    },

    extend: (o, ext, force) => {
        const obj = OBJECT.clone(o);

        for (let j in ext) {
            if (ext.hasOwnProperty(j) && (!(j in obj) || force)) {
                obj[j] = ext[j];
            }
        }
        return obj;
    },

    keyize: (objArr, k) => {
        let objRet = {},
            i = 0;
        const l = objArr.length;
        for (null; i < l; i++) {
            if (k in objArr[i] && !(objArr[i][k] in objRet)) {
                objRet[objArr[i][k]] = objArr[i];
            }
        }
        return objRet;
    },

    isString: o => typeof o === 'string' || o instanceof String,

    // avoid tags
    jCompare: (obj1, obj2) => !isNode(obj1) &&
            typeof JSON !== _U_ ?
            JSON.stringify(obj1) === JSON.stringify(obj2) :
            obj1 === obj2,

    /**
     * uses strMap private function to map an onject literal to a querystring ready for url
     * @param  {Literal} obj    the object literal
     * @return {String}         the mapped object
     */
    toQs: obj => strMap(
        obj,
        (o, i, r) => ([
            r ? '&' : '?',
            encodeURIComponent(i),
            '=',
            encodeURIComponent(o[i])
        ].join('')).replace(/'/g, '%27')
    )
};
export default OBJECT