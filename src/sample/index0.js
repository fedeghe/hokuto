(function () {
    var target = document.getElementById('target');
    var n = 0;
    var config = {
        target: target,
        style: {
            'font-size': '123px'
        },
        children: [{
            tag: 'p',
            html: 'hello'
        }]
    };
    hokuto.render(config, true);
})();