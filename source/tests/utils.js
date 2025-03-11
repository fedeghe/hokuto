var hokuto = require('../../dist/index.js');
var render = (conf ,clear , label) => {
    return hokuto.render({
        target: document.getElementById('target'),
        ...conf
    }, clear, label);
};
var selector = d => document.querySelector(d);
var selectors = d => document.querySelectorAll(d);

module.exports = {
    render,
    selector,
    selectors
};