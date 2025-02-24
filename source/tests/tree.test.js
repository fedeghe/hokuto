/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector,
    selectors = utils.selectors;

describe('start hokuto', () => {
    const basicConfig = {
        children:[{
            tag:'ul',
            data:{id:'0'},
            children:[{
                tag:'li',
                data:{id:'1'},
                children:[
                    {tag: 'li', html:'1.1', data:{id:'1.1'}},
                    {tag: 'li', html:'1.2', data:{id:'1.2'}},
                    {tag: 'li', html:'1.3', data:{id:'1.3'}},
                ]
            }]
        }]
    };
    it('basic tree render', done => {
        render(basicConfig).then(()=>{
            expect(selector('[data-id="0"]')).not.toBeNull();
            expect(selector('[data-id="1"]')).not.toBeNull();
            expect(selector('[data-id="1.1"]')).not.toBeNull();
            expect(selector('[data-id="1.2"]')).not.toBeNull();
            expect(selector('[data-id="1.3"]')).not.toBeNull();
            expect(selector('[data-id="1.4"]')).toBeNull();
            var order = selectors('[data-id]');
            expect(order.length).toBe(5);
            expect(order[0].getAttribute('data-id')).toBe('0');
            expect(order[1].getAttribute('data-id')).toBe('1');
            expect(order[2].getAttribute('data-id')).toBe('1.1');
            expect(order[3].getAttribute('data-id')).toBe('1.2');
            expect(order[4].getAttribute('data-id')).toBe('1.3');
            done();
        });
    });
});