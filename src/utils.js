

var utils = (function (W) {
    var _U_ = 'undefined',
        noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    
    function setStyle(node, styles) {
        var tmp;
        if (typeof styles !== _U_) {
            for (tmp in styles) {
                if (tmp === 'float') {
                    node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
                } else {
                    node.style[tmp] = styles[tmp];
                }
            }
        }
    }

    function setAttrs(node, attrs) {
        if (typeof attrs !== _U_) {
            for (var tmp in attrs) {
                if (noAttrs.indexOf(tmp) < 0)
                    node.setAttribute(tmp, attrs[tmp]);
            }
        }
    }
    function setData(node, data) {
        if (typeof data !== _U_) {
            for (var tmp in data) {
                node.dataset[tmp] = data[tmp];
            }
        }
    }
    function filterHtml(html) {return '' + html;}
    function setText(node, text) {node.appendChild(document.createTextNode(text));}
    function setHtml(node, html) {node.innerHTML = filterHtml(html);}
    function isUnode(n) {return n instanceof Unode;}




    
        var _ = {
            events: {
                getElementDeterminant: function (el) {
                    var tname = el.tagName;
                    return (tname.match(/input|textarea|select/i)) ? 'value' : 'innerHTML';
                },
                getElementEvent: function (el) {
                    var tname = el.tagName;
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
            _.unhandlers[el] && _.unhandlers[el].forEach(function (unhandler) {
                unhandler();
            });
            _.unhandlers = [];
        }
        var on= (function () {
                function unhandle (el, evnt, cb) {
                    saveUnhandler(el, function () {
                        off(el, evnt, cb);
                    });
                }
                if ('addEventListener' in W) {
                    return function (el, evnt, cb) {
                        el.addEventListener.apply(el, [evnt, cb, false]);
                        unhandle(el, evnt, cb);
                    };
                } else if ('attachEvent' in W) {
                    return function (el, evnt, cb) {
                        el.attachEvent.apply(el, ['on' + evnt, cb]);
                        unhandle(el, evnt, cb);
                    };
                } else {
                    return function () {
                        throw new Error('No straight way to bind an event');
                    };
                }
            })(),
            off = (function () {
                if ('removeEventListener' in W) {
                    return function (el, evnt, cb) {
                        el.removeEventListener(evnt, cb);
                    };
                } else if ('detachEvent' in W) {
                    return function (el, evnt, cb) {
                        el.detachEvent.apply(el, ['on' + evnt, cb]);
                    };
                } else {
                    return function () {
                        throw new Error('No straight way to unbind an event');
                    };
                }
            })(),
    
            kill = function (e) {
                if (!e) {
                    e = W.event;
                    e.cancelBubble = true;
                    e.returnValue = false;
                }
                'stopPropagation' in e && e.stopPropagation();
                e.preventDefault();
                return false;
            },
    
            eventTarget = function (e) {
                e = e || W.event;
                var targetElement = e.currentTarget || (typeof e.target !== _U_) ? e.target : e.srcElement;
                if (!targetElement) {
                    return false;
                }
                while (targetElement.nodeType === 3 && targetElement.parentNode !== null) {
                    targetElement = targetElement.parentNode;
                }
                return targetElement;
            },
    
            ready = (function () {
                var cb = [],
                    i,
                    l,
                    readyStateCheckInterval = setInterval(function () {
                        if (document.readyState === 'complete') {
                            clearInterval(readyStateCheckInterval);
                            for (i = 0, l = cb.length; i < l; i++) {
                                cb[i].call(this);
                            }
                        }
                    }, 10);
                return function (c) {
                    if (document.readyState === 'complete') {
                        c.call(this);
                    } else {
                        cb.push(c);
                    }
                };
            })();

    return {
        on: on,
        off: off,
        kill: kill,
        eventTaget: eventTarget,
        ready: ready,
        isUnode: isUnode,
        setText: setText,
        setHtml: setHtml,
        setStyle: setStyle,
        setAttrs: setAttrs,
        setData: setData
    };
})(window);
