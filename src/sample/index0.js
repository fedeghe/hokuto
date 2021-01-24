(function () {
    var target = document.getElementById('target');
    var n = 0;
    var config = {
        target: target,
        style: {
            'font-size': '2em',
            padding:'50px'
        },
        
        onClick: function (e){
            console.log('on parent', this, this.node, e)
        },
        children: [{
            tag: 'p',
            html: 'hello',
            onClick: function (e){
                e.stopPropagation();
                console.log('on child', this, this.node,  e)
                // this.unhandle()// itself
                // this.unhandle(this.parentNode.node) // its parent
            },
        }]
    };
    hokuto.render(config, true);
})();