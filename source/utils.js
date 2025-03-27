(function(ctx){
    ctx.type = {};
    
    ctx.type.isFunction = function (ƒ){
        return typeof ƒ === Hok.TYPES.F;
    };

    ctx.type.isDefined = function (ƒ){
        return typeof ƒ !== Hok.TYPES.U;
    };

    ctx.type.isObject = function(o) {
        var t0 = String(o) !== o,
            t1 = o === Object(o),
            t2 = ctx.type.isFunction(o),
            t3 = {}.toString.call(o).match(/\[object\sObject\]/);
        return t0 && t1 && !t2 && !!(t3 && t3.length);
    };

    ctx.type.isArray = function(o) {
        if (Array.isArray && Array.isArray(o)) {
            return true;
        }
        var t1 = String(o) !== o,
            t2 = ({}).toString.call(o).match(/\[object\sArray\]/);
        
        return t1 && !!(t2 && t2.length);
    };
})(Hok.utils);