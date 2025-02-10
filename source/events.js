Hok.events._ = {
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
    bindErr: function(v) {return 'No straight way to '+(v ? '' : 'un')+'}bind an event'}
};

Hok.events.saveUnhandler = function(el, f) {
    Hok.events._.unhandlers[el] = Hok.events._.unhandlers[el] || [];
    Hok.events._.unhandlers[el].push(f);
};

Hok.events.unhandle = function(el) {
    Hok.events._.unhandlers[el] && Hok.events._.unhandlers[el].forEach(function(unhandler) {
        unhandler();
    });
    Hok.events._.unhandlers = [];
};

Hok.events.on = (function() {
    function unhandle(el, evnt, cb) {
        Hok.events.saveUnhandler(el, function() {
            Hok.events.off(el, evnt, cb);
        });
    }
    if ('addEventListener' in Hok.W) {
        return function(el, evnt, cb, capture) {
            capture = capture || false
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
            throw new Error(Hok.events._.bindErr(1));
        };
    }
})();

Hok.events.off = (function() {
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
            throw new Error(Hok.events._.bindErr(0));
        };
    }
})();

Hok.events.kill = function(e) {
    if (!e) {
        e = Hok.W.event;
        e.cancelBubble = true;
        e.returnValue = false;
    }
    'stopPropagation' in e && e.stopPropagation();
    e.preventDefault();
    return false;
};

Hok.events.once = function(el, evnt, cb) {
    Hok.events.on(el, evnt, function _(e) {
        cb.call(el, e)
        Hok.events.off(el, evnt, _)
    });
};

Hok.events.eventTarget = function(e) {
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

Hok.events.ready = (function() {
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
