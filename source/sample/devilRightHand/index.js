
(function() {
    var target = document.getElementById('target'),
        config = {
            target,
            engy:{componentsUrl: 'devilRightHand/components'},
            state: function (){},
            data: {
                nums: []
            },
            method_save: function(i, j, col) {
                console.log(i, j, col)
                console.log(this)
            },
            
            children: [{
                tag: 'link',
                attrs: {
                    rel: "stylesheet",
                    type: "text/css",
                    href: "./devilRightHand/style.css"
                },
                cb: function (){this.done()}
            },{
                style:{
                    display:'flex',
                    flexDirection:'column',
                    height:'100vh'
                },
                children: [{
                    component: 'h2',
                    style:{display:'flex', height:'auto', alignSelf:'center'},
                    params: {
                        html: 'Devil\'s right hand'
                    },
                    cb: function (){console.log ('done'); this.done()}
                },{
                    tag: 'div',
                    style:{
                        display:'flex',
                        flexGrow: 1,
                        justifyContent: 'center',
                        alignItems:'center',
                        width:'100%',
                        outline:'1px dashed #fff'
                    },
                    html : 'hello'
                }]
            }],
            cb: function() {
                this.lateWid('xyzy')
                this.done();
            }
        };

    window.onload = function() {
        hokuto.renderWithComponents(config, true, 'xxx').then(console.log)
    };
})();