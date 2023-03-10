import { H } from './core'
const handlers = [],
    spread = (url, state, title) => 
        handlers.forEach(
            handler=> handler(url, state, title)
        );

export default {
    push: (url, state, title) => {
        H.pushState(state || {}, title || '', url);
        spread(url, state, title);
    },
    registerHandler: f => handlers.push(f),
    replace: (url, state, title) => {
        H.replaceState(state || {}, title || '', url);
        spread(url, state, title);
    },
    back: () => {
        H.back()
    },
    resetHandlers: () => {
        handlers = [];
    },
    state: () => H.state 
    //
};