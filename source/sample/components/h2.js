// eslint-disable-next-line no-unused-vars
var t = {
    tag: 'h2',
    html: '#PARAM{html}',
    state: {
        times: 0
    },
    onClick: function() {
        this.state.times++;
        this.node.innerHTML = this.state.times
    }
};