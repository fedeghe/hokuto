function (){
    var systems = {
        'vdp': 'Van der pol',
        'lv': 'Lotka-Volterra',
        'p': 'Pendulum',
        'sfp': 'Sin Forced Pendulum',
        'fp': 'Friction Pendulum',
        'ao': 'Armonic oscillator',
        'afo': 'Armonic friction oscillator',
        'ar': 'Armonic repulsor',
        'sfo': 'Sin Forced Oscillator',
        'wr': 'Watt regulator',
    };

    return {
        className:'panelContainer',
        children:[{
            className:'panel',
            children:[{
                tag: 'strong',
                text: 'System: '
            },{
                tag: 'select',
                children: Object.entries(systems).map(system => {
                    var key = system[0],
                        label = system[1];
                    return {
                        tag: 'option',
                        html: label,
                        attrs:{
                            value: key
                        }
                    };
                }),
                onChange: function(e) {
                    var fmla = this.getByRef('fmla')
                    hokuto.render({
                        config:{
                            target: fmla.node,
                            html: e.target.value
                        },
                        clear:true
                    })
                }
            },{
                ref:'fmla'
            }]
        }]
        
    };
}