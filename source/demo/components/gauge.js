function _(o){

    var getGaugeStyle = () => ({
            width: '100%',
            margin: 0,
            padding: 0,
            height: '30px',
            border: 'none',
            
        }),
        startValue = o.value,
        step = o.step || 1,
        min = o.min,
        max = o.max,
        steps = (max - min) / step,
        getValue = v =>  ~~(steps * (parseInt(v, 10) - min) / (max - min));
    return {
        state: {
            n: 0,
            summer: startValue
        },
        // cb: function() {
        //     var self = this;
        //     this.setState({
        //         n: self.state.n + self.state.summer
        //     });
        //     // setTimeout(function(){
        //     //     self.render();
        //     // },1e2);
        //     return Promise.resolve();
        // },
        children: [
            {
                tag: 'style',
                html: `
                    progress { color: darkmagenta;background: rgba(255,255,255,0.1);}
                    progress::-moz-progress-bar { background: currentColor; }
                    progress::-webkit-progress-bar { background: rgba(255,255,255,0.1);}
                    progress::-webkit-progress-value { background: currentColor;}
                `
            },
            {
                ref: 'val',
                html: function() {
                    return this.parentKnot.state.summer;
                }
            },
            {
                tag: 'input',
                attrs:function() {
                    return {
                        type: 'range',
                        step,
                        value: 0,
                        min: min,
                        max: max
                    };
                },
                style: {
                    ...getGaugeStyle(),
                    opacity:0.01,
                    cursor:'pointer'
                },
                onInput: function (e) {
                    var r = this.getByRef('val'),
                        pro = this.getByRef('pro'),
                        value = e.target.value;
                    r.node.value = value;
                    r.config.html = value;
    
                    var v = getValue(value);
                    pro.setAttrs({value: v});
                    this.parentKnot.setState({
                        summer: parseInt(value, 10)
                    });
                    o?.ƒ(~~value);
                    r.render();
                }
            },
            {tag:'br'},
            {
                tag: 'progress',
                ref: 'pro',
                attrs: {
                    max: steps
                },
                style: {
                    ...getGaugeStyle(),
                    position:'relative',
                    top: '-30px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    // border:'10px solid #555',
                    // borderRadius: '20px',
                    color:'orange',
                },
                initCheck: function(){
                    var v = this.parentKnot.state.summer;
                    this.setAttrs({
                        value: getValue(v)
                    });
                    return Promise.resolve();
                }
            },
            {
                children: [
                    {
                        html: '0',
                        cb: function (){
                            this.node.innerHTML = '1x = ' + this.parentKnot.parentKnot.state.n;
                            return Promise.resolve();
                        }
                    },
                    {
                        html: '1',
                        cb: function (){
                            this.node.innerHTML = '2x = ' + this.parentKnot.parentKnot.state.n * 2;
                            return Promise.resolve();
                        }
                    }
                ],
                 cb: function() {
                    var p = this.parentKnot,
                        self = this;
                    p.setState({
                        n: p.state.n + p.state.summer
                    });
                    setTimeout(function(){
                        self.render();
                    },1e2);
                    return Promise.resolve();
                },
            }
        ]
    };
}