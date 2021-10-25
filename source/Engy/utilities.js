import { checkns } from '../core'

export const _clone = obj => {
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }
    const copy = obj.constructor();
    let attr;
    for (attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = _clone(obj[attr]);
    }
    return copy;
}

export const _overwrite = (destObj, path, obj) => {
    // path can be
    // str1
    // str1/str2[/str3[...]] (or str1.str2[.str3])
    //
    // in any case we need the elements of it
    //
    const pathEls = path.split(/\.|\//),
        l = pathEls.length;
    let i = 0;

    // in case path has more than one element in the split result
    // like
    // aaa/bbb/ccc/ddd
    // dig destObj to destObj.aaa.bbb.ccc
    //
    while (i < l - 1) destObj = destObj[pathEls[i++]];

    // now the object is inserted
    //
    destObj[pathEls[l - 1]] = obj;
}

export const _mergeComponent = (ns, path, o) => {
    const componentPH = checkns(path, ns),
        replacementOBJ = o,
        merged = {};
    let i = 0;

    // start from the replacement
    //
    for (i in replacementOBJ) {
        merged[i] = replacementOBJ[i];
    }
    // copy everything but 'component' & 'params', overriding
    //
    for (i in componentPH) {
        !(i.match(/component|params/)) && (merged[i] = componentPH[i]);
    }
    _overwrite(ns, path, merged);
}

export default {
    _clone,
    _overwrite,
    _mergeComponent
}