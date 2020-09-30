(function () {
    var target = document.getElementById('target'),
        config = {
            target: target,
            method_rndColor: function () {
                return '#' + [0,1,2,3,4,5].sort(function (a,b) {
                    return Math.random() > 0.5 ? 1 : -1;
                }).slice(0,6).join('');
            },
            children: [{
                tag: 'table',
                children: function () {
                    console.log('table ctx', this);
                    return new Array(10).fill().map(function (_, i) {
                        return {
                            tag: 'tr',
                            children: function () {
                                console.log('tr ctx', this);
                                return new Array(10).fill().map(function (_, j) {
                                    return {
                                        tag: 'td',
                                        style:{
                                            width:'20px',
                                            textAlign: 'center',
                                            fontSize:'12px'
                                        },
                                        html: '[' + i + ', '+ j + ']',
                                        cb: function () {
                                            var self = this;
                                            clearTimeout(self.data.to);
                                            self.data.to = setTimeout(function () {
                                                self.config.html = ~~(10 * Math.random());
                                                self.node.style.backgroundColor = self.rootNode.rndColor();
                                                self.render();
                                            }, ~~(Math.random()*500));
                                            self.done();
                                        }
                                    }
                                })          
                            }
                        }
                    })
                }
            }]
        };
    hokuto.render(config);
})();