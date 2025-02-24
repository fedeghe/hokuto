(function(ctx) {
    ctx._ = {
        events: {
            getElementDeterminant: function(el) {
                const tname = el.tagName;
                return (tname.match(/input|textarea|select/i)) ? 'value' : 'innerHTML';
            },
            getElementEvent: function(el) {
                const tname = el.tagName;
                return (tname.match(/input|textarea/i)) ? 'input' : 'change';
            }
        },
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
    
    ctx.on = (function() {
        function unhandle(el, evnt, cb) {
            ctx.saveUnhandler(el, function() {
                ctx.off(el, evnt, cb);
            });
        }
        if ('addEventListener' in Hok.W) {
            return function(el, evnt, cb, capture) {
                capture = capture || false;
                el.addEventListener.apply(el, [evnt, cb, capture]);
                unhandle(el, evnt, cb);
            };
        } else if ('attachEvent' in Hok.W) {
            return function(el, evnt, cb) {
                el.attachEvent.apply(el, ['on' + evnt, cb]);
                unhandle(el, evnt, cb);
            };
        } else {
            return function() {
                throw new Error(ctx._.bindErr(1));
            };
        }
    })();
    
    ctx.off = (function() {
        if ('removeEventListener' in Hok.W) {
            return function(el, evnt, cb) {
                el.removeEventListener(evnt, cb);
            };
        } else if ('detachEvent' in Hok.W) {
            return function(el, evnt, cb) {
                el.detachEvent.apply(el, ['on' + evnt, cb]);
            };
        } else {
            return function() {
                throw new Error(ctx._.bindErr(0));
            };
        }
    })();
    
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
            }, 10),
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


