/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto,
    render = utils.render,
    selector = utils.selector,
    selectors = utils.selectors;

describe('dom - hokuto', () => {
    describe('setStyle', () => {
        it('basic', () => {
            var n = {style:{}};
            hokuto._.dom.setStyle(n, {aaa:2});
            expect(n.style.aaa).toBe(2);
        });

        it('exception', () => {
            var n = {style:{}};
            hokuto._.dom.setStyle(n, {float:2});
            expect(n.style.cssFloat).toBe(2);
        });

        it('error', () => {
            var n = {style:{}};
            try{
                hokuto._.dom.setStyle(n);
            } catch(e) {
                expect(e.message).toBe('ERR: styles needed');
            }
        });
    });
    describe('setAttrs', () => {
        var n = {
            setAttribute:function(n,v){
                this[n] = v;
            }
        };
        it('basic', () => {
            
            hokuto._.dom.setAttrs(n, {aaa:2});
            expect(n.aaa).toBe(2);
        });


        it('error', () => {
            try{
                hokuto._.dom.setAttrs(n);
            } catch(e) {
                expect(e.message).toBe('ERR: attrs needed');
            }
        });
    });
    describe('unsetAttrs', () => {
        var n = {
            removeAttribute:function(n){
                delete this[n];
            },
            a: 1,
            b: 2
        };
        it('basic', () => {
            
            hokuto._.dom.unsetAttrs(n, ['a']);
            expect(n.a).toBeUndefined();
            expect(n.b).toBe(2);
        });


        it('error', () => {
            try{
                hokuto._.dom.unsetAttrs(n);
            } catch(e) {
                expect(e.message).toBe('ERR: attrs needed');
            }
        });
    });

    describe('setData', () => {
        var n = {
            dataset: {}
        };
        it('basic', () => {
            hokuto._.dom.setData(n, {a:1, b:2});
            expect(n.dataset.a).toBe(1);
            expect(n.dataset.b).toBe(2);
        });


        it('error', () => {
            try{
                hokuto._.dom.setData(n);
            } catch(e) {
                expect(e.message).toBe('ERR: data needed');
            }
        });
    });

    describe('unsetData', () => {
        var n = {
            dataset: {a:1,b:2}
        };
        it('basic', () => {
            expect(n.dataset.a).toBe(1);
            expect(n.dataset.b).toBe(2);
            hokuto._.dom.unsetData(n, ['a','b']);
            expect(n.dataset.a).toBeUndefined();
            expect(n.dataset.b).toBeUndefined();
        });


        it('error', () => {
            try{
                hokuto._.dom.unsetData(n);
            } catch(e) {
                expect(e.message).toBe('ERR: data needed');
            }
        });
    });
    describe('remove', () => {
        
        it('basic', done => {
            render({
                config: {
                    children:[{
                        tag:'p',
                        html: 'aaa',
                    },{
                        tag:'p',
                        html: 'bbb',
                        ref:'bbb'
                    }]
                }
            }).then(r=>{
                var p = r.getByRef('bbb');
                hokuto._.dom.remove(p.node);
                var ps = selectors('p');
                expect(ps.length).toBe(1);
                done();
            });
        });
    });
});