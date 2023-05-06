(function() {
    var target = document.getElementById('target'),
        live = true,
        config = {
            target,
            engy:{componentsUrl: 'jsss/components'},
            method_rndColor: function() {
                return '#' + [0, 1, 2, 3, 4, 5, 6, 7].sort(function(a, b) {
                    return Math.random() > 0.5 ? 1 : -1;
                }).slice(0, 6).join('');
            },
            method_rndRGB: function() {
                return [
                    'red', 'green', 'blue'
                ][Math.floor(Math.random() * 3)]
            },
            method_rnd: function() {
                return 1e3 * Math.random().toFixed(3)
            },
            data: {
                nums: [],
                live: live
            },
            method_save: function(i, j, col) {
                console.log(i, j, col)
                console.log(this)
            },
            children: [{
                component: 'h2',
                params: {
                    html: 'Just a component'
                }
            }, {
                tag: 'table',
                ref: 'tab1',
                end: () => console.log('end table'),
                data: {
                    rows: 10, // 100,
                    cols: 20 // 7
                },
                children: function() {
                    const self = this;
                    return new Array(self.data.rows).fill().map(
                        (_, i) => ({
                            tag: 'tr',
                            children: function() {
                                var self = this
                                return new Array(self.parentNode.data.cols).fill().map(
                                    (_, j) => ({
                                        tag: 'td',
                                        style: {
                                            minWidth: '20px',
                                            width: '60px',
                                            height: '20px',
                                            textAlign: 'center',
                                            fontSize: '18px',
                                            userSelect: 'none',
                                            cursor: 'pointer'
                                        },
                                        state: () => ({
                                            tab1: self.getNode('tab1')
                                        }),
                                        html: `${i} - ${j}`,
                                        // html: self.rootNode.rnd(),
                                        onMouseover: function() {
                                            this.setStyle({
                                                backgroundColor: 'gray',
                                            });
                                        },
                                        onMouseout: function() {
                                            this.setStyle({
                                                backgroundColor: 'black',
                                                'outline': '1px dotted red'
                                            });
                                        },
                                        onClick: function(e) {
                                            // debugger
                                            var table = this.state.tab1,
                                                rootNode = this.rootNode,
                                                newColor = rootNode.rndRGB();

                                            rootNode.save(i, j, newColor);

                                            console.log(rootNode.data)

                                            this.setHtml(rootNode.rnd());
                                            this.setStyle({
                                                backgroundColor: rootNode.rndColor(),
                                                color: newColor
                                            });
                                            table.setStyle({
                                                backgroundColor: rootNode.rndColor()
                                            });
                                            this.killEvent(e);
                                        },
                                        onDblclick: () => {
                                            console.log('2 clickzzz', this)
                                                // this.render();
                                                // debugger
                                        },
                                        cb: function() {
                                            var self = this,
                                                root = this.rootNode,
                                                id = root.data.live ? requestAnimationFrame(beLive) : null;

                                            function beLive() {
                                                self.setHtml(self.rootNode.rnd());
                                                self.setStyle({
                                                    backgroundColor: self.rootNode.rndColor(),
                                                    color: self.rootNode.rndRGB()
                                                });
                                                cancelAnimationFrame(id)
                                                self.render();
                                            }
                                        
                                            self.done();
                                        }
                                    })
                                )
                            }
                        })
                    )
                }
            }],
            cb: function() {
                hokuto.channel.get('math').sub('mult', (...a) => console.log(a.reduce((ac, c) => ac*c, 1)))
                this.lateWid('xyzy')
                this.done();
            }
        };

    window.onload = function() {
        hokuto.renderWithComponents(config, true, 'xxx').then(console.log)
    };
})();