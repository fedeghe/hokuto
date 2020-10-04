(function () {
    var target = document.getElementById('target'),
        config = {
            target: target,
            method_rndColor: function () {
                return '#' + [0,1,2,3,4,5,6,7].sort(function (a,b) {
                    return Math.random() > 0.5 ? 1 : -1;
                }).slice(0,6).join('');
            },
            method_rndRGB: function () {
                return [
                    'red', 'green', 'blue'
                ][Math.floor(Math.random() * 3)]
            },
            method_rnd: function () {
                return 1e3*Math.random().toFixed(3)
            },
            
            children: [{
                tag: 'table',
                ref: 'tab1',
                data: {
                    rows: 3, // 100,
                    cols: 3  // 7
                },
                children: function () {
                    // console.log('table ctx', this);
                    
                    return new Array(this.data.rows).fill().map(function (_, i) {
                        return {
                            tag: 'tr',
                            children: function () {
                                // console.log('tr ctx', this);
                                var self = this
                                return new Array(this.parentNode.data.cols).fill().map(function (_, j) {
                                    return {
                                        tag: 'td',
                                        style:{
                                            minWidth:'20px',
                                            width:'60px',
                                            height:'20px',
                                            textAlign: 'center',
                                            fontSize:'18px'
                                        },
                                        html: self.rootNode.rnd(),
                                        // onMouseover: function () {
                                        //     var self = this;
                                        //     // debugger;
                                        //     // console.log(this.node.innerHTML)
                                        //     self.setStyle({
                                        //         backgroundColor: 'gray',
                                        //     });
                                        // },
                                        // onMouseout: function () {
                                        //     this.setStyle({
                                        //         backgroundColor: 'black',
                                        //     });
                                        // },
                                        onClick: function (e) {
                                            var self = this;
                                            // debugger;
                                            // console.log(this.node.innerHTML)
                                            self.setHtml(self.rootNode.rnd());
                                            self.setStyle({
                                                backgroundColor: self.rootNode.rndColor(),
                                                color: self.rootNode.rndRGB()
                                            });
                                            this.killEvent(e);
                                            var table = self.getNode('tab1')
                                            // console.log(table)
                                            table.setStyle({
                                                backgroundColor: self.rootNode.rndColor()
                                            })
                                            // this.render();
                                        },
                                        cb: function () {
                                            var self = this;
                                            self.done();

                                            // var id = requestAnimationFrame(function () {
                                            //     self.setHtml(self.rootNode.rnd());
                                            //     self.setStyle({
                                            //         backgroundColor: self.rootNode.rndColor(),
                                            //         color: self.rootNode.rndRGB()
                                            //     });
                                            //     cancelAnimationFrame(id)
                                            //     self.render();
                                            // });

                                            // setTimeout(function () {
                                                
                                            //     self.setHtml(self.rootNode.rnd());
                                            //     // self.node.style.backgroundColor = self.rootNode.rndColor2();
                                            //     self.setStyle({
                                            //         backgroundColor: self.rootNode.rndColor(),
                                            //         color: self.rootNode.rndRGB()
                                            //     });
                                            //     self.render();
                                            // }, 15)
                                        }
                                    }
                                })          
                            }
                        }
                    })
                }
            }]
        };
    hokuto.render(config).then(function (t) {
        console.log(t)
    })
    
})();