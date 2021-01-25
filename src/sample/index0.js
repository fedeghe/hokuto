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
            console.log('ciccio', this.getNode('ciccio'))
            console.log('on parent', this, this.node, e)
            console.log('elements', this.getElement('xxx'))
        },
        
        children: [{
            id: 'ciccio',
            tag: 'p',
            html: 'hello',
            method_say: function (a) {
                console.log(a, this)
            },
            init: function () {
                return true
            },
            onClick: function (e){
                
                // console.log(hokuto)
                this.say('HI')
                e.stopPropagation();
                console.log('on child', this, this.node,  e)
                // this.unhandle()// itself
                // this.unhandle(this.parentNode.node) // its parent
            },
            // init: function () {
            //     console.log('init')
            // },
            cb: function () {
                this.done()
            }
        }]
    };
    hokuto.render(config, true, 'xxx');
})();