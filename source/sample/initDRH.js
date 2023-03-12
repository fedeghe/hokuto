(function () {
    const basePath = './devilRightHand',
        routes = {
            home: {
                src: basePath + '/index.js',
                url: '/',
                state: {},
                title: 'Homie'
            },
            square: {
                src: basePath + '/components/views/xxx.js',
                url: '/xxx',
                state: {},
                title: 'square details'
            }
        };

    function onReady(fn) {
        document.readyState === "complete"
            ? fn()
            : window.addEventListener('load', fn);
    }
    onReady(function () {
        hokuto.routes = routes;
    });
})();