(function() {
    var target = document.getElementById('target');
    var n = 0;
    var config = {
        target: target,
        style: {
            'font-size': '2em',
            padding: '50px'
        },

        onClick: function(e) {
            console.log('ciccio', this.getNode('ciccio'))
            console.log('on parent', this, this.node, e)
            console.log('elements', this.getElement('xxx'))
        },
        end: function() {
            console.log(this, +new Date);
        },
        children: [{
            id: 'ciccio',
            tag: 'p',
            html: 'hello',
            end: function() {
                console.log(this, +new Date)
            },
            method_say: function(a) {
                console.log(a, this)
            },
            // init: function() {
            //     return true;
            // },
            skip: function (){
                console.log('skip:', this);
                var m2 = new Date().getSeconds()%2;
                return m2;
            },
            onClick: function(e) {

                // console.log(hokuto)
                this.say('HI')
                e.stopPropagation();
                console.log('on child', this, this.node, e)
                    // this.unhandle()// itself
                    // this.unhandle(this.parentNode.node) // its parent
            },
            // init: function () {
            //     console.log('init') 
            // },
            cb: function() {
                this.done()
            }
        }, {
            tag: 'ul',
            children: [{
                tag: 'li',
                html: 'one',
                cb: function() {
                    var self = this
                        // setTimeout(function () {
                    self.done(1)
                        // },3000)
                },
                // init: function (){
                //     return true;
                // }
            }, {
                tag: 'li',
                html: 'two',
                cb: function() {
                    this.done(2)
                }
            }, {
                tag: 'li',
                html: 'three',
                cb: function() {
                    this.done(3)
                }
            }],
            cb: function() {
                console.log('ul arguments', arguments)
                this.done([].slice.call(arguments, 0))
            }
        },{
            tag:'input',
            attrs:function () {
                console.log(this);
                return {type:'range'};
            }
        }],
        cb: function() {
            console.log('root arguments', arguments)
            console.log('render', +new Date)
            this.done()
            console.log(this.report())
        }
    };
    var config2 = {
        target: target,
        component: 'h2',
        params: {
            html: '<i>hello</i>'
        }
    }
    window.onload = function() {
        var t
        hokuto.renderWithComponents(config2, true, 'xxx').then(r => {
            console.log({r});
            setTimeout(function (){
                hokuto.clear(r[0]);
            },3000)
        });
    }
})();       