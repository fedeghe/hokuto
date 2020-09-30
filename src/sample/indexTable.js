(function () {
    var target = document.getElementById('target'),
        config = {
            target: target,
            method_rndColor: function () {
                return '#' + [0,1,2,3,4,5,6,7].sort(function (a,b) {
                    return Math.random() > 0.5 ? 1 : -1;
                }).slice(0,6).join('');
            },
            method_rndColor2: function () {
                return [
                    'red', 'green', 'blue'
                ][Math.floor(Math.random() * 3)]
            },
            
            method_rndGreen: function () {
                return '#00' + [0,1,2,3,4,5].sort(function (a,b) {
                    return Math.random() > 0.5 ? 1 : -1;
                }).slice(0,2).join('')+'00';
            },
            
            children: [{
                tag: 'table',
                style: {
                    width:'100%'
                },
                data: {
                    rows: 50,
                    cols: 50
                },
                children: function () {
                    // console.log('table ctx', this);
                    return new Array(this.data.rows).fill().map(function (_, i) {
                        return {
                            tag: 'tr',
                            children: function () {
                                // console.log('tr ctx', this);
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
                                        // html: '[' + i + ', '+ j + ']',
                                        cb: function () {
                                            // perfMonitor.startProfile('a');
                                            var self = this;
                                            clearTimeout(self.data.to);
                                            self.data.to = setTimeout(function () {
                                                self.config.html = ~~(10 * Math.random());
                                                // self.node.style.backgroundColor = self.rootNode.rndColor2();
                                                self.render();
                                            }, 100);
                                            // }, 100 + ~~(Math.random()*500));
                                            self.done();
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