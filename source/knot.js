var resolutive = function () {
        return Promise.resolve();
    },
    isDefined = function (x){return typeof x !== Hok.TYPES.U;},
    isFunction = function (f){return typeof f === Hok.TYPES.F;},
    functionize = function (instance, what){
        return isFunction(what)
            ? what.call(instance)
            : what;
    };

function Knot(config, clearTarget) {
    var self = this;
    this.config = config;
    this.clearTarget = clearTarget;
    this.rendered = !!config.rendered;
    this.frag = document.createDocumentFragment();
    this.target = this.config.target || document.body;
    this.children = this.config.children || [];
    this.childrenKnots = [];

    this.debt = ~~(this.children.length);
    this.solved = this.debt === 0;
    this.cb = this.config.cb || resolutive;
    this.parentKnot = this.config.parentKnot || null;
    this.rootKnot = this.config.rootKnot || this;
    this.initCheck = this.config.initCheck || resolutive;
    this.abort = this.config.abort || resolutive;
    this.aborted = false;
    this.ender = false;
    this.state = 'state' in config ? config.state : {};
    
    this.nodes = config.nodes || this.rootKnot.nodes;
    this.rootNodeUnhandlersCollector = [];
    this.unhandlers = {};
    
    this.abort.call(this).then().catch(function (){
        self.rootKnot.aborted = true;
    });

    this.initTag();
    this.initialize();
}

Knot.prototype.initTag = function(){
    this.tag = this.config.tag || 'div';
    this.node = this.config.ns ?
        document.createElementNS(this.config.ns, this.tag) :
        document.createElement(this.tag);
};

Knot.prototype.initialize = function(){
    this.setCall('Id,Ref,Data,State,Events,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
};

Knot.prototype.initRerender = function(){
    this.setCall('Ref,Data,State,Html,Text,Style,Attrs,Classname,End,ByRef,Methods');
    this.cb && this.cb.call(this);
    this.childrenKnots.forEach(function (childrenKnot) {
        childrenKnot.initRerender();
    }); 
};

/**
 * SETTERS 
 */

/**
 * 
 * @param {*} state 
 */
Knot.prototype.setState = function(state) {
    if (isDefined(state)){
        for (var i in state) {
            if (state.hasOwnProperty(i)) this.state[i] = state[i];
        }
    } else {
        var statePassed = 'state' in this.config,
            state = statePassed ? this.config.state : {};
        this.state = functionize(this, state);
    }
    return this;
};

Knot.prototype.setId = function(id) {
    var fromConf = isDefined(this.config[Knot.identifier]),
        val,
        attrs = {};
    if (fromConf || id) {
        val = fromConf
            ? this.config[Knot.identifier]
            : id;
        attrs[Knot.identifier] = val;
        this.setAttrs(attrs);
    }
};
Knot.prototype.setCall = function(fns) {
    var self = this;
    fns.split(/,/).forEach(function(f) {
        self['set' + f]();
    });
};

Knot.prototype.lateKid = function(id) {
    if (!(id in this.nodes)) {
        this.nodes[id] = this;
    } else {
        consolw.warn('node already present by "'+Knot.byIdIdentifier+'"');
    }
};

Knot.prototype.setByRef = function() {
    if (Knot.byIdIdentifier in this.config) {
        var ref = this.config[Knot.byIdIdentifier];
        this.nodes[ref] = this;
    }
};

Knot.prototype.getByRef = function(ref) {
    return ref in this.nodes
        ? this.nodes[ref]
        : null;
};

Knot.prototype.setRef = function(ref, ctx) {
    // allow the node to set a ref on itself
    // or to another node it can reference
    if (ref) {
        (ctx || this).nodes[ref] = ctx || this;
            // or incase is in the config, just set it
    } else if (isDefined(this.config.ref)) {
        this.nodes[this.config.ref] = this;
    }
};

Knot.prototype.setClassname = function() {
    this.config.className && Hok.dom.setClass(this.node, this.config.className);
};

Knot.prototype.setStyle = function(style) {
    var self = this;
    this.config.style = functionize(this, this.config.style || {});
    if (style) {
        this.config.style = Object.assign(
            {},
            self.config.style,
            functionize(self, style)
        );
    }
    this.config.style && Hok.dom.setStyle(this.node, this.config.style);
};

Knot.prototype.setAttrs = function(attrs) {
    var self = this;
    this.config.attrs = functionize(this, this.config.attrs || {});
    if (attrs) {
        this.config.attrs = Object.assign(
            {},
            self.config.attrs,
            functionize(self, attrs)
        );
    }
    this.config.attrs && Hok.dom.setAttrs(this.node, this.config.attrs);
};

Knot.prototype.unsetAttrs = function(attrs) {
    attrs && Hok.dom.unsetAttrs(this.node, attrs);
};

Knot.prototype.setData = function(data) {
    if (data) {
        this.config.data = Object.assign({}, this.config.data, data);
    }
    if (this.config.data) {
        this.data = this.config.data;
        Hok.dom.setData(this.node, this.data);
    }
};

Knot.prototype.unsetData = function(data) {
    data && Hok.dom.unsetData(this.node, data);
};

Knot.prototype.setText = function(text) {
    if (isDefined(text)) this.config.text = text;
    isDefined(this.config.text)
        && Hok.dom.setText(this.node, this.config.text);
};

Knot.prototype.setHtml = function(html) {
    if (isDefined(html)) this.config.html = html;
    if (isDefined(this.config.html)) {
        
        if (isFunction(this.config.html)) {
            Hok.dom.setHtml(this.node, this.config.html.call(this));
        } else {
            Hok.dom.setHtml(this.node, this.config.html);
        }
    }
};

Knot.prototype.setMethods = function() {
    var self = this,
        keys = Object.keys(this.config),
        tmp;
    keys.forEach(function(k){
        tmp = k.match(/^method_(\w*)$/i);
        if (tmp) {
            if (!(tmp[1] in self)) {
                self['_' + tmp[1]] = self.config[tmp[0]].bind(self);
            } else {
                console.warn('[WARNING] : method \'' + tmp[0] + '\' cant be added, would override existing element.');
            }
        }
    });
};

Knot.prototype.setEvents = function() {
    var self = this,
        mat, ev, i;
    self.unhandlers = {};

    for (i in self.config) {
        mat = i.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/);
        if (mat) {
            ev = mat[3].toLowerCase();
            (function(eventName) {
                var handler = function (e){return self.config[eventName].call(self, e);};
                Hok.events[mat[1]](
                    self.node,
                    ev,
                    handler
                );
                self.unhandlers[ev] = handler;
            })(i);
        }
    }
    this.unhandleEvents = function () {
        Object.entries(self.unhandlers).forEach(function (entry) {
            Hok.events.off(self.node, entry[0], entry[1]);
        });
        return self;
    };
    this.rootKnot.rootNodeUnhandlersCollector.push(this.unhandleEvents);
    return this;
};

Knot.prototype.unhandle = function(eventType){
    var self = this;
    self.unhandlers = Object.entries(self.unhandlers).reduce(function (acc, entry){
        if (entry[0] === eventType) {
            Hok.events.off(self.node, entry[0], entry[1]);
        } else {
            acc[entry[0]] = entry[1];
        }
        return acc;
    }, {});
};

Knot.prototype.setEnd = function() {
    var self = this;
    if (!this.rendered && 'end' in this.config && isFunction(this.config.end)) {
        this.ender = self.config.end.call(self);
    }
    return this;
};

Knot.prototype.render = function(){
    var self = this;
    if (this.rendered) {
        this.initRerender();
    } else {
        this.frag.appendChild(this.node);
        if (this.debt) {
            return this.children.reduce(function (p, children) {
                var c = Object.assign(
                        {rendered: self.rendered},
                        children,
                        {
                            target: self.node,
                            parentKnot: self,
                            rootKnot: self.rootKnot,
                        }
                    ),
                    newChild = new Knot(c);
                self.childrenKnots.push(newChild);
                return p.then(function () { return newChild.render();});
            }, Promise.resolve()).then(function(){return self;});
        } else {
            return this.initCheck.call(this).then(function () {
                return self.cb.call(self).then(function() {
                    if(!self.aborted){
                        if (self.clearTarget && !self.rendered) {
                            self.target.innerHTML = '';
                        }
                        if (!self.rendered) self.target.appendChild(self.frag);
                        self.rendered = true;
                    }
                    return self;
                });
            }).then(function(){
                if(self.parentKnot){
                    self.parentKnot.solve();
                }
                return self;
            }).catch(function(){
                self.frag.removeChild(self.node);
            });
        }
    }
    
    return Promise.resolve(this);
};

Knot.prototype.clear = function(){
    if(this.ender) this.ender();
    this.target.removeChild(this.node);
    this.unhandleEvents();
};
Knot.prototype.solve = function(){
    if(this.debt > 0){
        this.debt--;
    }
    if(this.debt <= 0) {
        this.solved = true;
        this.render();
    }
};
Knot.prototype.report = function() {
    var jsonSize = JSON.stringify(this.config).length,
        htmlSize = this.node.innerHTML.length;
    return (htmlSize / jsonSize).toFixed(2) + " (html:" + htmlSize + " / json:" + jsonSize + ")";
};

Knot.isknot = function(n){return n instanceof Knot;};
Knot.identifier = 'id';
Knot.byIdIdentifier = 'ref';