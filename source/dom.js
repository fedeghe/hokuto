import {
    TYPES
} from './core'


var noAttrs = ['innerHTML', 'style', 'dataset', 'className'];

function setStyle(node, styles) {
    if (typeof styles === TYPES.U)
        throw new Error('ERR: styles needed')
    for (let tmp in styles) {
        if (tmp === 'float') {
            node.style[tmp.replace(/^float$/i, 'cssFloat')] = styles[tmp];
        } else {
            node.style[tmp] = styles[tmp];
        }
    }
}

function setAttrs(node, attrs) {
    if (typeof attrs === TYPES.U)
        throw new Error('ERR: attrs needed')
    for (let tmp in attrs) {
        if (noAttrs.indexOf(tmp) < 0)
            node.setAttribute(tmp, attrs[tmp]);
    }
}

function unsetAttrs(node, attrs) {
    if (typeof attrs === TYPES.U)
        throw new Error('ERR: attrs needed')
    for (let tmp in attrs) {
        noAttrs.indexOf(tmp) < 0
        && node.removeAttribute(tmp, attrs[tmp]);
    }
}

function setData(node, data) {
    if (typeof data === TYPES.U)
        throw new Error('ERR: data needed')
    for (let tmp in data) {
        node.dataset[tmp] = data[tmp];
    }
}

function unsetData(node, data) {
    if (typeof data === TYPES.U)
        throw new Error('ERR: data needed')
    for (let tmp in data) {
        delete node.dataset[tmp]
    }
}

function remove(el) {
    return el.parentNode && el.parentNode.removeChild(el);
}

//TODO
function filterHtml(html) {
    return '' + html;
}

function setText(node, text) {
    node.appendChild(document.createTextNode(text));
}

function setHtml(node, html) {
    node.innerHTML = filterHtml(html);
}

export default {
    remove,
    setText,
    setHtml,
    setStyle,
    setAttrs,
    unsetAttrs,
    setData,
    unsetData
};