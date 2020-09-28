

var utils = (function () {
    var _U_ = 'undefined',
        noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    
    function setStyle(node, styles) {
        var tmp;
        if (typeof styles !== _U_) {
            for (tmp in styles) {
                if (tmp === 'float') {
                    node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
                } else {
                    node.style[tmp] = styles[tmp];
                }
            }
        }
    }

    function setAttrs(node, attrs) {
        if (typeof attrs !== _U_) {
            for (var tmp in attrs) {
                if (noAttrs.indexOf(tmp) < 0)
                    node.setAttribute(tmp, attrs[tmp]);
            }
        }
    }
    function setData(node, data) {
        if (typeof data !== _U_) {
            for (var tmp in data) {
                node.dataset[tmp] = data[tmp];
            }
        }
    }
    
    function filterHtml(html) {
        return '' + html;
    }

    function setText(node, text) {
        node.appendChild(document.createTextNode(text))
    }
    function setHtml(node, html) {
        node.innerHTML = filterHtml(html);
    }

    function isWnode(n) {
        return n instanceof Wnode;
    }

    return {
        isWnode: isWnode,
        setText: setText,
        setHtml: setHtml,
        setStyle: setStyle,
        setAttrs: setAttrs,
        setData: setData
    };
})();
