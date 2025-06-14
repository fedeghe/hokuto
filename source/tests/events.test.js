/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto,
    render = utils.render,
    selector = utils.selector;

describe('events - hokuto', () => {
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

    it('kills the event as expected', done => {
        var x = jest.fn();
        render({
            config: {
                onClick: one,
                children:[{
                    ref:'x',
                    onClick: e => {
                        x();
                        return hokuto._.events.kill(e);
                    },
                    html: 'test'
                }]
            }
        }).then(r=>{
            r.getByRef('x').node.click();
            expect(x).toBeCalled();
            expect(one).not.toBeCalled();
            done();
        });
    });
    it('kills the event as expected through the global', done => {
        var x = jest.fn();
        render({
            config: {
                onClick: one,
                children:[{
                    ref:'x',
                    onClick: () => {
                        x();
                        return hokuto._.events.kill();//no event passed here
                    },
                    html: 'test'
                }]
            }
        }).then(r=>{
            r.getByRef('x').node.click();
            expect(x).toBeCalled();
            expect(one).not.toBeCalled();
            done();
        });
    });
    it('once the event as expected', done => {
        render({
            config: {
                onceClick: one,
                html: 'test'
            }
        }).then(r=>{
            r.node.click();
            expect(one).toHaveBeenCalledTimes(1);
            r.node.click();
            expect(one).toHaveBeenCalledTimes(1);
            done();
        });
    });
});

describe('raw events - hokuto', () => {
    const one = jest.fn(),
        two = jest.fn(),
        getBasicConfig = () =>({
            config: {
                children:[{
                    tag:'div',
                    ref:'ref',
                    onClick: one,
                    attrs:{id:'n0'},
                    children:[{
                        tag: 'span',
                        attrs:{id:'n1'},
                        onMouseover: one,
                        onClick: two
                    }]
                }]
            },
            clear: true
        });

    afterEach(() => {
        one.mockClear();
        two.mockClear();
    });

    it('raw unhandle', () => {
        render(getBasicConfig()).then(r=>{
            var node = r.getByRef('ref').node;
            hokuto._.events.unhandle(node);
            node.click();
            expect(two).not.toBeCalled();
        });
    });

    describe('raw eventTarget', () => {
        it('with event passed', done => {
            var cnf = getBasicConfig();
            cnf.config.children[0].onClick = e => {
                var trg = hokuto._.events.eventTarget(e);
                expect(trg.id).toBe('n0');
                done();
            };
            render(cnf).then(r => {
                var node = r.getByRef('ref').node;
                node.click();
            });
        });

        it('without event passed', done => {
            var cnf = getBasicConfig();
            cnf.config.children[0].onClick = () => {
                var trg = hokuto._.events.eventTarget();
                expect(trg.id).toBe('n0');
                done();
            };
            render(cnf).then(r => {
                var node = r.getByRef('ref').node;
                node.click();
            });
        });
        it('no target', () => {
            var trg = hokuto._.events.eventTarget();
            expect(trg).toBeFalsy();
        });
        it('on text node', done => {
            var cnf = {
                config:{
                    tag:'span',
                    text: 'hello',
                    id:'n0',
                    ref:'ref',
                    onClick:  () => {
                        var trg = hokuto._.events.eventTarget();
                        expect(trg.id).toBe('n0');
                        done();
                    }
                },
                clear: true
            };
            
            render(cnf).then(r => {
                var node = r.getByRef('ref').node;
                node.click();
            });
        });
    });
    describe('raw ready', () => {
        it('with event passed', done => {
            var cnf = getBasicConfig();
            hokuto._.events.ready(() => {
                render(cnf).then(() => {
                    hokuto._.events.ready(() => done());
                });
            });
        });
    });

});

