import { W } from './core'

const _ = {
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
    unhandlers: {}
};

function saveUnhandler(el, f) {
    _.unhandlers[el] = _.unhandlers[el] || [];
    _.unhandlers[el].push(f);
}

function unhandle(el) {
    _.unhandlers[el] && _.unhandlers[el].forEach(function(unhandler) {
        unhandler();
    });
    _.unhandlers = [];
}
const on = (function() {
        function unhandle(el, evnt, cb) {
            saveUnhandler(el, function() {
                off(el, evnt, cb);
            });
        }
        if ('addEventListener' in W) {
            return function(el, evnt, cb, capture) {
                capture = capture || false
                el.addEventListener.apply(el, [evnt, cb, capture]);
                unhandle(el, evnt, cb);
            };
        } else if ('attachEvent' in W) {
            return function(el, evnt, cb) {
                el.attachEvent.apply(el, ['on' + evnt, cb]);
                unhandle(el, evnt, cb);
            };
        } else {
            return function() {
                throw new Error('No straight way to bind an event');
            };
        }
    })(),

    off = (function() {
        if ('removeEventListener' in W) {
            return function(el, evnt, cb) {
                el.removeEventListener(evnt, cb);
            };
        } else if ('detachEvent' in W) {
            return function(el, evnt, cb) {
                el.detachEvent.apply(el, ['on' + evnt, cb]);
            };
        } else {
            return function() {
                throw new Error('No straight way to unbind an event');
            };
        }
    })(),

    kill = function(e) {
        if (!e) {
            e = W.event;
            e.cancelBubble = true;
            e.returnValue = false;
        }
        'stopPropagation' in e && e.stopPropagation();
        e.preventDefault();
        return false;
    },

    once = function(el, evnt, cb) {
        on(el, evnt, function _(e) {
            cb.call(el, e)
            off(el, evnt, _)
        })
    },

    eventTarget = function(e) {
        e = e || W.event;
        let targetElement = e.currentTarget || (typeof e.target !== TYPES.U) ? e.target : e.srcElement;
        if (!targetElement) {
            return false;
        }
        while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
            targetElement = targetElement.parentNode;
        }
        return targetElement;
    },

    ready = (function() {
        const comp = 'complete',
        readyStateCheckInterval = setInterval(function() {
            if (document.readyState === comp) {
                clearInterval(readyStateCheckInterval);
                for (i = 0, l = cb.length; i < l; i++) {
                    cb[i].call(this);
                }
            }
        }, 10);
        let cb = [],
            i, l;
            
        return function(c) {
            if (document.readyState === comp) {
                c.call(this);
            } else {
                cb.push(c);
            }
        };
    })();
export default {
    on,
    off,
    kill,
    once,
    eventTarget,
    ready,
    unhandle
};