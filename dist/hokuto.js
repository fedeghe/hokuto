var hokuto = (function () {

    var TYPES = {
            U: 'undefined',
            F: 'function'
        },
        _ = {},
        W = window,
        NS = {};

    /*
    [Malta] core.js
    */
    /* eslint-disable no-console */
    /**
     * Autoexecuted closure that allows to create namespaces,
     * the autocall is used to put the function itself in a namespace
     *
     */
    (function (Namespace) {
        // this is due, to test all implications see
        // http://www.jmvc.org/test_strict?ga=false
        // (the ga=false params inhibits google analytics tracking)
        'use strict';
    
        /**
         * Creates a namespace
         * @param  {String} str     dot or slash separated path for the namespace
         * @param  {Object literal} [{}]obj optional: the object to be inserted in the ns, or a function that returns the desired object
         * @param  {[type]} ctx     [window] the context object where the namespace will be created
         * @return {[type]}         the brand new ns
         *
         * @hint This method is DESTRUCTIVE if the obj param is passed,
         *       a conservative version is straight-forward
         * @sample
         *     makens('SM', {hello: ...});
         *     makens('SM', {hi: ...}); // now hello exists no more
         *
         *     //use
         *     makens('SM', {hello: ..., hi: })
         *     // or if in different files
         *     // file1
         *     makens('SM')
         *     SM.hello = ...
         *     //
         *     // file2
         *     makens('SM')
         *     SM.hi = ...
         *
         *     makens('SM/proto', function () {
         *
         *          // some private stuff
         *          //
         *
         *          return {
         *              foo0 : function () {...},
         *              foo1 : function () {...}
         *          }
         *     })
         *
         */
        function makens (str, obj, ctx) {
            str = str.replace(/^\//, '');
            var els = str.split(/\.|\//),
                l = els.length,
                ret;
    
            // default context window
            //
            (typeof ctx === TYPES.U) && (ctx = Namespace);
    
            // default object empty
            //
            (typeof obj === TYPES.U) && (obj = {});
    
            // if function
            //
            (typeof obj === TYPES.F) && (obj = obj());
    
            //
            if (!ctx[els[0]]) {
                ctx[els[0]] = (l === 1) ? obj : {};
            }
            ret = ctx[els[0]];
            return (l > 1) ? makens(els.slice(1).join('.'), obj, ctx[els[0]]) : ret;
        }
    
        function checkns (ns, ctx) {
            // remove stating slash
            ns = ns.replace(/^\//, '');
    
            // get all elements splitting by . or /
            var els = ns.split(/\.|\//),
                i = 0,
                l = els.length;
            ctx = (typeof ctx !== TYPES.U) ? ctx : _context_;
    
            if (!ns) {
                return ctx;
            }
    
            for (null; i < l; i += 1) {
                if (typeof ctx[els[i]] !== TYPES.U) {
                    ctx = ctx[els[i]];
                } else {
                    // break it
                    return undefined;
                }
            }
            return ctx;
        }
    
        function extendns (ns, objfn) {
            var i,
                obj = typeof objfn === TYPES.F ? objfn() : objfn;
            for (i in obj) {
                if (typeof ns[i] === TYPES.U) {
                    ns[i] = obj[i];
                }
            }
        }
    
        // use makens to publish itself and something more
        //
        Namespace.makeNs = makens;
        Namespace.checkNs = checkns;
        Namespace.extendNs= extendns;
    
    })(NS);
    
    NS.makeNs('LIB', {});

    /*
    [Malta] _balle.js
    */
    (function () {
        /*
        [Malta] ./../node_modules/balle/dist/index.js
        */
        'use strict';
        /*
        _____ _____ __    __    _____
        | __  |  _  |  |  |  |  |   __|
        | __ -|     |  |__|  |__|   __|
        |_____|__|__|_____|_____|_____|
                                        v. 1.0.45
        Author: federico.ghedina@gmail.com
        Size: ~2KB
        
        */
        function Balle(e){var l=this,t=!1;this.status=Balle.STATUSES.PENDING,this.value=null,this.cause=null,this.resolvers=this.resolvers||[],this.rejectors=this.rejectors||[],
        this.finalizers=this.finalizers||[],e=e||function(){};try{e(function(e){t||l.status!==Balle.STATUSES.PENDING||(t=!0,l.status=Balle.STATUSES.FULFILLED,l.value=e,Balle.roll(l.resolvers,"value",l),
        Balle.roll(l.finalizers,"value",l))},function(e){t||l.status!==Balle.STATUSES.PENDING||(t=!0,l.status=Balle.STATUSES.REJECTED,l.cause=e,Balle.roll(l.rejectors,"cause",l),
        Balle.roll(l.finalizers,"cause",l))})}catch(e){return Balle.reject(e.message)}return this}Balle.roll=function(e,l,t){e.forEach(function(e){e(t[l])},t)},Balle.prototype.resolve=function(e){
        return Balle.call(this,function(l,t){return l(e)})},Balle.prototype.reject=function(e){return Balle.call(this,function(l,t){return t(e)})},Balle.prototype.launch=function(e){return Balle.call(this,e)
        },Balle.prototype.then=function(e,l){switch(this.status){case Balle.STATUSES.REJECTED:Balle.roll(this.rejectors,"cause",this);break;case Balle.STATUSES.PENDING:this.resolvers.push(e),
        l&&this.rejectors.push(l);break;case Balle.STATUSES.FULFILLED:e(this.value)}return this},Balle.prototype.catch=function(e){switch(this.status){case Balle.STATUSES.PENDING:this.rejectors.push(e);break
        ;case Balle.STATUSES.REJECTED:return e.call(this,this.cause)}return this},Balle.prototype.finally=function(e){return this.finalizers.push(e),
        this.status!==Balle.STATUSES.PENDING&&Balle.roll(this.finalizers,"value",this),this},Balle.STATUSES={PENDING:"PENDING",FULFILLED:"FULFILLED",REJECTED:"REJECTED"},Balle._isFunc=function(e){
        return"function"==typeof e},Balle._isIterable=function(e){return null!=e&&Balle._isFunc(e[Symbol.iterator])},Balle.one=function(e){return new Balle(e)},Balle.all=function(e){
        if(!Balle._isIterable(e))return Balle.reject("Balle.all acceps an Iterable Promise only");var l=[],t=e.length,a=0;return new Balle(function(n,r){e.forEach(function(e,s){
        "REJECTED"==e.status&&r(e.cause),e.then(function(e){a++,l[s]=e,a==t&&n(l)}).catch(r)})})},Balle.race=function(e){return Balle._isIterable(e)?new Balle(function(l,t){e.forEach(function(e){
        e.then(l).catch(t)})}):Balle.reject("Balle.race acceps an Iterable Promise only")},Balle.chain=function(e){if(!Balle._isIterable(e))return Balle.reject("Balle.chain acceps an Iterable Promise only")
        ;var l=e.length;return new Balle(function(t,a){!function n(r,s){return r===l?t(s):e[r](s).then(function(e){n(++r,e)}).catch(function(e){a(e)})}(0)})},Balle.reject=function(e){
        return new Balle(function(l,t){return t(e)})},Balle.resolve=function(e){return new Balle(function(l,t){e instanceof Balle?e.then(l).catch(t):l(e)})},"object"==typeof exports&&(module.exports=Balle);
        NS.LIB.Balle = Balle;
    })();
    
    /*
    [Malta] history.js
    */
    (function () {
        'use strict';
        var H = W.history,
            handlers = [],
            spread = function (url, state, title) {
                handlers.forEach(function (handler) {
                    handler(url, state, title);
                });
            };
        NS.makeNs('LIB.history', {
            push: function (url, state, title) {
                H.pushState(state || {}, title || '', url);
                spread(url, state, title);
            },
            registerHandler: function (f) {
                handlers.push(f);
            },
            replace: function (url, state, title) {
                H.replaceState(state || {}, title || '', url);
                spread(url, state, title);
            },
            resetHandlers: function () {
                handlers = [];
            },
            state: function () {
                return H.state;
            }
        });
    })();
    
    /*
    [Malta] events.js
    */
    (function () {
    
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
        var on = (function () {
                function unhandle (el, evnt, cb) {
                    saveUnhandler(el, function () {
                        off(el, evnt, cb);
                    });
                }
                if ('addEventListener' in W) {
                    return function (el, evnt, cb, capture) {
                        capture = capture || false
                        el.addEventListener.apply(el, [evnt, cb, capture]);
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
    
            once = function (el, evnt, cb) {
                on(el, evnt, function _(e) {
                    cb.call(el, e)
                    off(el, evnt, _)
                })
            },
    
            eventTarget = function (e) {
                e = e || W.event;
                var targetElement = e.currentTarget || (typeof e.target !== TYPES.U) ? e.target : e.srcElement;
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
                    comp = 'complete',
                    i, l,
                    readyStateCheckInterval = setInterval(function () {
                        if (document.readyState === comp) {
                            clearInterval(readyStateCheckInterval);
                            for (i = 0, l = cb.length; i < l; i++) {
                                cb[i].call(this);
                            }
                        }
                    }, 10);
                return function (c) {
                    if (document.readyState === comp) {
                        c.call(this);
                    } else {
                        cb.push(c);
                    }
                };
            })();
        NS.makeNs('LIB.events', {
            on: on,
            off: off,
            kill: kill,
            once: once,
            eventTaget: eventTarget,
            ready: ready,
            unhandle: unhandle
        });
    })();
    
    /*
    [Malta] poly.js
    */
    if (typeof Object.assign !== TYPES.F) {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) {
                'use strict';
                if (target === null || target === undefined) {
                    throw new TypeError('Cannot convert undefined or null to object');
                }
    
                var to = Object(target);
    
                for (var i = 1, l = arguments.length; i < l; i++) {
                    var nextSource = arguments[i];
    
                    if (nextSource !== null && nextSource !== undefined) 
                        for (var nextKey in nextSource) 
                            if ({}.hasOwnProperty.call(nextSource, nextKey)) 
                                to[nextKey] = nextSource[nextKey];                
                }
                return to;
            },
            writable: true,
            configurable: true
        });
    }
    /*
    [Malta] dom.js
    */
    (function () {
        var noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
        
        function setStyle(node, styles) {
            var tmp;
            if (typeof styles === TYPES.U) throw new Error('ERR: styles needed')
            for (tmp in styles) {
                if (tmp === 'float') {
                    node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
                } else {
                    node.style[tmp] = styles[tmp];
                }
            }
            
        }
    
        function setAttrs(node, attrs) {
            if (typeof attrs === TYPES.U) throw new Error('ERR: attrs needed')
            for (var tmp in attrs) {
                if (noAttrs.indexOf(tmp) < 0)
                    node.setAttribute(tmp, attrs[tmp]);
            }
        }
        
        function unsetAttrs(node, attrs) {
            if (typeof attrs === TYPES.U) throw new Error('ERR: attrs needed')
            for (var tmp in attrs) {
                if (noAttrs.indexOf(tmp) < 0)
                    node.removeAttribute(tmp, attrs[tmp]);
            }
        }
    
        function setData(node, data) {
            if (typeof data === TYPES.U) throw new Error('ERR: data needed')
            for (var tmp in data) {
                node.dataset[tmp] = data[tmp];
            }
        }
    
        function unsetData(node, data) {
            if (typeof data === TYPES.U) throw new Error('ERR: data needed')
            for (var tmp in data) {
                delete node.dataset[tmp]
            }
        }
    
        function remove(el) {
            return el.parentNode && el.parentNode.removeChild(el);
        }
    
        function filterHtml(html) {return '' + html;}
    
        function setText(node, text) {node.appendChild(document.createTextNode(text));}
    
        function setHtml(node, html) {node.innerHTML = filterHtml(html);}
    
        NS.makeNs('LIB.dom', {
            remove: remove,
            setText: setText,
            setHtml: setHtml,
            setStyle: setStyle,
            setAttrs: setAttrs,
            unsetAttrs: unsetAttrs,
            setData: setData,
            unsetData: unsetData
        });
    })();
    
    
    
    
    /*
    [Malta] timer.js
    */
    (function () {
        'use strict';
        var time = 0;
        NS.makeNs('LIB.timer', {
            add: function (t) {
                time += t;
            },
            get: function () {
                var tmp = time + 0;
                time = 0;
                return tmp;
            }
        });
    })();
    
    console.log(NS);
    /*
    [Malta] Unode.js
    */
    function Unode(config) {
        this.config = config;
        this.map = this.config.map;
        this.parent = config.target;
        this.tag = config.tag || 'div'
        this.node = this.config.ns
            ? document.createElementNS(config.ns, this.tag)
            : document.createElement(this.tag);
        this.rendered = false;
        this.toSolve = 0;
        this.state = 'state' in config ? config.state : {};
        this.data = 'data' in config ? config.data : {};
        this.init = 'init' in config && config.init;
        this.rootNode = 'rootNode' in config ? config.rootNode : this;
        this.parentNode = 'parentNode' in config ? config.parentNode : this;
    
        this.paramsFromChildren = [];
    
        //from map
        this.root = this.map.rootNode;
        this.abort = this.map.abort;
        this.getNode = this.map.getNode;
        this.getNodes = this.map.getNodes;
        this.lateWid = this.map.lateWid;
        this.getElements = this.map.getElements;
        this.getElement = this.map.getElement;
    
        this.resolve = function () {};
        this.reset = function () {};
        this.setMethods(); //just once
        this.prepareState(); //just once
        this.initialize();
        this.checkInit();
        this.checkEnd();
    }
    
    Unode.prototype.prepareState = function () { 
        var statePassed = 'state' in this.config,
            state = statePassed ? this.config.state : {};
        this.state = typeof state === TYPES.F
            ? state()
            : state;
    }
    Unode.prototype.initialize = function () {
        this.rendered = false;
        this.setCall('Ref,Events,Text,Html,Style,Attrs,Data,Children,Cbs');
        // debugger
        typeof this.config[Unode.identifier] !== TYPES.U
        && typeof this.config.map.elements[this.config[Unode.identifier]] === TYPES.U
        && this.map.add(this.config[Unode.identifier], this);
    };
    
    Unode.prototype.setCall = function (fns) {
        var self = this;
        fns.split(/,/).forEach(function (f) {
            self['set' + f]()
        })
    };
    
    Unode.prototype.cleanup = function () {
        this.node.innerHTML = '';
        this.node.parentNode.removeChild(this.node);
    };
    
    Unode.prototype.setChildren = function () {
        var self = this,
            _children = [];
    
        if ('children' in this.config) {
            _children = (
                typeof this.config.children === TYPES.F
                ? this.config.children.call(this)
                : this.config.children
            ).map(function (child) {
                return new Unode(Object.assign({}, child, {
                    target: self.node,
                    rootNode: self.rootNode,
                    map: self.map,
                    parentNode: self
                }));
            });
        }
        this.toSolve = _children.length;
        this.children = _children;
    };
    
    Unode.prototype.setMethods = function () {
        var self = this,
            keys = Object.keys(this.config),
            tmp;
        keys.forEach(function (k) {
            tmp = k.match(/^method_(\w*)$/i);
            if (tmp) {
                if (!(tmp[1] in self)) {
                    self[tmp[1]] = self.config[tmp[0]].bind(self);
                } else {
                    console.warn('[WARNING] : method `' + tmp[0] + ' cant be added, would override existing element.' )
                }
            }
        });
    };
    
    Unode.prototype.setRef = function (ref, ctx) {
        // allow the node to set a ref on itself
        // or to another node it can reference
        if (ref) {
            (ctx || this).map[ref] = ctx || this
    
        // or incase is in the config, just set it
        } else if (typeof this.config.ref !== TYPES.U) {
            this.map[this.config.ref] = this
        }
    };
    
    Unode.prototype.setCbs = function () {
        this.cb = ('cb' in this.config && typeof this.config.cb === TYPES.F)
            ? this.config.cb.bind(this)
            : this.solve.bind(this);
    };
    
    Unode.prototype.setStyle = function (style) {
        if (style) {
            this.config.style = Object.assign({}, this.config.style, style)
        }
        this.config.style && NS.LIB.dom.setStyle(this.node, this.config.style);
    };
    
    Unode.prototype.setAttrs = function (attrs) {
        if (attrs) {
            this.config.attrs = Object.assign({}, this.config.attrs, attrs)
        }
        this.config.attrs && NS.LIB.dom.setAttrs(this.node, this.config.attrs);
    };
    
    Unode.prototype.setData = function (data) {
        if (data) {
            this.config.data = Object.assign({}, this.config.data, data)
        }
        if (this.config.data) {
            this.data = this.config.data;
            NS.LIB.dom.setData(this.node, this.data);
        }
    };
    
    Unode.prototype.setText = function (text) {
        if (typeof text !== TYPES.U) this.config.text = text;
        typeof this.config.text !== TYPES.U && NS.LIB.dom.setText(this.node, this.config.text);
    };
    
    Unode.prototype.setHtml = function (html) {
        if (typeof html !== TYPES.U) this.config.html = html;
        typeof this.config.html !== TYPES.U && NS.LIB.dom.setHtml(this.node, this.config.html);
    };
    
    Unode.prototype.killEvent = function (e) {
        NS.LIB.events.kill(e);
    };
    
    Unode.prototype.checkInit = function (e) {
        var keepRunning = true;
        if ('init' in this.config && typeof this.config.init === TYPES.F) {
            keepRunning = this.config.init.call(this);
            !keepRunning && this.abort();
        }
        return this;
    };
    
    Unode.prototype.checkEnd = function (e) {
        var self = this;
        'end' in this.config
            && typeof this.config.end === TYPES.F
            && this.map.endFunctions.push(function () {
                self.config.end.call(self);
            });
        return this;
    };
    
    Unode.prototype.unhandle = function (el) {
        NS.LIB.events.unhandle(el || this.node);
    };
    
    Unode.prototype.setEvents = function () {
        var i,
            self = this,
            mat, ev;
    
        for (i in self.config) {
            mat = i.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/);
            if (mat) {
                ev = mat[3].toLowerCase();
                (function (eventName) {
                    NS.LIB.events[mat[1]](self.node, ev, function (e) {
                        self.config[eventName].call(self, e);
                    });
                })(i);
            }
        }
        return this;
    };
    
    Unode.prototype.setState = function (o){
        for (var i in o) {
            if (o.hasOwnProperty(i)) {
                this.state[i] = o;
            }
        }
    };
    
    Unode.prototype.done =
    Unode.prototype.solve = function () {
        var args = [].slice.call(arguments, 0);
        if (args.length) {
            this.parentNode.paramsFromChildren.push(args);
        }
        this.parentNode.toSolve--;
        if (this.toSolve <= 0) {
            this.parent.appendChild(this.node)
            this.rendered = true;
            this.resolve(this);
        }
    };
    
    Unode.prototype.render = function () {
        var self = this,
            ret = new NS.LIB.Balle(function (resolve, reject) {
                self.resolve = resolve;
                self.reject = reject;
            });
            this.rendered = false
            if (this.toSolve > 0) {
                this.children.forEach(function (child, i) {
                    child.render().then(function () {
                        self.node.appendChild(child.node);
                        if (self.toSolve === 0) {
                            self.paramsFromChildren.length
                                ? self.cb(self.paramsFromChildren)
                                : self.cb()
                        }
                    });
                })
            } else {
                this.rendered = true;
                var res = this.cb(self.paramsFromChildren);
                res && this.rootNode.paramsFromChildren.push(res);
            }
        return ret;
    };
    
    Unode.isUnode = function(n) {return n instanceof Unode;}
    Unode.identifier = 'id';
    ;
    /*
    [Malta] engy.js
    */
    var Engy = {};
    Engy.solve = function(config) {
        return Balle.one(function (resolve, reject) {
            process(config).then(function (configResolved) {
                resolve(configResolved)
            })
        });
    }
    
    ;
    
    var __renders = {};

    function render(config, clear, name) {
        var target = config.target,
            originalHTML = target.innerHTML,
            fragment = document.createDocumentFragment(),
            active = true,
            map = {
                abort: function () {
                    active = false;
                    target.innerHTML = originalHTML;
                    'onAbort' in config
                        && (typeof config.onAbort === TYPES.F)
                        && config.onAbort.call(null, config);
                    return false;
                },
                add: function (id, inst) { map.elements[id] = inst; },
                getNode: function (id) { return map.elements[id] || false; },
                getNodes: function () { return map.elements; },
                lateWid: function (wid) { map.elements[wid] = this; },
                elements: {},
                endFunctions: [],
                getElement: getElement,
                getElements: getElements
            },
            rootNode = new Unode(
                Object.assign(
                    {},
                    config,
                    {
                        target: fragment,
                    }, {
                        map: map
                    }
                )
            );
        if (name && !(name in __renders)) {
            __renders[name] = rootNode;
        }
        if (clear === true) {
            target.innerHTML = '';
        }
        return rootNode.render().then(function () {
            if (!active) returnrootNode
            target.appendChild(fragment);
            while (map.endFunctions.length) map.endFunctions.pop()();
        });
    }

    function renderWithComponents(config) {
        console.log('init', config)
        // return Engy.solve(config).then(render)
    }
    
    function cleanup (trg, msg) {
        render({ target: trg, children: [{ html: msg || '' }] }, true);
    }

    function get (params) {
        var r = document.createElement('div'),
            unode;
        params.target = r;
        unode = render(params);
        return [r, unode.value];
    }

    function preload (src) {
        var s = document.createElement('script');
        document.getElementsByTagName('head')[0].appendChild(s);

        // when finished remove the script tag
        s.onload = function () {
            s.parentNode.removeChild(s);
        };
        s.src = src;
    }

    function getElement (n) {
        return n in __renders ? __renders[n] : false;
    }

    function getElements () {
        return __renders;
    }

    

    return {
        render: render,
        renderWithComponents: renderWithComponents ,
        cleanup: cleanup,
        get: get,
        preload: preload,
        getElement: getElement,
        getElements: getElements,
    };
})();