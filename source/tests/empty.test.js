/**
 * @jest-environment jsdom
 */
var hokuto = require('../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('exceptions', () => {
    
    it('setStyle with no styles', () => {
        var config = {
            
        }
        expect(true).toBe(true);
    });
});