var hokuto = require('../../dist/index.js'),
    render = (conf ,clear , label) => {
        return hokuto.render({
            target: document.getElementById('target'),
            ...conf
        }, clear, label);
    },
    selector = d => document.querySelector(d),
    selectors = d => document.querySelectorAll(d);

module.exports = {
    render,
    selector,
    selectors,
    hokuto
};