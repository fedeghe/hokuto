/* eslint-disable no-unused-vars */
/**
 * @jest-environment jsdom
 */

var utils = require('./utils.js'),
    render = utils.render,
    selector = utils.selector,
    selectors = utils.selectors;

describe('components', () => {

    it('render a basic component', done => {
        var config = {
            config : {
                engy:{
                    componentsUrl: 'http://127.0.0.1:3333/components',
                },
                html: 'some content',
                children: [{
                    component: 'p',
                    params: {
                        name: 'hokuto'
                    },
                    id:'test'
                }] 
            }
        };
        render(config).then(() => {
            
            expect(selector('[id="test"]')).not.toBeNull();
            done();
            // expect(true).toBe(false);
        });
    });

    it('render a component with subcomponent', done => {
        var config = {
            config: {
                engy:{
                    componentsUrl: 'http://127.0.0.1:3333/components',
                },
                html: 'some content',
                id:'sup',
                children: [{
                    component: 'nest',
                    params: {
                        name: 'hokuto'
                    },
                    id:'sub',
                }] 
            }
        };
        render(config).then(() => {
            expect(selector('[id="sup"]')).not.toBeNull();
            expect(selector('[id="sub"]')).not.toBeNull();
            done();
        });
    });
    it('render a component with protectec subcomponent', done => {
        var config = {
            config: {
                engy:{
                    componentsUrl: 'http://127.0.0.1:3333/components',
                },
                html: 'some content',
                id:'sup',
                children: [{
                    component: 'nestProtected',
                    params: {
                        name: 'hokuto'
                    },
                    id:'sub',
                }] 
            }
        };
        render(config).then(() => {
            expect(selector('[id="sup"]')).not.toBeNull();
            expect(selector('[id="nest"]')).not.toBeNull();
            done();
        });
    });
});