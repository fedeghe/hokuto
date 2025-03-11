(function(ctx){
    var data = {},
        RX_LANG = /i18n\(([^}|]*)?\|?([^}]*)\)/;
    ctx.lang = Hok.CONFIG.LANG;
    ctx.switchLang = function(lang){
        Hok.i18n.lang = lang;
    };
    ctx.check = function(lab){ return lab.match(RX_LANG);};
    ctx.dynamicLoad = function(lo, _label) {
        var lang = Hok.i18n.lang;
        for (_label in lo) {
            lang in lo[_label] && (data[_label] = lo[_label][lang]);
        }
    };
    ctx.get = function(k, fallback) {return  Hok.ns.check(k, data) || fallback || k+'<sup>&#2417;</sup>';};
    ctx.load = function(dict) { data = dict;};
    ctx.parse = function(obj){
        var replacing = Hok.searchHash.forValue(obj, RX_LANG),
            l = replacing.length,
            mayP, ref, i = 0, r;
        for (null; i < l; i++) {
            r = replacing[i];
            if ((typeof r.regexp).match(/boolean/i)) continue;
            mayP = Hok.i18n.check(r.regexp[0]);
            if (mayP) {
                ref = Hok.ns.check(r.container, obj);
                ref[r.key] = r.value.replace(mayP[0], Hok.i18n.get(mayP[1], mayP[2]));
            }
        }
    };
})(Hok.i18n);
