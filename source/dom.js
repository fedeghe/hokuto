(function(ctx){
    ctx.noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    ctx.setStyle = function(node, styles) {
        if (typeof styles === Hok.TYPES.U)
            throw new Error('ERR: styles needed');
        for (var tmp in styles) {
            if (tmp === 'float') {
                node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
            } else {
                node.style[tmp] = styles[tmp];
            }
        }
    };

    ctx.setAttrs = function(node, attrs) {
        if (typeof attrs === Hok.TYPES.U)
            throw new Error('ERR: attrs needed');
        for (var tmp in attrs) {
            if (ctx.noAttrs.indexOf(tmp) < 0)
                node.setAttribute(tmp, attrs[tmp]);
        }
    };

    ctx.unsetAttrs = function(node, attrs) {
        if (typeof attrs === Hok.TYPES.U)
            throw new Error('ERR: attrs needed');
        for (var tmp in attrs) {
            ctx.noAttrs.indexOf(tmp) < 0
            && node.removeAttribute(tmp, attrs[tmp]);
        }
    };

    ctx.setData = function(node, data) {
        if (typeof data === Hok.TYPES.U)
            throw new Error('ERR: data needed');
        for (var tmp in data) {
            node.dataset[tmp] = data[tmp];
        }
    };

    ctx.setClass = function(node, data) {
        data.split(',').forEach(function (cls){
            node.classList.add(cls);
        });
    };

    ctx.unsetData = function(node, data) {
        if (typeof data === Hok.TYPES.U)
            throw new Error('ERR: data needed');
        for (var tmp in data) {
            delete node.dataset[tmp];
        }
    };

    ctx.remove = function(el) {
        return el.parentNode && el.parentNode.removeChild(el);
    };

    //TODO
    ctx.filterHtml = function(html) {
        return '' + html;
    };

    ctx.setText = function(node, text) {
        node.appendChild(document.createTextNode(text));
    };

    ctx.setHtml = function(node, html) {
        node.innerHTML = ctx.filterHtml(html);
    };

})(Hok.dom);

