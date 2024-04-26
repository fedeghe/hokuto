(function() {
    var basePath = './devilRightHand'
        componentsUrl = basePath + '/components',
        target = document.getElementById('target'),
        // target = document.getElementById('main'),
        config = {
            target: target,
            engy:{componentsUrl: componentsUrl},
            children:[{
                tag: 'link',
                attrs: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "./devilRightHand/style.css"
                },
            },{
                tag: 'h1',
                html : 'i18n(ciao) fede',
            },{
                tag: 'a',
                html: 'back',
                className: "backButton",
                onClick: () => hokuto.load('home')
            }],
            cb: function() {
                this.lateWid('xyzxyz')
                this.done();
            }
        };

    // function render() {
        hokuto.i18n.load({ciao:'hello'})
        hokuto.renderWithComponents(config, true, 'xxx')
    // }
    // document.readyState === "complete"
    //     ? render()
    //     : window.addEventListener('load', render);
    
    
})();