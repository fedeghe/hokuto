LIB.dom = (function (W) {
    var noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    
    function setStyle(node, styles) {
        var tmp;
        if (typeof styles === _U_) throw new Error('ERR: styles needed')
        for (tmp in styles) {
            if (tmp === 'float') {
                node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
            } else {
                node.style[tmp] = styles[tmp];
            }
        }
        
    }

    function setAttrs(node, attrs) {
        if (typeof attrs === _U_) throw new Error('ERR: attrs needed')
        for (var tmp in attrs) {
            if (noAttrs.indexOf(tmp) < 0)
                node.setAttribute(tmp, attrs[tmp]);
        }
    }
    
    function unsetAttrs(node, attrs) {
        if (typeof attrs === _U_) throw new Error('ERR: attrs needed')
        for (var tmp in attrs) {
            if (noAttrs.indexOf(tmp) < 0)
                node.removeAttribute(tmp, attrs[tmp]);
        }
    }

    function setData(node, data) {
        if (typeof data === _U_) throw new Error('ERR: data needed')
        for (var tmp in data) {
            node.dataset[tmp] = data[tmp];
        }
    }

    function unsetData(node, data) {
        if (typeof data === _U_) throw new Error('ERR: data needed')
        for (var tmp in data) {
            delete node.dataset[tmp]
        }
    }

    function remove(el) {
        return el.parentNode && el.parentNode.removeChild(el);
    }

    function filterHtml(html) {return '' + html;}

    function setText(node, text) {node.appendChild(document.createTextNode(text));}

    function setHtml(node, html) {node.innerHTML = filterHtml(html);}

    return {
        remove: remove,
        setText: setText,
        setHtml: setHtml,
        setStyle: setStyle,
        setAttrs: setAttrs,
        unsetAttrs: unsetAttrs,
        setData: setData,
        unsetData: unsetData
    };
})(window);

NS.makeNs('LIB.dom', {
    removessss: function (el) {
        return el.parentNode && el.parentNode.removeChild(el);
    }
});

