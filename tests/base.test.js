/**
 * @jest-environment jsdom
 */
var hokuto = require('../dist/index.js');

describe('basic okutotwo', () => {
    it('contains the expected', () => {
        expect(typeof hokuto.render).toBe('function');
        expect(typeof hokuto.get).toBe('function');
    });
    it('basic render', done => {
        document.body.innerHTML = `
            <div id="target">
                <div data-testid="visible">Visible Example</div>
            </div>
        `;
        hokuto.render({
            target: document.getElementById('target'),
            children:[{
                tag:'p',
                html:'test'
            }]
        }).then(r=>{
            expect(document.querySelector('p').innerHTML).toBe('test');
            done();
        });
    });

    
});