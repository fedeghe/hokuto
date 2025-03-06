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
    
    it('setStyle exception', done => {
        try{
            render({
                ...basicConfig,
                style: undefined
            });
        } catch(e) {
            console.log(e);
            done();
        }
    });
});