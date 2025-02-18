/**
 * @jest-environment jsdom
 */
var hokuto = require('../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('basic hokuto', () => {
    const basicConfig = {
        children:[{
            tag:'p',
            html:'test'
        }]
    }
    it('contains the expected', () => {
        expect(typeof hokuto.render).toBe('function');
        expect(typeof hokuto.get).toBe('function');
    });
    it('basic not clearing render', done => {
        render(basicConfig).then(r=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).not.toBeNull()
            done();
        });
    });
    it('basic clearing render', done => {
        render(basicConfig,true).then(r=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).toBeNull()
            done();
        });
    });
});