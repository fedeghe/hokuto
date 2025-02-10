var resolutive = function () {
    return Promise.resolve();
};

function Knot(config, clearTarget) {
    this.config = config;
    this.clearTarget = clearTarget;
    this.rendered = false;
    this.frag = document.createDocumentFragment();
    this.target = this.config.target || document.body;
    this.children = this.config.children || [];
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
    this.prepareState();
    this.initialize();
}

Knot.prototype.prepareState = function() {
    const statePassed = 'state' in this.config,
        state = statePassed ? this.config.state : {};

    this.state = typeof state === Hok.TYPES.F ?
        state.call(this) :
        state;
};
Knot.prototype.setState = function(o) {
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            this.state[i] = o[i];
        }
    }
};

Knot.prototype.setCall = function(fns) {
    var self = this;
    fns.split(/,/).forEach(function(f) {
        self['set' + f]()
    })
};

Knot.prototype.lateKid = function(id) {
    if (!(id in this.nodes)) {
        this.nodes[id] = this;
    } else {
        consolw.warn('node already present by "'+Knot.byIdIdentifier+'"')
    }
};

Knot.prototype.initialize = function(){
    this.rendered = false;
    this.setCall('Ref,Events,Html,Text,Style,Attrs,Data,Classname,End,ById');
    typeof this.config[Knot.identifier] !== Hok.TYPES.U &&
        typeof this.config.map.elements[this.config[Knot.identifier]] === Hok.TYPES.U &&
    this.map.add(this.config[Knot.identifier], this);
};

Knot.prototype.setById = function() {
    if(Knot.byIdIdentifier in this.config) {
        var kid = this.config[Knot.byIdIdentifier]
        this.nodes[kid] = this;
    }
};
Knot.prototype.getById = function(kid) {
    return kid in this.nodes
        ? this.nodes[kid]
        : null
};
Knot.prototype.setRef = function(ref, ctx) {
    // allow the node to set a ref on itself
    // or to another node it can reference
    if (ref) {
        (ctx || this).map[ref] = ctx || this
            // or incase is in the config, just set it
    } else if (typeof this.config.ref !== Hok.TYPES.U) {
        this.map.add(this.config.ref, this)
    }
};

Knot.prototype.setClassname = function() {
    this.config.className && Hok.dom.setClass(this.node, this.config.className);
};

Knot.prototype.setStyle = function(style) {
    if (style) {
        this.config.style = Object.assign({}, this.config.style, style)
    }
    this.config.style && Hok.dom.setStyle(this.node, this.config.style);
};

Knot.prototype.setAttrs = function(attrs) {
    var a = typeof this.config.attrs === 'function'
        ? this.config.attrs.call(this)
        : this.config.attrs;
    if (attrs) {
        a = Object.assign({}, a, attrs)
    }
    this.config.attrs && Hok.dom.setAttrs(this.node, a);
};

Knot.prototype.setData = function(data) {
    if (data) {
        this.config.data = Object.assign({}, this.config.data, data)
    }
    if (this.config.data) {
        this.data = this.config.data;
        Hok.dom.setData(this.node, this.data);
    }
};

Knot.prototype.setText = function(text) {
    if (typeof text !== Hok.TYPES.U) this.config.text = text;
    typeof this.config.text !== Hok.TYPES.U
        && Hok.dom.setText(this.node, this.config.text);
};

Knot.prototype.setHtml = function(html) {
    if (typeof html !== Hok.TYPES.U) this.config.html = html;
    typeof this.config.html !== Hok.TYPES.U
        && Hok.dom.setHtml(this.node, this.config.html);
};

Knot.prototype.setMethods = function() {
    var self = this,
        keys = Object.keys(this.config),
        tmp;
    keys.forEach(function(k){
        tmp = k.match(/^method_(\w*)$/i);
        if (tmp) {
            if (!(tmp[1] in self)) {
                self[tmp[1]] = self.config[tmp[0]].bind(self);
            } else {
                console.warn('[WARNING] : method \'' + tmp[0] + '\' cant be added, would override existing element.')
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
        if(entry[0] === eventType){
            Hok.events.off(self.node, entry[0], entry[1]);
        } else {
            acc[entry[0]] = entry[1];
        }
        return acc;
    }, {});
};

Knot.prototype.initTag = function(){
    this.tag = this.config.tag || 'div';
    this.node = this.config.ns ?
        document.createElementNS(this.config.ns, this.tag) :
        document.createElement(this.tag);
    
};

Knot.prototype.setEnd = function(e) {
    const self = this;
    if(!this.rendered && 'end' in this.config && typeof this.config.end === Hok.TYPES.F){
        this.ender = self.config.end.call(self);
    }
    return this;
};






// if html or text is used then children will be ignored
// Knot.prototype.initContent = function(){
//     if (this.config.html) {
//         this.node.innerHTML = this.config.html;
//     }
// };

Knot.prototype.render = function(){
    var self = this;

    // this.unhandleEvents();
    this.frag.appendChild(this.node);
    /**
     * this node
     * - as parent
     *  might have a debt, thus needs to wait for its children to render an solve
     */
    if(!this.debt){
        if(this.parentKnot){
            this.parentKnot.solve();
        }
        this.initCheck.call(this).then(function () {
            if(self.clearTarget){
                self.target.innerHTML = '';
            }
            self.cb.call(self).then(function() {
                if(!self.aborted){
                    self.target.appendChild(self.frag);
                }
            }).catch(function(){
                console.log('cant render: ', self);
            });
        }).catch(function(){
            //free mem
            self.frag.removeChild(self.node);
        })
        
    } else {
        for(var i = 0, l = this.children.length; i < l; i++){
            var c = Object.assign(
                {},
                self.children[i],
                {
                    target: self.node,
                    parentKnot: self,
                    rootKnot: self.rootKnot,
                }
            );
            new Knot(c).render();
        }
    }
    this.rendered = true;
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
    const  jsonSize = JSON.stringify(this.config).length,
        htmlSize = this.node.innerHTML.length;
    return (htmlSize / jsonSize).toFixed(2) + " (html:" + htmlSize + " / json:" + jsonSize + ")"
};

Knot.isknot = function(n){return n instanceof Knot};
Knot.identifier = 'id';
Knot.byIdIdentifier = 'kid';