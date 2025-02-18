/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js')
    render = utils.render,
    selector = utils.selector,
    selectors = utils.selectors;

describe('start hokuto', () => {
    const one = jest.fn(),
        two = jest.fn(),
        basicConfig = {
            children:[{
                tag:'div',
                onClick: one,
                attrs:{id:'n0'},
                children:[{
                    tag: 'span',
                    attrs:{id:'n1'},
                    onClick:function(e) {
                        two();
                        e.stopPropagation();
                    }
                },{
                    tag: 'span',
                    attrs:{id:'n2'},
                    onClick:function(e) {
                        two();
                    }
                }]
            }]
        };

    afterEach(() => {
        one.mockClear()
        two.mockClear()
    });

    it('basic handler, upper', () => {
        render(basicConfig).then(r=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n0.click();
            expect(one).toBeCalled()
            expect(two).not.toBeCalled()
        });
    });

    it('basic handler, single deep', () => {
        render(basicConfig).then(r=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n1.click();
            expect(one).not.toBeCalled()
            expect(two).toBeCalled()
        });
    });

    it('basic handler, double deep', () => {
        render(basicConfig).then(r=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n2.click();
            expect(two).toBeCalled()
            expect(one).toBeCalled()
        });
    });
});