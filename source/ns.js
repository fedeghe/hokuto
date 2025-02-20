/*
Hok.ns.make = function(str, obj, ctx) {
    str = str.replace(/^\//, '');
    var els = str.split(/\.|\//),
        l = els.length,
        ret;

    // default context window
    (typeof ctx === Hok._U_) && (ctx = Hok.W);

    // default object empty
    (typeof obj === Hok._U_) && (obj = {});

    // if function
    (typeof obj === 'function') && (obj = obj());

    if (!ctx[els[0]]) {
        ctx[els[0]] = (l === 1) ? obj : {};
    }
    ret = ctx[els[0]];
    return (l > 1) ? Hok.ns.make(els.slice(1).join('.'), obj, ctx[els[0]]) : ret;
};
*/
Hok.ns.check = function (ns, ctx) {
    // remove stating slash
    ns = ns.replace(/^\//, '');

    // get all elements splitting by . or /
    var els = ns.split(/\.|\//),
        l = els.length,
        i = 0;
    ctx = (typeof ctx !== Hok._U_) ? ctx : Hok.W;

    if (!ns) {
        return ctx;
    }

    for (null; i < l; i += 1) {
        if (typeof ctx[els[i]] !== Hok._U_) {
            ctx = ctx[els[i]];
        } else {
            // break it
            return undefined;
        }
    }
    return ctx;
};
/*
Hok.ns.extend = function (ns, objfn) {
    var obj = typeof objfn === 'function' ? objfn() : objfn,
        i;

    for (i in obj) {
        if (typeof ns[i] === _U_) {
            ns[i] = obj[i];
        }
    }
};

*/