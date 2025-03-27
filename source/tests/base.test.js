/**
 * @jest-environment jsdom
 */
var hokuto = require('../../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('basic hokuto', () => {
    const basicConfig = {
        config: {
            children:[{
                tag:'p',
                html:'test'
            }]
        },
        clear: true
    };
    it('contains the expected', () => {
        expect(typeof hokuto.render).toBe('function');
        expect(typeof hokuto.get).toBe('function');
        expect(typeof hokuto.getKnotById).toBe('function');
        expect(typeof hokuto.getElement).toBe('function');
        expect(typeof hokuto.getElements).toBe('function');
    });
    it('hokuto._.io is the expected', () => {
        expect(typeof hokuto._.io.getXML).toBe('function');
        expect(typeof hokuto._.io.getJson).toBe('function');
        expect(typeof hokuto._.io.post).toBe('function');
        expect(typeof hokuto._.io.get).toBe('function');
    });
    it('hokuto._.i18n is the expected', () => {
        expect(typeof hokuto._.i18n.lang).toBe('string');
        expect(typeof hokuto._.i18n.switchLang).toBe('function');
        expect(typeof hokuto._.i18n.check).toBe('function');
        expect(typeof hokuto._.i18n.dynamicLoad).toBe('function');
        expect(typeof hokuto._.i18n.get).toBe('function');
        expect(typeof hokuto._.i18n.load).toBe('function');
        expect(typeof hokuto._.i18n.parse).toBe('function');
    });
    it('hokuto._.dom is the expected', () => {
        expect(typeof hokuto._.dom.setStyle).toBe('function');
        expect(typeof hokuto._.dom.setAttrs).toBe('function');
        expect(typeof hokuto._.dom.unsetAttrs).toBe('function');
        expect(typeof hokuto._.dom.setData).toBe('function');
        expect(typeof hokuto._.dom.remove).toBe('function');
        expect(typeof hokuto._.dom.filterHtml).toBe('function');
        expect(typeof hokuto._.dom.setText).toBe('function');
        expect(typeof hokuto._.dom.setHtml).toBe('function');
    });
    it('hokuto._.events is the expected', () => {
        expect(typeof hokuto._.events._.bindErr).toBe('function');
        expect(typeof hokuto._.events.saveUnhandler).toBe('function');
        expect(typeof hokuto._.events.unhandle).toBe('function');
        expect(typeof hokuto._.events.on).toBe('function');
        expect(typeof hokuto._.events.off).toBe('function');
        expect(typeof hokuto._.events.kill).toBe('function');
        expect(typeof hokuto._.events.once).toBe('function');
        expect(typeof hokuto._.events.eventTarget).toBe('function');
        expect(typeof hokuto._.events.noEvents).toBe('function');
        expect(typeof hokuto._.events.ready).toBe('function');
    });
    it('hokuto._.utils is the expected', () => {
        expect(typeof hokuto._.utils.type.isFunction).toBe('function');
        expect(typeof hokuto._.utils.type.isObject).toBe('function');
        expect(typeof hokuto._.utils.type.isArray).toBe('function');
        
    });
    it('basic not clearing render', done => {
        render({
            config: basicConfig.config,
            clear: false
        }).then(()=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).not.toBeNull();
            done();
        });
    });
    it('basic clearing render', done => {
        render(basicConfig).then(()=>{
            expect(selector('p').innerHTML).toBe('test');
            expect(selector('[data-testid="visible"]')).toBeNull();
            done();
        });
    });
    it('basic re-render subnode', done => {
        render({
            config: {
                cb: function(){
                    this.state.n++;
                    return Promise.resolve();
                },
                state: {n:0},
                children:[{
                    tag:'p',
                    html: function(){
                        return this.state.n;
                    },
                    state: {n:1},
                    onClick:function(){
                        this.state.n++;
                        this.render();  
                    }
                }]
            },
            clear: true
        }).then(r=>{
            var p = selector('p');
            expect(p.innerHTML).toBe('1');
            expect(r.rootKnot.state.n).toBe(1);
            p.click();
            expect(p.innerHTML).toBe('2');
            expect(r.rootKnot.state.n).toBe(1);
            done();
        });
    });
});