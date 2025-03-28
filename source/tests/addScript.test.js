/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

var utils = require('./utils.js'),
    hokuto = utils.hokuto;
describe('hokuto._.dom.script', () => {
    it('with content', () => {
        var content = 'alert("hello");',
            script = hokuto._.dom.script({
                content
            });
        expect(script.tagName).toBe('SCRIPT');
        expect(script.innerHTML).toBe(content);
    });

    it('with href', () => {
        var src = 'http://jmvc.org/index.js',
            script = hokuto._.dom.script({
                src,
                attrs:{
                    defer: true}
            });
        expect(script.tagName).toBe('SCRIPT');
        expect(script.src).toBe(src);
    });

    it('autovanish', () => {
        var src = 'http://jmvc.org/index.js',
            attrs = {
                defer: 'defer',
                async: 'async',
                integrity:'xxx-yyy-zzz',
                crossorigin: 'anonymous',
                nomodule: "true",
                referrerpolicy: 'no-referrer',
                type: 'text/javascript'
            },
            script = hokuto._.dom.script({
                src,
                attrs,
            }, true),
            parent = document.createElement('div'),
            spy = jest.spyOn(parent, 'removeChild');
        parent.appendChild(script);
        
        expect(typeof script.onload).toBe('function');
        expect(script.tagName).toBe('SCRIPT');
        Object.entries(attrs).forEach(([k,v]) => {
            expect(script.getAttribute(k)).toBe(v);
        });
        expect(script.src).toBe(src);
        script.onload();
        expect(spy).toHaveBeenCalledWith(script);
    });
});