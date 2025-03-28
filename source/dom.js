(function(ctx){

    ctx.noAttrs = ['innerHTML', 'style', 'dataset', 'className'];
    ctx.setStyle = function(node, styles) {
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

    ctx.setClass = function(node, clss) {
        clss.split(',').forEach(function (cls){
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
    ctx.script = function(params, autoVanish) {
        var script = document.createElement('script'),
            attrs = params && params.attrs;
        
        if (attrs) ctx.setAttrs(script, attrs);
        if(autoVanish){
            script.onload = function() {
                script.parentNode.removeChild(script);
            };
        }
        if(params.content) {
            script.innerHTML = params.content;
        } else if(params.src){
            script.setAttribute('src', params.src);
        }
        return script;
    };
    ctx.style = function(params) {
        var type = params.content
                ? { tag: 'style', attrs: {}}
                : { tag: 'link', attrs: {
                    rel: 'stylesheet',
                    href: params.href
                }},
            tag = document.createElement(type.tag),
            attrs = Object.assign(
                type.attrs,
                params && params.attrs || {}
            );
        ctx.setAttrs(tag, attrs);
        if (params.content) {
            tag.innerHTML = params.content;
        }
        return tag;
    };
    ctx.head = document.getElementsByTagName('head')[0];

})(Hok.dom);

