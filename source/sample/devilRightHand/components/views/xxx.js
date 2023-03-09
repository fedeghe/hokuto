(function() {
    var basePath = './devilRightHand'
        componentsUrl = basePath + '/components',
        target = document.getElementById('target'),
        config2 = {
            target: target,
            engy:{componentsUrl: componentsUrl},
            children:[{
                html : 'i18n(ciao)',
            },{
                tag: 'a',
                html: 'back',
                style:{
                    cursor: 'pointer'
                },
                onClick: function (){
                    hokuto.load(basePath + '/index.js')
                }
            }],
            cb: function() {
                this.lateWid('xyzxyz')
                this.done();
            }
        };

    window.load(function() {
        // console.log(main)
        // var target = document.getElementById('target')
        // config2.target = main
        hokuto.i18n.load({ciao:'hello'})
        hokuto.renderWithComponents(config2, true, 'xxx')
    });
    
    
})();