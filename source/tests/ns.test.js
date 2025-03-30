/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto,
    render = utils.render,
    selector = utils.selector;

describe('ns - hokuto', () => {
    describe('ns - make', () => {
        it('make it simple', () => {
            var ctx = {a:1};
                o = hokuto._.ns.make('b/c/d', {a:{s:3}}, ctx);
            
            expect(o.a.s).toBe(3);
            expect(ctx.b.c.d.a.s).toBe(3);
        });
        it('make it function', () => {
            var ctx = {a:1};
                o = hokuto._.ns.make(
                    'b/c/d',
                    function (){return {a:{s:3}};},
                    ctx
                );
            
            expect(o.a.s).toBe(3);
            expect(ctx.b.c.d.a.s).toBe(3);
        });
        it('default ctx', () => {
            var o = hokuto._.ns.make(
                    'b/c/d',
                    {a:{s:3}}
                );
            
            expect(o.a.s).toBe(3);
            expect(window.b.c.d.a.s).toBe(3);
        });

        it('empty ns ', () => {
            var o = hokuto._.ns.make(
                    'b/c/d'
                );
            
            expect(o).toMatchObject({});
            expect(window.b.c.d).toMatchObject({});
        });
    });
    describe('ns - check', () => {
        it('make it simple', () => {
            var ctx = {
                a: 1
            };
                o = hokuto._.ns.check('a', ctx);
            
            expect(o).toBe(1);
        });
        it('go deeper', () => {
            var ctx = {a: { b: { c: { d: 1}}}},
                o = hokuto._.ns.check('a.b.c.d', ctx);
            
            expect(o).toBe(1);
        });
        it('no context', () => {
            window.a = {b:1};
            var o = hokuto._.ns.check('a.b');
            
            expect(o).toBe(1);
        });
        it('nothing to check', () => {
            var ctx = {a:1};
                o = hokuto._.ns.check('', ctx);
            
            expect(o).toMatchObject(ctx);
        });

        it('not there', () => {
            expect(
                hokuto._.ns.check('s.t.u', {a:1})
            ).toBeUndefined();
        });
    });
    describe('ns - extend', () => {
        it('as expected', () => {
            var ctx = {
                    a: 1
                },
                o = hokuto._.ns.extend(ctx, {a:2,b:{c:1}});
            
            expect(o.b.c).toBe(1);
            expect(o.a).toBe(1);
        });
        it('with a function', () => {
            var ctx = {
                    a: 1
                },
                o = hokuto._.ns.extend(ctx, function(){return {a:2,b:{c:1}};});
            
            expect(o.b.c).toBe(1);
            expect(o.a).toBe(1);
        });
        // it('go deeper', () => {
        //     var ctx = {a: { b: { c: { d: 1}}}},
        //         o = hokuto._.ns.check('a.b.c.d', ctx);
            
        //     expect(o).toBe(1);
        // });
        // it('nothing to check', () => {
        //     var ctx = {a:1};
        //         o = hokuto._.ns.check('', ctx);
            
        //     expect(o).toMatchObject(ctx);
        // });

        // it('not there', () => {
        //     expect(
        //         hokuto._.ns.check('s.t.u', {a:1})
        //     ).toBeUndefined();
        // });
    });
});