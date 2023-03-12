(function() {
    var target = document.getElementById('target'),
        loadSquareView = function (){
            hokuto.load('square')
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
                className: 'container',
                children: [{
                    component: 'title',
                    className: 'title',
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
                    className: 'squaresContainer',
                    children: Array.from({length:20}, function (){
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
    hokuto.renderWithComponents(config, true, 'xxx')
})();