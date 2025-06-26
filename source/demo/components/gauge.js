function _(o = {}){
    var getGaugeStyle = () => ({
            width: '100%',
            margin: 0,
            padding: 0,
            height: '30px',
            border: 'none',
        }),
        ƒ = o.ƒ || function(){},
        startValue = o.value || 50,
        step = o.step || 1,
        min = o.min || 0,
        max = o.max || 100,
        colorBar = o.colorBar || 'green',   
        steps = (max - min) / step,
        getValue = v => ~~(steps * (parseInt(v, 10) - min) / (max - min));
    return {
        state: {
            n: 0,
            summer: startValue
        },
        style:{
            position:'relative',
            height:'30px'
        },
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
                tag: 'input',
                attrs:function() {
                    return {
                        type: 'range',
                        step,
                        value: startValue,
                        min: min,
                        max: max
                    };
                },
                style: {
                    ...getGaugeStyle(),
                    opacity: 0.01,
                    cursor: 'pointer'
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
                    ƒ(~~value);
                    r.render();
                },
                onKeydown: function (e) {
                    // if shift then set temporary the step X10
                    if (e.shiftKey) {
                        //if also ctrl the X100
                        if (e.ctrlKey) {
                            this.setAttrs({
                                step: step * 100
                            });
                        } else {
                            // just X10
                            this.setAttrs({
                                step: step * 10
                            });
                        }
                    }
                },
                onKeyup: function () {
                    this.setAttrs({step});
                }  
            },
            {
                tag: 'progress',
                ref: 'pro',
                attrs: {
                    max: steps
                },
                style: {
                    ...getGaugeStyle(),
                    position:'absolute',
                    top:0,
                    left:0,
                    userSelect: 'none',
                    pointerEvents: 'none',
                    color:colorBar,
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
                ref: 'val',
                style:{
                    position: 'absolute',
                    top:0,
                    width:'100%',
                    textAlign: 'center',
                    lineHeight: '30px',
                    height: '30px',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    color:'white',
                    textShadow: '0 0 5px #000',
                    margin:0,
                    paddinig:0
                },
                html: function() {
                    return this.parentKnot.state.summer;
                }
            },
        ]
    };
}