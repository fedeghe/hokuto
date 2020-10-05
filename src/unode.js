function Unode(config) {
    this.config = config;
    this.map = config.map;
    this.parent = config.target;
    this.node = document.createElement(config.tag || 'div');
    this.rendered = false;
    this.toSolve = 0;
    this.state = 'state' in config ? config.state : {};
    this.data = 'data' in config ? config.data : {};
    this.rootNode = 'rootNode' in config ? config.rootNode : this;
    this.parentNode = 'parentNode' in config ? config.parentNode : this;
    this.resolve = function () {};
    this.reset = function () {};
    this.setMethods(); //just once
    this.prepareState(); //just once
    this.init();
}

Unode.prototype.prepareState = function () { 
    var statePassed = 'state' in this.config,
        state = statePassed ? this.config.state : {};
    this.state = typeof state === 'function'
        ? state()
        : state;
}
Unode.prototype.init = function () {
    this.rendered = false;
    // this.prepareSolve();
    this.setCall('Ref,Events,Text,Html,Style,Attrs,Data,Children,Cbs');
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
            map: self.map,
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

Unode.prototype.getNode = function (id) {
    return this.map[id];
};
Unode.prototype.setRef = function () {
    if (typeof this.config.ref !== 'undefined') {
        this.map[this.config.ref] = this
    }
};

Unode.prototype.setCbs = function () {
    this.cb = ('cb' in this.config && typeof this.config.cb === 'function')
        ? this.config.cb.bind(this)
        : this.solve.bind(this);
};

Unode.prototype.setStyle = function (style) {
    if (style) {
        this.config.style = Object.assign({}, this.config.style, style)
    }
    this.config.style && utils.setStyle(this.node, this.config.style);
};

Unode.prototype.setAttrs = function (attrs) {
    if (attrs) {
        this.config.attrs = Object.assign({}, this.config.attrs, attrs)
    }
    this.config.attrs && utils.setAttrs(this.node, this.config.attrs);
};

Unode.prototype.setData = function (data) {
    if (data) {
        this.config.data = Object.assign({}, this.config.data, data)
    }
    if (this.config.data) {
        this.data = this.config.data;
        utils.setData(this.node, this.data);
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


Unode.prototype.killEvent = function (e) {
    utils.kill(e);
};
Unode.prototype.setEvents = function () {
    var i,
        self = this,
        mat, ev;

    for (i in self.config) {
        mat = i.match(/^on([A-Z]{1}[a-z]*)$/);
        if (mat) {
            ev = mat[1].toLowerCase();
            (function (eventName) {
                utils.on(self.node, ev, function (e) {
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
    this.toSolve--;
    if (this.toSolve <= 0) {
        this.parent.appendChild(this.node)
        this.rendered = true;
        this.resolve(this);
    }
};
Unode.prototype.render = function () {
    var self = this,
        ret = new Balle(function (resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });

        this.rendered = false

        this.toSolve > 0
        ? this.children.forEach(function (child) {
            child.render().then(function () {
                self.node.appendChild(child.node);
                self.cb();
            });
        })
        : this.rendered = true, this.cb();
        
    return ret;
};