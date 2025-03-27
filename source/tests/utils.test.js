/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */
var utils = require('./utils.js'),
    hokuto = utils.hokuto;

describe('hokuto utils', () => {
    it('utils.isFunction', () => {
        var trg = [
            ()=>{},
            function(){},
            new Function('var t = 2;')
        ];
        trg.forEach(ƒ => 
            expect(hokuto._.utils.type.isFunction(ƒ)).toBe(true)
        );
    });
    it('utils.isDefined', () => {
        var a = undefined,
            areDefined = [
                a,
                undefined,
            ],
            areUndefined = [
                areDefined,
                window,
                utils
            ];
        areDefined.forEach(ƒ => 
            expect(hokuto._.utils.type.isDefined(ƒ)).toBe(false)
        );
        areUndefined.forEach(ƒ => 
            expect(hokuto._.utils.type.isDefined(ƒ)).toBe(true)
        );
    });

    it('utils.isObject', () => {
        var objs = [
                new Object(),
                {},
            ],
            nonObjs = [
                undefined,
                [],
                new Number(2),
                new String('aaa'),
            ];
        objs.forEach(o => 
            expect(hokuto._.utils.type.isObject(o)).toBe(true)
        );
        nonObjs.forEach(no => 
            expect(hokuto._.utils.type.isObject(no)).toBe(false)
        );
    });

    it('utils.isArray', () => {
        var arrs = [
                [1,2],
                new Array(2),
                Array.from({length:2})
            ],
            nonArrs = [
                undefined,
                {},
                new Number(2),
                new String('aaa'),
            ];
        arrs.forEach(a => 
            expect(hokuto._.utils.type.isArray(a)).toBe(true)
        );
        nonArrs.forEach(na => 
            expect(hokuto._.utils.type.isArray(na)).toBe(false)
        );
    });
});