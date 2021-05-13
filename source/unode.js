import Balle from 'balle'
import { TYPES } from './core'
import DOM from './dom'
import EVENTS from './events'




function Unode(config, map) {
    this.config = config;
    this.map = map
    this.parent = config.target;
    this.tag = config.tag || 'div'
    this.node = this.config.ns ?
        document.createElementNS(config.ns, this.tag) :
        document.createElement(this.tag);
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

    this.resolve = function() {};
    this.reset = function() {};
    this.setMethods(); //just once
    this.prepareState(); //just once
    this.initialize();
    this.checkInit();
    this.checkEnd();
}

Unode.prototype.prepareState = function() {
    var statePassed = 'state' in this.config,
        state = statePassed ? this.config.state : {};

    this.state = typeof state === TYPES.F ?
        state() :
        state;
}
Unode.prototype.initialize = function() {
    this.rendered = false;
    this.setCall('Ref,Events,Text,Html,Style,Attrs,Data,Children,Cbs');
    // debugger
    typeof this.config[Unode.identifier] !== TYPES.U &&
        typeof this.config.map.elements[this.config[Unode.identifier]] === TYPES.U &&
        this.map.add(this.config[Unode.identifier], this);
};

Unode.prototype.setCall = function(fns) {
    var self = this;
    fns.split(/,/).forEach(function(f) {
        self['set' + f]()
    })
};

Unode.prototype.cleanup = function() {
    this.node.innerHTML = '';
    this.node.parentNode.removeChild(this.node);
};

Unode.prototype.setChildren = function() {
    var self = this,
        _children = [];

    if ('children' in this.config) {
        _children = (
            typeof this.config.children === TYPES.F ?
            this.config.children.call(this) :
            this.config.children
        ).map(function(child) {
            return new Unode(Object.assign({}, child, {
                target: self.node,
                rootNode: self.rootNode,
                map: self.map,
                parentNode: self
            }), self.map);
        });
    }
    this.toSolve = _children.length;
    this.children = _children;
};

Unode.prototype.setMethods = function() {
    var self = this,
        keys = Object.keys(this.config),
        tmp;
    keys.forEach(function(k) {
        tmp = k.match(/^method_(\w*)$/i);
        if (tmp) {
            if (!(tmp[1] in self)) {
                self[tmp[1]] = self.config[tmp[0]].bind(self);
            } else {
                console.warn('[WARNING] : method `' + tmp[0] + ' cant be added, would override existing element.')
            }
        }
    });
};

Unode.prototype.setRef = function(ref, ctx) {
    // allow the node to set a ref on itself
    // or to another node it can reference
    if (ref) {
        (ctx || this).map[ref] = ctx || this

        // or incase is in the config, just set it
    } else if (typeof this.config.ref !== TYPES.U) {
        this.map.add(this.config.ref, this)
    }
};

Unode.prototype.setCbs = function() {
    this.cb = ('cb' in this.config && typeof this.config.cb === TYPES.F) ?
        this.config.cb.bind(this) :
        this.solve.bind(this);
};

Unode.prototype.setStyle = function(style) {
    if (style) {
        this.config.style = Object.assign({}, this.config.style, style)
    }
    this.config.style && DOM.setStyle(this.node, this.config.style);
};

Unode.prototype.setAttrs = function(attrs) {
    if (attrs) {
        this.config.attrs = Object.assign({}, this.config.attrs, attrs)
    }
    this.config.attrs && DOM.setAttrs(this.node, this.config.attrs);
};

Unode.prototype.setData = function(data) {
    if (data) {
        this.config.data = Object.assign({}, this.config.data, data)
    }
    if (this.config.data) {
        this.data = this.config.data;
        DOM.setData(this.node, this.data);
    }
};

Unode.prototype.setText = function(text) {
    if (typeof text !== TYPES.U) this.config.text = text;
    typeof this.config.text !== TYPES.U && DOM.setText(this.node, this.config.text);
};

Unode.prototype.setHtml = function(html) {
    if (typeof html !== TYPES.U) this.config.html = html;
    typeof this.config.html !== TYPES.U && DOM.setHtml(this.node, this.config.html);
};

Unode.prototype.killEvent = function(e) {
    EVENTS.kill(e);
};

Unode.prototype.checkInit = function(e) {
    var keepRunning = true;
    if ('init' in this.config && typeof this.config.init === TYPES.F) {
        keepRunning = this.config.init.call(this);
        !keepRunning && this.abort();
    }
    return this;
};

Unode.prototype.checkEnd = function(e) {
    var self = this;
    'end' in this.config &&
        typeof this.config.end === TYPES.F &&
        this.map.endFunctions.push(function() {
            self.config.end.call(self);
        });
    return this;
};

Unode.prototype.unhandle = function(el) {
    EVENTS.unhandle(el || this.node);
};

Unode.prototype.setEvents = function() {
    var i,
        self = this,
        mat, ev;

    for (i in self.config) {
        mat = i.match(/^(on(ce)?)([A-Z]{1}[a-z]*)$/);
        if (mat) {
            ev = mat[3].toLowerCase();
            (function(eventName) {
                EVENTS[mat[1]](self.node, ev, function(e) {
                    self.config[eventName].call(self, e);
                });
            })(i);
        }
    }
    return this;
};

Unode.prototype.setState = function(o) {
    for (var i in o) {
        if (o.hasOwnProperty(i)) {
            this.state[i] = o;
        }
    }
};

Unode.prototype.done =
    Unode.prototype.solve = function() {
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

Unode.prototype.render = function() {
    var self = this,
        ret = new Balle(function(resolve, reject) {
            self.resolve = resolve;
            self.reject = reject;
        });
    this.rendered = false
    if (this.toSolve > 0) {
        this.children.forEach(function(child, i) {
            child.render().then(function() {
                self.node.appendChild(child.node);
                if (self.toSolve === 0) {
                    self.paramsFromChildren.length ?
                        self.cb(self.paramsFromChildren) :
                        self.cb()
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
Unode.prototype.report = function() {
    var jsonSize = JSON.stringify(this.config).length,
        htmlSize = this.node.innerHTML.length;
    return (htmlSize / jsonSize).toFixed(2) + " (html:" + htmlSize + " / json:" + jsonSize + ")"
};

Unode.isUnode = function(n) { return n instanceof Unode; }
Unode.identifier = 'id';

export default Unode