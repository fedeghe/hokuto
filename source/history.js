import { H } from './core'
const handlers = [],
    spread = function(url, state, title) {
        handlers.forEach(function(handler) {
            handler(url, state, title);
        });
    };
export default {
    push: function(url, state, title) {
        H.pushState(state || {}, title || '', url);
        spread(url, state, title);
    },
    registerHandler: function(f) {
        handlers.push(f);
    },
    replace: function(url, state, title) {
        H.replaceState(state || {}, title || '', url);
        spread(url, state, title);
    },
    resetHandlers: function() {
        handlers = [];
    },
    state: function() {
        return H.state;
    }
};