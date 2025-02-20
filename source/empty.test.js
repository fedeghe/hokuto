/**
 * @jest-environment jsdom
 */
var hokuto = require('../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('basic hokuto', () => {
    
    it('fake', () => {
        expect(true).toBe(true);
    });
});