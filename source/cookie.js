import {
    W,
    WD
} from './core'


function initCheck() {
    return W.navigator.cookieEnabled;
}

function set(name, value, expires, copath, domain, secure) {
    if (!COOKIE.enabled) return false;
    this.cookie_nocookiesaround = false;
    const today = new Date(),
        expiresDate = new Date(today.getTime() + expires);
    // expires && (expires = expires * 1000 * 60 * 60 * 24);
    WD.cookie = [
        name, '=', W.escape(value),
        (expires ? ';expires=' + expiresDate.toGMTString() : ''),
        (copath ? ';path=' + copath : ''),
        (domain ? ';domain=' + domain : ''),
        (secure ? ';secure' : '')
    ].join();
    return true;
}

function del(name, path, domain) {
    if (!COOKIE.enabled) return false;
    let ret = false;

    if (this.get(name)) {
        WD.cookie = [
            name, '=',
            (path ? ';path=' + path : ''),
            (domain ? ';domain=' + domain : ''),
            ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
        ].join('');
        ret = true;
    }
    return ret;
}

function get(checkName) {
    const allCookies = WD.cookie.split(';'),
        l = allCookies.length;
    let tempCookie = '',
        cookieName = '',
        cookieValue = '',
        cookieFound = false,
        i = 0;

    if (!NS.LIB.cookie.enabled) return false;

    for (null; i < l; i += 1) {
        tempCookie = allCookies[i].split('=');
        cookieName = tempCookie[0].replace(/^\s+|\s+$/g, '');

        if (cookieName === checkName) {
            cookieFound = true;
            tempCookie.length > 1 && (cookieValue = W.unescape(tempCookie[1].replace(/^\s+|\s+$/g, '')));
            return cookieValue;
        }

        tempCookie = null;
        cookieName = '';
    }
    return cookieFound;
}

function delall() {
    if (!COOKIE.enabled) return false;
    const thecookie = WD.cookie.split(/;/),
        l = thecookie.length;
    let i = 0,
        name;
    for (null; i < l; i += 1) {
        name = thecookie[i].split(/=/);
        this.del(name[0], false, false);
    }
    this.cookie_nocookiesaround = true;
    return true;
}

function getall() {
    if (!COOKIE.enabled) return false;
    if (WD.cookie === '') {
        return [];
    }
    return this.cookie_nocookiesaround ? [] :
        WD.cookie.split(';').forEach(
            i => {
                const t = i.split('=');
                return { name: t[0], value: t[1] };
            }
        );
}

export const COOKIE = {
    enabled: true,
    cookie_nocookiesaround: false,
    initCheck: initCheck,
    set: set,
    get: get,
    del: del,
    delall: delall,
    getall: getall
};

export default COOKIE;