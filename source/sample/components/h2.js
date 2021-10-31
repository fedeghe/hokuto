// eslint-disable-next-line no-unused-vars
var t = {
    tag: 'h2',
    state: function(){
        var times = 0;
        return{
            add : function () {times++;},
            get: function() {return times;},
        }
    },
    data: {
        html: '#PARAM{html}',
    },
    style: {
        cursor: 'pointer'
    },
    html : '#PARAM{html}',
    method_rndColor: function() {
        return '#' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'].sort(function(a, b) {
            return Math.random() > 0.5 ? 1 : -1;
        }).slice(0, 6).join('');
    },
    onClick: function() {
        var state = this.state;
        state.add();
        
        var n = this.node,
            times = state.get();

        n.innerHTML = `${this.data.html} (clicked #${times} time${times > 1 ? 's' : ''})`
        n.style.color = this.rndColor();
        n.style.backgroundColor = this.rndColor();
        n.blur();
    },
    cb: function() {
        this.done();
    },
    end: () => {
        console.log('end h2')
    }
}