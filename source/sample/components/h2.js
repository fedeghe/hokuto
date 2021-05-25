// eslint-disable-next-line no-unused-vars
var t = {
    tag: 'h2',
    state: {
        times: 0,
        html: '#PARAM{html}'
    },
    style: {
        cursor: 'pointer'
    },
    method_rndColor: function() {
        return '#' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'].sort(function(a, b) {
            return Math.random() > 0.5 ? 1 : -1;
        }).slice(0, 6).join('');
    },
    onClick: function() {
        this.state.times++;
        this.node.innerHTML = `${this.state.html} - ${this.state.times}`
        this.node.style.color = this.rndColor();
        this.node.blur()
    },
    cb: function() {
        this.node.innerHTML = this.state.html
        this.done();
    }
}