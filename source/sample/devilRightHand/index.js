(function() {
    var viewPath = './devilRightHand/components/views',
        target = document.getElementById('target'),
        loadSquareView = function (){
            hokuto.load(viewPath + '/xxx.js', '/xxx',{}, 'details')

            // hokuto.history.push('/xxx', {}, 'square')

        },
        config = {
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
                    children: Array.from({length:10}, function (){
                        return {
                            component: 'square',
                            onClick: loadSquareView
                        }
                    }),
                    // children: function (){
                    //     return Array.from({length:10}, function (){
                    //         return {
                    //             component: 'square',
                    //             onClick: loadSquareView
                    //         }
                    //     })
                    // },
                    
                }]
            }],
            cb: function() {
                this.lateWid('xyzy')
                this.done();
            }
        };

    // function render() {
    //     hokuto.i18n.load({ciao:'hello'})
        hokuto.renderWithComponents(config, true, 'xxx')
    // }

    
    
})();