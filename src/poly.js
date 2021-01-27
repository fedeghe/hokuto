if (typeof Object.assign !== TYPES.F) {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            'use strict';
            if (target === null || target === undefined) {
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var i = 1, l = arguments.length; i < l; i++) {
                var nextSource = arguments[i];

                if (nextSource !== null && nextSource !== undefined) 
                    for (var nextKey in nextSource) 
                        if ({}.hasOwnProperty.call(nextSource, nextKey)) 
                            to[nextKey] = nextSource[nextKey];                
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}