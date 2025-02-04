/**
 * @jest-environment jsdom
 */
import  '../dist/index.js'
describe('hokuto exposes the expected', () => {
    it('functions', () => {
        const { render, renderWithComponents } = hokuto;
        expect(typeof render).toBe('function');
        expect(typeof renderWithComponents).toBe('function');
    });
    it('objects', () => {
        const { i18n } = hokuto;
        expect(typeof i18n).toBe('object');
    });
    describe('sub-objects', () => {
        it('i18n', () => {
            const { lang } = hokuto.i18n;
            console.log(hokuto.i18n)
            expect(typeof lang).toBe('string');
        });
    });

});
