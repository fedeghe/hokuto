Hok.object = (function(){

    var strMap = function(o, fn) {
            var ret = '',
                j;
            for (j in o) 
                if (o.hasOwnProperty(j)) 
                    ret += fn(o, j, ret);
            return ret;
        },
            

        // Returns true if it is a DOM node
        isNode = function(o) {
            return  typeof Node === 'object'
                ? o instanceof Hok.W.Node
                : o
                    && typeof o === 'object'
                    && typeof o.nodeType === 'number'
                    && typeof o.nodeName === 'string';
        },

        extract = function(data, where){                
            var g = where || (
                    typeof global !== 'undefined'
                        ? global
                        : (typeof window !== 'undefined' ? window : this)
                ), key;
            for (key in data) {
                if (data.hasOwnProperty(key)) {
                    g[key] = data[key];
                }
            }
        },
        ret = {
            extract: extract,
            fromQs: function() {
                var els = document.location.search.substr(1).split('&'),
                    len = els.length,
                    i = 0,
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

            clone: function(obj){
                var copy,
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
                        copy[i] = ret.clone(obj[i]);
                    }
                    return copy;
                }

                // Handle Object
                if (obj instanceof Object) {
                    copy = {};
                    for (i in obj) {
                        if (obj.hasOwnProperty(i)) {
                            copy[i] = ret.clone(obj[i]);
                        }
                    }
                    return copy;
                }
                throw new Error('Unable to copy obj! Its type isn\'t supported.');
            },

            extend: function(o, ext, force) {
                var obj = ret.clone(o),
                    j;

                for (j in ext) {
                    if (ext.hasOwnProperty(j) && (!(j in obj) || force)) {
                        obj[j] = ext[j];
                    }
                }
                return obj;
            },

            keyize: function(objArr, k) {
                var objRet = {},
                    i = 0,
                    l = objArr.length;
                for (null; i < l; i++) {
                    if (k in objArr[i] && !(objArr[i][k] in objRet)) {
                        objRet[objArr[i][k]] = objArr[i];
                    }
                }
                return objRet;
            },

            isString: function(o) {
                return typeof o === 'string' || o instanceof String;
            },

            // avoid tags
            jCompare: function(obj1, obj2) {
                return !isNode(obj1) && typeof JSON !== Hok._U_
                    ? JSON.stringify(obj1) === JSON.stringify(obj2)
                    : obj1 === obj2;
            },

            toQs: function(obj) {
                return strMap(
                    obj,
                    function (o, i, r) {
                        return ([
                            r ? '&' : '?',
                            encodeURIComponent(i),
                            '=',
                            encodeURIComponent(o[i])
                        ].join('')).replace(/'/g, '%27');
                    }
                    

                );
            }
        };

    return ret;
})();