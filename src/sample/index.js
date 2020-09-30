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
            method_renderDelayedNumber : function (node, text, secs) {
                setTimeout(function () {
                    hokuto.render({
                        target: node,
                        tag: 'li',
                        text: text,
                    })
                }, secs)
            },
            cb: function () {
                var self = this,
                    node = self.node;
                setTimeout(function () {
                    self.renderDelayedNumber(node, 'three', 500)
                    self.renderDelayedNumber(node, 'two', 1000)
                    self.renderDelayedNumber(node, 'one', 1500)
                    self.renderDelayedNumber(node, 'woops!... there is zero!', 2000)
                }, 3000)
                self.done();
            }
        }]
    };
    hokuto.render(config);
})();