Hok.i18n = (function(){
    var data = {},
        RX_LANG = /i18n\(([^}|]*)?\|?([^}]*)\)/;
    return {
            lang: Hok.CONFIG.LANG,
            switchLang: function(lang){
                Hok.i18n.lang = lang;
            },
            check: function(lab){ return lab.match(RX_LANG)},
            dynamicLoad: function(lo, _label) {
                var lang = Hok.i18n.lang
                for (_label in lo) {
                    lang in lo[_label] && (data[_label] = lo[_label][lang]);
                }
            },
            get: function(k, fallback) {return  Hok.ns.check(k, data) || fallback || 'no Value'},
            load: function(dict) { data = dict;},
            parse: function(obj){
                var replacing = searchHash.forValue(obj, RX_LANG),
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
            }
        };
})();
