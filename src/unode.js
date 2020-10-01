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