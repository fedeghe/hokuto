/**
 * @jest-environment jsdom
 */
var hokuto = require('../dist/index.js');

describe('basic okutotwo', () => {
    it('contains the expected', () => {
        expect(typeof hokuto.render).toBe('function');
        expect(typeof hokuto.get).toBe('function');
    });
    it('basic not clearing render', done => {
        // document.body.innerHTML = `
        //     <div id="target">
        //         <div data-testid="visible">loading</div>
        //     </div>
        // `;
        hokuto.render({
            target: document.getElementById('target'),
            children:[{
                tag:'p',
                html:'test'
            }]
        }).then(r=>{
            expect(document.body.innerHTML).toMatchSnapshot()
            expect(document.querySelector('p').innerHTML).toBe('test');
            expect(document.querySelector('[data-testid="visible"]')).not.toBeNull()
            done();
        });
    });
    it('basic clearing render', done => {
        // document.body.innerHTML = `
        //     <div id="target">
        //         <div data-testid="visible">loading</div>
        //     </div>
        // `;
        hokuto.render({
            target: document.getElementById('target'),
            children:[{
                tag:'p',
                html:'test'
            }]
        },true).then(r=>{
            expect(document.body.innerHTML).toMatchSnapshot()
            expect(document.querySelector('p').innerHTML).toBe('test');
            expect(document.querySelector('[data-testid="visible"]')).toBeNull()
            done();
        });
    });

    
});