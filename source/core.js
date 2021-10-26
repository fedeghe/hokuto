export const _ = {},
    W = window,
    _U_ = 'undefined',
    WD = W.document,
    H = W.history;
export const TYPES = {
    U: _U_,
    F: 'function'
};

export const makens = (str, obj, ctx) => {
    str = str.replace(/^\//, '');
    const els = str.split(/\.|\//),
        l = els.length;
    let ret;

    // default context window
    (typeof ctx === _U_) && (ctx = W);

    // default object empty
    (typeof obj === _U_) && (obj = {});

    // if function
    (typeof obj === 'function') && (obj = obj());

    if (!ctx[els[0]]) {
        ctx[els[0]] = (l === 1) ? obj : {};
    }
    ret = ctx[els[0]];
    return (l > 1) ? makens(els.slice(1).join('.'), obj, ctx[els[0]]) : ret;
}

export const checkns = (ns, ctx) => {
    // remove stating slash
    ns = ns.replace(/^\//, '');

    // get all elements splitting by . or /
    const els = ns.split(/\.|\//),
        l = els.length;
    let i = 0;
    ctx = (typeof ctx !== _U_) ? ctx : W;

    if (!ns) {
        return ctx;
    }

    for (null; i < l; i += 1) {
        if (typeof ctx[els[i]] !== _U_) {
            ctx = ctx[els[i]];
        } else {
            // break it
            return undefined;
        }
    }
    return ctx;
}

export const extendns = (ns, objfn) => {
    const obj = typeof objfn === 'function'
        ? objfn()
        : objfn;

    for (let i in obj) {
        if (typeof ns[i] === _U_) {
            ns[i] = obj[i];
        }
    }
}

export const noop = function () {};

export default {
    makens,
    checkns,
    extendns,
    TYPES,
    W,
    WD,
    H,
    _U_,
    noop,
}