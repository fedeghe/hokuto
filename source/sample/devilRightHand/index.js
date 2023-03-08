(function() {
    var target = document.getElementById('target'),
        config1 = {
            target,
            engy:{componentsUrl: 'devilRightHand/components'},
            state: function (){},
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
                    },
                },{
                    tag: 'div',
                    attrs:{
                        id: 'main'
                    },
                    ref: 'xxx',
                    style:{
                        display:'flex',
                        flexGrow: 1,
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        alignItems:'flex-start',
                        alignContent:'flex-start',
                        width:'100%',
                        outline:'1px dashed #fff'
                    },
                    children: Array.from({length:50}, function (){
                        return {
                            component: 'square',
                            onClick: function () {
                                config2.target = this.getNode('xxx').node;
                                hokuto.renderWithComponents(config2, true, 'xxx')
                                //.then(console.log)
                            }
                        }
                    })
                }]
            }],
            cb: function() {
                this.lateWid('xyzy')
                this.done();
            }
        },
        config2 = {
            
            engy:{componentsUrl: 'devilRightHand/components'},
            html : 'hello',
            cb: function() {
                this.lateWid('xyzxyz')
                this.done();
            }
        };

    window.onload = function() {
        hokuto.renderWithComponents(config1, true, 'xxx')
        //.then(console.log)
    };
})();