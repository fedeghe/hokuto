function Unode(config) {
    this.config = config;
    this.parent = config.target;
    this.node = document.createElement(config.tag || 'div');
    this.rendered = false;
    this.toSolve = 0;
    this.data = {};
    this.rootNode = 'rootNode' in config ? config.rootNode : this;
    this.parentNode = 'parentNode' in config ? config.parentNode : this;
    this.resolve = function () {};
    this.reset = function () {};
    this.init();
    this.setMethods(); //just once
}

Unode.prototype.init = function () {
    this.rendered = false;
    // this.prepareSolve();
    this.setCall('Text,Html,Style,Attrs,Data,Cbs,Children');
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

Unode.prototype.setStyle = function () {
    this.config.style && utils.setStyle(this.node, this.config.style);
};

Unode.prototype.setAttrs = function () {
    this.config.attrs && utils.setAttrs(this.node, this.config.attrs);
};

Unode.prototype.setData = function () {
    this.config.data && utils.setData(this.node, this.config.data);
};

Unode.prototype.setText = function () {
    typeof this.config.text !== 'undefined' && utils.setText(this.node, this.config.text);
};

Unode.prototype.setHtml = function () {
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
    if (this.rendered) {
        this.cleanup();
        this.init();
        // console.log('render', +new Date)
        this.render();
    } else {
        this.toSolve > 0
            ? this.children.forEach(function (child) {
                child.render().then(function () {
                    self.node.appendChild(child.node)
                    self.cb();
                });
            })
            : this.cb();
    }
    return ret;
};