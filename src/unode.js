function Unode(config) {
    this.config = config;
    this.parent = config.target;
    this.node = document.createElement(config.tag || 'div');
    this.rendered = false;
    this.toSolve = 0;
    this.resolve = function () {};
    this.reset = function () {};
    this.init();
}

Unode.prototype.init = function () {
    this.rendered = false;
    this.prepareSolve();
    this.setCall('Text,Html,Style,Attrs,Data,Cbs,Children');
};

Unode.prototype.setCall = function (fns) {
    var self = this;
    fns.split(/,/).forEach(function (f) {
        self['set' + f]()
    })
}
Unode.prototype.cleanup = function () {
    this.node.innerHTML = '';
    this.node.parentNode.removeChild(this.node);
}
Unode.prototype.prepareSolve = function () {
    this.toSolve = 'children' in this.config
        ? this.config.children.length : 0;
}
Unode.prototype.setChildren = function () {
    var self = this
    this.children = this.toSolve
        ? this.config.children.map(function (child) {
            return new Unode(Object.assign({}, child, {target: self.node}))
        })
        : [];
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
    this.config.text && utils.setText(this.node, this.config.text);
};

Unode.prototype.setHtml = function () {
    this.config.html && utils.setHtml(this.node, this.config.html);
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