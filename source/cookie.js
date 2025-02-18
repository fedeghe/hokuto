
Hok.cookie = {
    enabled: true,
    cookie_nocookiesaround: false,
    initCheck: function() {
        return Hok.W.navigator.cookieEnabled;
    },
    set: function(name, value, expires, copath, domain, secure) {
        if (!Hok.cookie.enabled) return false;
        Hok.cookie.cookie_nocookiesaround = false;
        var today = new Date(),
            expiresDate = new Date(today.getTime() + expires);
        // expires && (expires = expires * 1000 * 60 * 60 * 24);
        Hok.WD.cookie = [
            name, '=', Hok.W.escape(value),
            (expires ? ';expires=' + expiresDate.toGMTString() : ''),
            (copath ? ';path=' + copath : ''),
            (domain ? ';domain=' + domain : ''),
            (secure ? ';secure' : '')
        ].join();
        return true;
    },
    del: function(name, path, domain) {
        if (!Hok.cookie.enabled) return false;
        var ret = false;

        if (Hok.cookie.get(name)) {
            Hok.WD.cookie = [
                name, '=',
                (path ? ';path=' + path : ''),
                (domain ? ';domain=' + domain : ''),
                ';expires=Thu, 01-Jan-1970 00:00:01 GMT'
            ].join('');
            ret = true;
        }
        return ret;
    },
    get: function(checkName) {
        var allCookies = Hok.WD.cookie.split(';'),
            l = allCookies.length,
            tempCookie = '',
            cookieName = '',
            cookieValue = '',
            cookieFound = false,
            i = 0;

        if (!Hok.cookie.enabled) return false;

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
    },
    delall: function() {
        if (!Hok.cookie.enabled) return false;
        var thecookie = Hok.WD.cookie.split(/;/),
            l = thecookie.length,
            i = 0,
            name;
        for (null; i < l; i += 1) {
            name = thecookie[i].split(/=/);
            Hok.cookie.del(name[0], false, false);
        }
        Hok.cookie.cookie_nocookiesaround = true;
        return true;
    },
    getall: function() {
        if (!Hok.cookie.enabled) return false;
        if (Hok.WD.cookie === '') return [];
        return Hok.cookie.cookie_nocookiesaround
            ? []
            : Hok.WD.cookie.split(';').forEach(
                function(i) {
                    var t = i.split('=');
                    return { name: t[0], value: t[1] };
                }
            );
    }
};