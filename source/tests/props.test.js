/**
 * @jest-environment jsdom
 */
// eslint-disable-next-line no-unused-vars
var hokuto = require('../../dist/index.js'),
    utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector;

describe('all props', () => {
    const basicConfig = {
            config: {
                children:[{
                    tag:'p',
                    html:'test'
                }]
            }
        },
        originalHtml = document.body.innerHTML,
        documentClear = () => {
            document.body.innerHTML = originalHtml;
        },
        cb = jest.fn(()=>Promise.resolve()),
        cbResolving = jest.fn(()=>Promise.resolve()),
        cbRejecting = jest.fn(() =>Promise.reject()),
        initTrue = jest.fn(() => Promise.resolve()),
        initFalse = jest.fn(() => Promise.reject()),
        insideEnder = jest.fn(),
        ender = jest.fn(() => insideEnder);
    afterEach(() => {
        cb.mockClear();
        documentClear();
    });
    
    it('cb expected', () => {
        render({
            config:{
                ...basicConfig.config,
                cb
            }
        }).then(() => expect(cb).toBeCalled());
    });

    it('cb resolving', done => {
        render({
            config: {
                ...basicConfig.config,
                cb: cbResolving
            }
        }).then(() => {
            expect(cbResolving).toBeCalled();
            expect(selector('p').innerHTML).toBe('test');
            done();
        });
    });

    it('cb rejecting', done => {
        render({
            config: {
                ...basicConfig.config,
                cb: cbRejecting
            }
        }).then(() => {
            expect(cbRejecting).toBeCalled();
            expect(selector('p')).toBeNull();
            done();
        });
    });

    it('initCheck truthy expected', done => {
        render({
            config:{
                ...basicConfig.config,
                initCheck: initTrue
            }
        }).then(() => {
            expect(selector('p').innerHTML).toBe('test');
            expect(initTrue).toBeCalled();
            done();
        });
    });

    it('initCheck falsy expected', done => {
        render({
            config: {
                ...basicConfig.config,
                initCheck: initFalse
            }
        }).then(()=>{
            expect(selector('p')).toBeNull();
            expect(initFalse).toBeCalled();
            done();
        });
    });
    
    it('abort expected', () => {
        render({
            config: {
                ...basicConfig.config,
                abort: cbRejecting
            },
            clear: true
        }).then(() => {
            expect(selector('div[data-testid="visible"]').innerHTML).toBe('loading');
        });
    });

    it('state settter expected', () => {
        render({
            config: {
                ...basicConfig.config,
                state: {
                    s:'test string',
                    n: 4
                }
            }
        }).then(r => 
            expect(r.state).toMatchObject({
                s:'test string',
                n: 4
            })
        );
    });

    it('ref setter expected', done => {
        render({
            config: {
                children:[{
                    tag:'p',
                    ref: 'one',
                    html:'testOne'
                },{
                    tag:'p',
                    ref: 'two',
                    html:'testTwo'
                }]
            }
        }).then(r=>{
            var one = r.getByRef('one'),
                two = r.getByRef('two');
            expect(one.node.innerHTML).toBe('testOne');
            expect(two.node.innerHTML).toBe('testTwo');
            done();
        });
    });

    it('text setter expected', done => {
        render({
            config: {
                children:[{
                    tag:'p',
                    id:'u1',
                    text:'testOne'
                },{
                    tag:'p',
                    id:'u2',
                    text:'testTwo'
                }]
            },
            clear: true
        }).then(() => {
            var n = selector('#u1');
            // https://stackoverflow.com/questions/47902335/innertext-is-undefined-in-jest-test
            expect(n.textContent).toBe('testOne');         
            done();
        });
    });

    it('style setter expected', done => {
        render({
            config: {
                children:[{
                    tag:'p',
                    id:'u1',
                    html:'testOne',
                    style:{
                        color:'red',
                        backgroundColor:'blue'
                    }
                }]
            }
        }).then(() => {
            var n = selector('#u1');
            expect(n.innerHTML).toBe('testOne');         
            expect(n.style.color).toBe('red');         
            expect(n.style.backgroundColor).toBe('blue');         
            done();
        });
    });
    it('attrs setter expected', done => {
        render({
            config:{
                children:[{
                    tag:'input',
                    id:'u1',
                    attrs:{
                        title:'just a title',
                        type:'range',
                        value: 35,
                        min: -100,
                        max: 100,
                        step: 5
                    }
                }]
            }
        }).then(() => {
            var n = selector('#u1');
            expect(n.title).toBe('just a title');
            expect(n.type).toBe('range');
            expect(n.value).toBe('35');
            expect(n.min).toBe('-100');
            expect(n.max).toBe('100');
            expect(n.step).toBe('5');
            done();
        });
    });

    it('className setter expected', done => {
        render({
            config:{
                children:[{
                    tag:'input',
                    ref:'u1',
                    className:'a,b,c'
                }]
            }
        }).then(r => {
            var n = r.getByRef('u1').node;
            expect(n.classList.contains('a')).toBe(true);
            expect(n.classList.contains('b')).toBe(true);
            expect(n.classList.contains('c')).toBe(true);
            expect(n.classList.contains('d')).toBe(false);
            done();
        });
    });

    it('ender expected', done => {
        render({
            config: {
                ...basicConfig.config,
                end: ender
            }
        }).then(r => {
            expect(selector('p').innerHTML).toBe('test');
            expect(ender).toBeCalled();
            expect(insideEnder).not.toBeCalled();
            r.clear();
            expect(insideEnder).toBeCalled();
            done();
        });
    });

});