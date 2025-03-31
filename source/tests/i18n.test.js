/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto,
    render = utils.render,
    selector = utils.selector;

describe('i18n - hokuto', () => {
    beforeEach(() => {
        hokuto._.i18n.switchLang('en');
    });
    it('switchLang', () => {
        expect(hokuto._.i18n.lang).toBe('en');
        hokuto._.i18n.switchLang('it');
        expect(hokuto._.i18n.lang).toBe('it');
    });

    // it('check', () => {
    //     expect(hokuto._.i18n.check('aaa')).toBeFalsy();
    //     expect(hokuto._.i18n.check('i18n(ciccio)')).toBeTruthy();
    //     expect(hokuto._.i18n.check('i18n(ciccio|xxx)')).toBeTruthy();
    //     expect(hokuto._.i18n.check('i18n(ciccio|xxx.yyy)')).toBeTruthy(); 
    // });

    // it('dynamicLoad', () => {
    //     expect(hokuto._.i18n.lang).toBe('en');
    //     hokuto._.i18n.dynamicLoad({
    //         leccaculo: {
    //             en: 'brown nose'
    //         }
    //     });
    //     var getIt = hokuto._.i18n.get('leccaculo');
    //     expect(getIt).toBe('brown nose');
    //     hokuto._.i18n.switchLang('it');
    //     hokuto._.i18n.dynamicLoad({
    //         leccaculo: {
    //             it: 'leccaculo'
    //         }
    //     });
    //     var getIt2 = hokuto._.i18n.get('leccaculo');
    //     expect(getIt2).toBe('leccaculo');
    // });

    it('get', () => {
        expect(hokuto._.i18n.lang).toBe('en');
        hokuto._.i18n.load({
            hello: {
                s: 'ciao'
            }
        });
        // var getTrans = hokuto._.i18n.get('hello');
        // expect(getTrans).toBe('hello');
        hokuto._.i18n.switchLang('it');
        var getTrans = hokuto._.i18n.get('hello.s');
        expect(getTrans).toBe('ciao');
        
    });
    it('parse', () => {
        expect(hokuto._.i18n.lang).toBe('en');
        hokuto._.i18n.load({
            hello: {
                s: 'ciao'
            },
            world: 'mondo'
        });
        // var getTrans = hokuto._.i18n.get('hello');
        // expect(getTrans).toBe('hello');
        var o  = {
            config:{
                html: 'i18n(hello.s)',
                children:[{
                    html: 'i18n(world)'
                },{
                    html: 'i18n(none)'
                }]
            }
        };
        hokuto._.i18n.parse(o);
        
        expect(o.config.html).toBe('ciao');
        expect(o.config.children[0].html).toBe('mondo');
        expect(o.config.children[1].html).toBe('none<sup>&#2417;</sup>');
        
    });
});