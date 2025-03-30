/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

var utils = require('./utils.js'),
    hokuto = utils.hokuto;

describe('hokuto._.dom.style', () => {
    it('with content', () => {
        var content = 'body{color:red}',
            style = hokuto._.dom.style({
                content
            });
        expect(style.tagName).toBe('STYLE');
        expect(style.innerHTML).toBe(content);
    });
    it('with href', () => {
        var href = 'http://jmvc.org/style.css',
            style = hokuto._.dom.style({
                href
            });
        expect(style.tagName).toBe('LINK');
        expect(style.href).toBe(href);
    });
    it('throws as expected', () => {
        try {
            hokuto._.dom.style();
        } catch (e) {
            expect(e.message).toBe("Missing style params");
        }
        try {
            hokuto._.dom.style({something:1});
        } catch (e) {
            expect(e.message).toBe("Missing style params");
        }
    });
});