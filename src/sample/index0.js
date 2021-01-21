(function () {
    var target = document.getElementById('target');
    var n = 0;
    var config = {
        target: target,
        style: {
            'font-size': '123px',
            padding:'50px'
        },
        
        onClick: function (e){
            console.log('on', this, this.node, e)
        },
        children: [{
            tag: 'p',
            html: 'hello',
            onClick: function (e){
                e.stopPropagation();
                console.log('on', this, this.node,  e)

                //this.unhandle()// itself
                //this.unhandle(this.parentNode.node) // its parent
            },
        }]
    };
    hokuto.render(config, true);
})();