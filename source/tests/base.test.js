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
    };
    it('contains the expected', () => {
        expect(typeof hokuto.render).toBe('function');
        expect(typeof hokuto.get).toBe('function');
        expect(typeof hokuto.getKnotById).toBe('function');
        expect(typeof hokuto.getElement).toBe('function');
        expect(typeof hokuto.getElements).toBe('function');
    });
    it('hokuto.io is the expected', () => {
        expect(typeof hokuto.io.getXML).toBe('function');
        expect(typeof hokuto.io.getJson).toBe('function');
        expect(typeof hokuto.io.post).toBe('function');
        expect(typeof hokuto.io.get).toBe('function');
    });
    it('hokuto.i18n is the expected', () => {
        expect(typeof hokuto.i18n.lang).toBe('string');
        expect(typeof hokuto.i18n.switchLang).toBe('function');
        expect(typeof hokuto.i18n.check).toBe('function');
        expect(typeof hokuto.i18n.dynamicLoad).toBe('function');
        expect(typeof hokuto.i18n.get).toBe('function');
        expect(typeof hokuto.i18n.load).toBe('function');
        expect(typeof hokuto.i18n.parse).toBe('function');
    });
    it('hokuto.dom is the expected', () => {
        expect(typeof hokuto.dom.setStyle).toBe('function');
        expect(typeof hokuto.dom.setAttrs).toBe('function');
        expect(typeof hokuto.dom.unsetAttrs).toBe('function');
        expect(typeof hokuto.dom.setData).toBe('function');
        expect(typeof hokuto.dom.remove).toBe('function');
        expect(typeof hokuto.dom.filterHtml).toBe('function');
        expect(typeof hokuto.dom.setText).toBe('function');
        expect(typeof hokuto.dom.setHtml).toBe('function');
    });
    it('hokuto.events is the expected', () => {
        expect(typeof hokuto.events._.events.getElementDeterminant).toBe('function');
        expect(typeof hokuto.events._.events.getElementEvent).toBe('function');
        expect(typeof hokuto.events._.bindErr).toBe('function');
        expect(typeof hokuto.events.saveUnhandler).toBe('function');
        expect(typeof hokuto.events.unhandle).toBe('function');
        expect(typeof hokuto.events.on).toBe('function');
        expect(typeof hokuto.events.off).toBe('function');
        expect(typeof hokuto.events.kill).toBe('function');
        expect(typeof hokuto.events.once).toBe('function');
        expect(typeof hokuto.events.eventTarget).toBe('function');
        expect(typeof hokuto.events.noEvents).toBe('function');
        expect(typeof hokuto.events.ready).toBe('function');
    });
    it('hokuto.utils is the expected', () => {
        expect(typeof hokuto.utils.type.isFunction).toBe('function');
        expect(typeof hokuto.utils.type.isObject).toBe('function');
        expect(typeof hokuto.utils.type.isArray).toBe('function');
        
    });
    it('basic not clearing render', done => {
        render(basicConfig).then(()=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).not.toBeNull();
            done();
        });
    });
    it('basic clearing render', done => {
        render(basicConfig,true).then(()=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).toBeNull();
            done();
        });
    });
});