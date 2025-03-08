/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('start hokuto', () => {
    const one = jest.fn(),
        two = jest.fn(),
        getBasicConfig = () =>({
            config: {
                children:[{
                    tag:'div',
                    ref:'clickUp',
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
                        onClick:function() {
                            two();
                        }
                    }]
                }]
            },
            clear: true
        });

    afterEach(() => {
        one.mockClear();
        two.mockClear();
    });

    it('basic handler, upper', () => {
        render(getBasicConfig()).then(()=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n0.click();
            expect(one).toBeCalled();
            expect(two).not.toBeCalled();
        });
    });

    it('basic handler, single deep', () => {
        render(getBasicConfig()).then(()=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n1.click();
            expect(one).not.toBeCalled();
            expect(two).toBeCalled();
        });
    });


    it('basic handler, double deep', () => {
        render(getBasicConfig()).then(()=>{
            var n0 = selector('[id="n0"]'),
                n1 = selector('[id="n1"]'),
                n2 = selector('[id="n2"]');
            expect(n0).not.toBeNull();
            expect(n1).not.toBeNull();
            expect(n2).not.toBeNull();
            n2.click();
            expect(two).toBeCalled();
            expect(one).toBeCalled();
        });
    });

    it('basic handler, unhandleEvents', done => {
        render({
            config:{
                onClick: one,
                html: 'test'
            }
        }).then(r=>{
            r.unhandleEvents();
            r.node.click();
            expect(one).not.toBeCalled();
            done();
        });
    });
    
    it('basic handler, unhandleEvents on clear', done => {
        render({
            config: {
                onClick: one,
                html: 'test'
            }
        }).then(r=>{
            r.clear();
            r.node.click();
            expect(one).not.toBeCalled();
            done();
        });
    });

});