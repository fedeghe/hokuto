var hokuto = (function () {
    // only IE
    /*
    [Malta] ./../node_modules/balle/source/index.js
    */
    Balle.roll = function (els, name, inst) {
        els.forEach(function (func) {
            func(inst[name]);
        }, inst);
    };
    
    function Balle(executor) {
        var self = this,
            done = false;
        this.status = Balle.STATUSES.PENDING;
        this.value = null;
        this.cause = null;
        this.resolvers = this.resolvers || [];
        this.rejectors = this.rejectors || [];
        this.finalizers = this.finalizers || [];
        executor = executor || function () {};
    
        try {
            executor(
                // SOLVER
                function (value) {
                    if (done || self.status !== Balle.STATUSES.PENDING) return;
                    done = true;
                    self.status = Balle.STATUSES.FULFILLED;
                    self.value = value;
                    Balle.roll(self.resolvers, 'value', self);
                    Balle.roll(self.finalizers, 'value', self);
                },
                // REJECTOR
                function (cause) {
                    if (done || self.status !== Balle.STATUSES.PENDING) return;
                    done = true;
                    self.status = Balle.STATUSES.REJECTED;
                    self.cause = cause;
                    Balle.roll(self.rejectors, 'cause', self);
                    Balle.roll(self.finalizers, 'cause', self);
                }
            );
        } catch (e) {
            return Balle.reject(e.message);
        }
        return this;
    }
    
    Balle.prototype.resolve = function (value) {
        return Balle.call(this, function (res, rej) {
            return res(value);
        });
    };
    
    Balle.prototype.reject = function (value) {
        return Balle.call(this, function (res, rej) {
            return rej(value);
        });
    };
    
    Balle.prototype.launch = function (executor) {
        return Balle.call(this, executor);
    };
    
    Balle.prototype.then = function (res, rej) {
        switch (this.status) {
            case Balle.STATUSES.REJECTED:
                Balle.roll(this.rejectors, 'cause', this);
                break;
            case Balle.STATUSES.PENDING:
                this.resolvers.push(res);
                rej && this.rejectors.push(rej);
                break;
            case Balle.STATUSES.FULFILLED:
                res(this.value);
                break;
            default: break;
        }
        return this;
    };
    
    Balle.prototype.catch = function (rej) {
        switch (this.status) {
            case Balle.STATUSES.PENDING:
                this.rejectors.push(rej);
                break;
            case Balle.STATUSES.REJECTED:
                return rej.call(this, this.cause);
            default: break;
        }
        return this;
    };
    
    Balle.prototype.finally = function (cb) {
        this.finalizers.push(cb);
        this.status !== Balle.STATUSES.PENDING
        && Balle.roll(this.finalizers, 'value', this);
        return this;
    };
    
    /**
     * STATIC section
     */
    Balle.STATUSES = {
        PENDING: 'PENDING',
        FULFILLED: 'FULFILLED',
        REJECTED: 'REJECTED'
    };
    
    Balle._isFunc = function (f) { return typeof f === 'function'; };
    
    Balle._isIterable = function (obj) {
        if (obj == null) { return false; }
        return Balle._isFunc(obj[Symbol.iterator]);
    };
    
    // factory
    Balle.one = function (exec) { return new Balle(exec); };
    
    Balle.all = function (pros) {
        if (!Balle._isIterable(pros)) {
            return Balle.reject('Balle.all acceps an Iterable Promise only');
        }
        var results = [],
            l = pros.length,
            solN = 0;
    
        return new Balle(function (resolve, reject) {
            pros.forEach(function (pro, i) {
                pro.status == 'REJECTED'
                    && reject(pro.cause);
                pro.then(function (v) {
                    solN++;
                    results[i] = v;
                    solN == l && resolve(results)
                }).catch(reject)
            });
        });
    };
    
    Balle.race = function (pros) {
        if (!Balle._isIterable(pros)) {
            return Balle.reject('Balle.race acceps an Iterable Promise only');
        }
        return new Balle(function (resolve, reject) {
            pros.forEach(function (pro) { pro.then(resolve).catch(reject) });
        });
    };
    
    Balle.chain = function (pros) {
        if (!Balle._isIterable(pros)) {
            return Balle.reject('Balle.chain acceps an Iterable Promise only');
        }
        var l = pros.length;
        return new Balle(function (res, rej) {
            (function chain(index, r) {
                return index === l
                    ? res(r)
                    : pros[index](r)
                        .then(function (r) {
                            chain(++index, r);
                        }).catch(function (r) {
                            rej(r);
                        });
            })(0);
        });
    };
    
    Balle.reject = function (cause) {
        return new Balle(function (s, r) { return r(cause); });
    };
    
    Balle.resolve = function (mix) {
        return new Balle(function (res, rej) {
            mix instanceof Balle
                ? mix.then(res).catch(rej)
                : res(mix);
        });
    };
    
    (typeof exports === 'object') && (module.exports = Balle);
    ;

    /*
    [Malta] utils.js
    */
    
    
    var utils = (function () {
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
        
        function filterHtml(html) {
            return '' + html;
        }
    
        function setText(node, text) {
            node.appendChild(document.createTextNode(text))
        }
        function setHtml(node, html) {
            node.innerHTML = filterHtml(html);
        }
    
        function isWnode(n) {
            return n instanceof Wnode;
        }
    
        return {
            isWnode: isWnode,
            setText: setText,
            setHtml: setHtml,
            setStyle: setStyle,
            setAttrs: setAttrs,
            setData: setData
        };
    })();
    ;
    
    /*
    [Malta] Unode.js
    */
    function Unode(config) {
        this.config = config;
        this.parent = config.target;
        this.node = document.createElement(config.tag || 'div');
        this.rendered = false;
        this.toSolve = 0;
        this.data = 'data' in config ? config.data : {};
        this.dataSet = {};
        this.rootNode = 'rootNode' in config ? config.rootNode : this;
        this.parentNode = 'parentNode' in config ? config.parentNode : this;
        this.resolve = function () {};
        this.reset = function () {};
        this.setMethods(); //just once
        this.init();
    }
    
    Unode.prototype.init = function () {
        this.rendered = false;
        // this.prepareSolve();
        this.setCall('Text,Html,Style,Attrs,Data,Children,Cbs');
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
            var common = {
                target: self.node,
                rootNode: self.rootNode,
                parentNode: self
            };
            if (typeof this.config.children === 'function') {
                _children = this.config.children.call(this).map(function (child) {
                    return new Unode(Object.assign({}, child, common));
                });
            } else {
                _children = this.config.children.map(function (child) {
                    return new Unode(Object.assign({}, child, common));
                });
            }
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
        return this;
    };
    
    Unode.prototype.setCbs = function () {
        this.cb = ('cb' in this.config && typeof this.config.cb === 'function')
            ? this.config.cb.bind(this)
            : this.solve.bind(this);
    };
    
    Unode.prototype.setStyle = function (style) {
        if (style) {
            this.config.style = Object.assign(this.config.style, style)
        }
        this.config.style && utils.setStyle(this.node, this.config.style);
    };
    
    Unode.prototype.setAttrs = function (attrs) {
        if (attrs) {
            this.config.attrs = Object.assign(this.config.attrs, attrs)
        }
        this.config.attrs && utils.setAttrs(this.node, this.config.attrs);
    };
    
    Unode.prototype.setData = function (data) {
        if (data) {
            this.config.dataSet = Object.assign(this.config.dataSet, data)
        }
        if (this.config.dataSet) {
            this.dataSet = this.config.dataSet;
            utils.setDataSet(this.node, this.dataSet);
        }
    };
    
    Unode.prototype.setText = function (text) {
        if (typeof text !== 'undefined') this.config.text = text;
        typeof this.config.text !== 'undefined' && utils.setText(this.node, this.config.text);
    };
    
    Unode.prototype.setHtml = function (html) {
        if (typeof html !== 'undefined') this.config.html = html;
        typeof this.config.html !== 'undefined' && utils.setHtml(this.node, this.config.html);
    };
    
    Unode.prototype.done =
    Unode.prototype.solve = function () {
        this.toSolve--;
        if (this.toSolve <= 0) {
            this.parent.appendChild(this.node)
            this.rendered = true;
            this.resolve();
        }
    };
    Unode.prototype.render = function () {
        var self = this,
            ret = new Balle(function (resolve, reject) {
                self.resolve = resolve;
                self.reject = reject;
            });
        // if (this.rendered) {
            // this.cleanup();
            // this.init();
            this.rendered = false
            // this.render();
        // } else {
            if (this.toSolve > 0) {
                this.children.forEach(function (child) {
                    child.render().then(function () {
                        self.node.appendChild(child.node)
                        self.cb();
                    });
                });
            } else {
                this.rendered = true;
                this.cb();
            }
            
                
                
        // }
        return ret;
    };;
    
    /*
    [Malta] engy.js
    */
    var Engy = {};
    Engy.solve = function(config) {
        return {
            then: function (f) {
                return f(config)
            }
        }
    }
    
    ;

    return {
        render: function (config) {
            var target = config.target,
                fragment = document.createDocumentFragment(),
                wn = new Unode(
                    Object.assign(
                        {},
                        config,
                        {
                            target: fragment,
                        }
                    )
                );
            wn.render().then(function () {
                target.appendChild(fragment)
            });
            return wn;
        },
        renderWithComponents: function (config) {
            console.log('init', config)
            // return Engy.solve(config).then(render)
        }
    }
})();