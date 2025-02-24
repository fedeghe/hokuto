

Hok.history = (function(){
    var handlers = [],
        spread = function(url, state, title) {
            document.title = title;
            return handlers.forEach(
                function(handler){
                    handler(url, state, title);
                }
            );
        };
    return {
        push: function(url, state, title) {
            Hok.H.pushState(state || {}, title || '', url);
            spread(url, state, title);
        },
        registerHandler: function(f) {return handlers.push(f);}, 







        
        replace: function(url, state, title) {
            Hok.H.replaceState(state || {}, title || '', url);
            spread(url, state, title);
        },
        back: function() {
            Hok.H.back();
        },
        resetHandlers: function(){
            handlers = [];
        },
        state: function() { return Hok.H.state; }
    };
})();