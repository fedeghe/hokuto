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
                return ~~(10 * Math.random())
            },
            
            children: [{
                tag: 'table',
                data: {
                    rows: 100,
                    cols: 7
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
                                            width:'20px',
                                            height:'20px',
                                            textAlign: 'center',
                                            fontSize:'18px'
                                        },
                                        html: self.rootNode.rnd(),
                                        
                                        cb: function () {
                                            // console.log('td', this)
                                            // perfMonitor.startProfile('a');
                                            var self = this;
                                            self.done();
                                            clearTimeout(self.data.to);
                                            self.data.to = setTimeout(function () {
                                                
                                                self.setHtml(self.rootNode.rnd());
                                                // self.node.style.backgroundColor = self.rootNode.rndColor2();
                                                self.setStyle({
                                                    // backgroundColor: self.rootNode.rndRGB(),
                                                    color: self.rootNode.rndRGB()
                                                });
                                                self.render();
                                            }, 0);
                                            // }, 100 + ~~(Math.random()*500));
                                            // perfMonitor.endProfile('a');
                                        }
                                        
                                    }
                                })          
                            }
                        }
                    })
                }
            }]
        };
    hokuto.render(config)
    
})();