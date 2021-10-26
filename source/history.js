import { H } from './core'
const handlers = [],
    spread = (url, state, title) => 
        handlers.forEach(function(handler) {
            handler(url, state, title);
        });

export default {
    push: (url, state, title) => {
        H.pushState(state || {}, title || '', url);
        spread(url, state, title);
    },
    registerHandler: f => {
        handlers.push(f);
    },
    replace: (url, state, title) => {
        H.replaceState(state || {}, title || '', url);
        spread(url, state, title);
    },
    resetHandlers: () => {
        handlers = [];
    },
    state: () => H.state
};