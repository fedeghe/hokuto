window.addEventListener('popstate', (e) => {
    hokuto.load({
        src: e.state.src,
        url: e.state.url,
        state: e.state.state,
        title: e.state.title,
        replace: true
    });
});
window.addEventListener('load', function(){
    var r = Object.entries(hokuto.routes).find(function ([k, route]) {
        return route.url === document.location.pathname
    })
    if (r) hokuto.load(r[0])
})