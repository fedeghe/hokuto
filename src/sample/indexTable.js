(function () {
    var target = document.getElementById('target'),
        config = {
            target: target,
            children: [{
                tag: 'table',
                children: function () {
                    console.log('table child ctx', this);
                    return new Array(10).fill().map(function (_, i) {
                        return {
                            tag: 'tr',
                            children: function () {
                                console.log('tr child ctx', this);
                                return new Array(10).fill().map(function (_, j) {
                                    return {
                                        tag: 'td',
                                        html: `[${i}, ${j}]`,
                                        cb: function () {
                                            var self = this;
                                            clearTimeout(self.data.to)
                                            self.data.to  = setTimeout(function () {
                                                self.config.html = ~~(10*Math.random())
                                                self.render();
                                            }, 10)
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