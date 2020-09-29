(function () {
    var target = document.getElementById('target');
    var n = 0;
    var config = {
        target: target,
        styles: {
            'font-size': '23px'
        },
        children: [{
            tag: 'p',
            data: {
                name: 'fede'
            },
            children: [{
                tag: 'span',
                html: "maltaV('PACKAGE.name') &hearts;",
                style: {
                    paddingRight:'5px'
                }
            }, {
                tag: 'span',
                text: 'me',
                cb: function () {
                    var self = this;
                    this.config.text = 'You ' + ++n;
                    this.done();
                    setTimeout(function () {
                        self.render();
                    }, 100);
                }
            }],
            cb: function () {
                console.log(+new Date)
                this.done();
            }
        }, {
            tag: 'ul',
            cb: function () {
                var self = this,
                    node = self.node,
                    renderDelayedNumber = function (text, secs) {
                        setTimeout(function () {
                            hokuto.render({
                                target: node,
                                tag: 'li',
                                text: text,
                                cb: function () {
                                    this.done()
                                }
                            })
                        }, secs)
                    }
                setTimeout(function () {
                    renderDelayedNumber('three', 500)
                    renderDelayedNumber('two', 1000)
                    renderDelayedNumber('one', 1500)
                    renderDelayedNumber('woops!... there is zero!', 2000)
                }, 3000)
                self.done();
            }
        }]
    };
    hokuto.render(config);
})();