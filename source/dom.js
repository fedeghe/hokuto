Hok.dom.noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
Hok.dom.setStyle = function(node, styles) {
    if (typeof styles === Hok.TYPES.U)
        throw new Error('ERR: styles needed')
    for (var tmp in styles) {
        if (tmp === 'float') {
            node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
        } else {
            node.style[tmp] = styles[tmp];
        }
    }
};

Hok.dom.setAttrs = function(node, attrs) {
    if (typeof attrs === Hok.TYPES.U)
        throw new Error('ERR: attrs needed');
    for (var tmp in attrs) {
        if (Hok.dom.noAttrs.indexOf(tmp) < 0)
            node.setAttribute(tmp, attrs[tmp]);
    }
};

Hok.dom.unsetAttrs = function(node, attrs) {
    if (typeof attrs === Hok.TYPES.U)
        throw new Error('ERR: attrs needed');
    for (var tmp in attrs) {
        Hok.dom.noAttrs.indexOf(tmp) < 0
        && node.removeAttribute(tmp, attrs[tmp]);
    }
};

Hok.dom.setData = function(node, data) {
    if (typeof data === Hok.TYPES.U)
        throw new Error('ERR: data needed');
    for (var tmp in data) {
        node.dataset[tmp] = data[tmp];
    }
};

Hok.dom.setClass = function(node, data) {
    data.split(',').forEach(function (cls){
        node.classList.add(cls);
    });
};

Hok.dom.unsetData = function(node, data) {
    if (typeof data === Hok.TYPES.U)
        throw new Error('ERR: data needed');
    for (var tmp in data) {
        delete node.dataset[tmp];
    }
};

Hok.dom.remove = function(el) {
    return el.parentNode && el.parentNode.removeChild(el);
};

//TODO
Hok.dom.filterHtml = function(html) {
    return '' + html;
};

Hok.dom.setText = function(node, text) {
    node.appendChild(document.createTextNode(text));
};

Hok.dom.setHtml = function(node, html) {
    node.innerHTML = Hok.dom.filterHtml(html);
};
