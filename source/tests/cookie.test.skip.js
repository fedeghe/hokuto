/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto;

describe('cookies - hokuto', () => {
    it('enabled check', () => {
        expect(hokuto._.cookie.enabled).toBe(true);
        expect(hokuto._.cookie.cookie_nocookiesaround).toBe(false);
        expect(hokuto._.cookie.initCheck()).toBe(true);
    });

    it('set as expected', () => {
        hokuto._.cookie.set('name', 'value');
        expect(hokuto._.cookie.get('name')).toBe('value');
    });

    it('del as expected', () => {
        hokuto._.cookie.set('name', 'value');
        expect(hokuto._.cookie.get('name')).toBe('value');
        hokuto._.cookie.del('name');
        expect(hokuto._.cookie.get('name')).toBe(false);
    });
    it('delall as expected', () => {
        hokuto._.cookie.set('name1', 'value1');
        hokuto._.cookie.set('name2', 'value2');
        expect(hokuto._.cookie.get('name1')).toBe('value1');
        expect(hokuto._.cookie.get('name2')).toBe('value2');
        // hokuto._.cookie.del('name1');
        // hokuto._.cookie.del('name2');
        hokuto._.cookie.delall();
        expect(hokuto._.cookie.get('name1')).toBe(false);
        expect(hokuto._.cookie.get('name2')).toBe(false);
    });
});