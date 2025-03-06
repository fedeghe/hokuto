/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line no-unused-vars
var hokuto = require('../../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('all props', () => {
    const basicConfig = {
            html: 'hello',
            id:'p'
        },
        originalHtml = document.body.innerHTML,
        documentClear = () => {
            document.body.innerHTML = originalHtml;
        },
        cb = jest.fn(()=>Promise.resolve()),
        cbResolving = jest.fn(()=>Promise.resolve()),
        cbRejecting = jest.fn(() =>Promise.reject()),
        initTrue = jest.fn(() => Promise.resolve()),
        initFalse = jest.fn(() => Promise.reject()),
        insideEnder = jest.fn(),
        ender = jest.fn(() => insideEnder);
    afterEach(() => {
        cb.mockClear();
        documentClear();
    });
    
    it('functional state', () => {
        render({
            ...basicConfig,
            state: function(){
                return {name: 'Bob'};
            }
        },true).then((n) => {
            expect(n.state.name).toBe('Bob');
        });
    });

    it('functional style', () => {
        render({
            ...basicConfig,
            style: function(){
                return {color:'red'};
            }
        },true).then((n) => {
            expect(n.node.style.color).toBe('red');
        });
    });
    it('functional attrs', () => {
        render({
            ...basicConfig,
            attrs: function(){
                return {
                    title: 'just a title',
                    alt: 'just a alt'
                };
            }
        },true).then((n) => {
            expect(n.node.getAttribute('title')).toBe('just a title');
            expect(n.node.getAttribute('alt')).toBe('just a alt');
        });
    });

    it('functional html', () => {
        render({
            ...basicConfig,
            html: function(){
                return '<span id="inside">just a title</span>';
            }
        },true).then(() => {
            expect(selector('#inside')).not.toBeNull();
        });
    });
    it('functional data', () => {
        render({
            ...basicConfig,
            data: function(){
                return {name: 'Alice'};
            },
            html: 'Bob',
            id:'trg'
        },true).then(() => {
            var n = selector('#trg');
            expect(n.dataset.name).toBe('Alice');
            expect(n.innerHTML).toBe('Bob');
        });
    });



});