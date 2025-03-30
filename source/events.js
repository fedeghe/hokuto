(function(ctx) {
    ctx._ = {
        unhandlers: {},
        bindErr: function(v) {return 'No straight way to '+(v ? '' : 'un')+'}bind an event';}
    };
    
    ctx.saveUnhandler = function(el, f) {
        ctx._.unhandlers[el] = ctx._.unhandlers[el] || [];
        ctx._.unhandlers[el].push(f);
    };
    
    ctx.unhandle = function(el) {
        ctx._.unhandlers[el] && ctx._.unhandlers[el].forEach(function(unhandler) {
            unhandler();
        });
        ctx._.unhandlers = [];
    };
    
    function unhandle(el, evnt, cb) {
        ctx.saveUnhandler(el, function() {
            ctx.off(el, evnt, cb);
        });
    }
    ctx.on = function(el, evnt, cb, capture) {
        capture = capture || false;
        el.addEventListener.apply(el, [evnt, cb, capture]);
        unhandle(el, evnt, cb);
    };
    
    ctx.off = function(el, evnt, cb) {
        el.removeEventListener(evnt, cb);
    };
    
    ctx.kill = function(e) {
        if (!e) {
            e = Hok.W.event;
            e.cancelBubble = true;
            e.returnValue = false;
        }
        'stopPropagation' in e && e.stopPropagation();
        e.preventDefault();
        return false;
    };
    
    ctx.once = function(el, evnt, cb) {
        ctx.on(el, evnt, function _(e) {
            cb.call(el, e);
            ctx.off(el, evnt, _);
        });
    };
    
    ctx.eventTarget = function(e) {
        e = e || Hok.W.event;
        var targetElement =
            e.currentTarget
            || (typeof e.target !== Hok.TYPES.U) ? e.target : e.srcElement;
        if (!targetElement) {
            return false;
        }
        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
            targetElement = targetElement.parentNode;
        }
        return targetElement;
    };
    
    ctx.noEvents = function (el, fn, t) {
        t = t || 3000;
        fn = fn || function(){};
        var to;
        function inner (e) {
            to && window.clearTimeout(to);
            to = window.setTimeout(function () {
                fn(e);
            }, t);
        }
        ctx.on(el, 'mousemove', inner);
        ctx.on(el, 'click', inner);
        ctx.on(el, 'touchstart', inner);
    };
    
    ctx.ready = (function() {
        var comp = 'complete',
            readyStateCheckInterval = setInterval(function() {
                if (document.readyState === comp) {
                    clearInterval(readyStateCheckInterval);
                    for (i = 0, l = cb.length; i < l; i++) {
                        cb[i].call(this);
                    }
                }
            }, 100),
            cb = [],
            i, l;
            
        return function(c) {
            if (document.readyState === comp) {
                c.call(this);
            } else {
                cb.push(c);
            }
        };
    })();
})(Hok.events);


