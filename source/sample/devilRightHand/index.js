(function() {
    var viewPath = './devilRightHand/components/views',
        target = document.getElementById('target'),
        config1 = {
            target,
            engy:{componentsUrl: 'devilRightHand/components'},
            state: function (){},
            lang: {
                ciccio: 'chubby'
            },
            data: {
                nums: []
            },
            
            children: [{
                tag: 'link',
                attrs: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "./devilRightHand/style.css"
                },
            },{
                style:{
                    display:'flex',
                    flexDirection:'column',
                    height:'100vh'
                },
                children: [{
                    component: 'title',
                    style:{display:'flex', alignSelf:'center'},
                    params: {
                        text: 'Devil\'s right hand'
                        // text: 'i18n(ciao|xxx)'
                    },
                },{
                    tag: 'div',
                    attrs:{
                        id: 'main'
                    },
                    ref: 'xxx',
                    className: 'container',
                    children: Array.from({length:50}, function (){
                        return {
                            component: 'square',
                            onClick: function () {
                                
                                hokuto.load(viewPath + '/xxx.js')
                                // hokuto.i18n.load({ciao:'halo'})
                                // config2.target = this.getNode('xxx').node;
                                // hokuto.renderWithComponents(config2, true, 'xxx')
                                
                            }
                        }
                    })
                }]
            }],
            cb: function() {
                this.lateWid('xyzy')
                this.done();
            }
        };
    window.load(function() {
        hokuto.i18n.load({ciao:'hello'})
        hokuto.renderWithComponents(config1, true, 'xxx')
    });
})();