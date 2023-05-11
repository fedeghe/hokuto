window.onload = function () {
    hokuto.render({
        target: document.getElementById('target'),
        tag: 'ul',
        children: [
            { tag: 'li', text: 'one' },
            {
                tag: 'li', text: 'two', init: function () {
                    // console.log(this)
                    return false;
                }
            },
            {
                tag: 'li', text: 'three',
                init: function () {
                    console.log(this)
                    return true;
                },
                cb: function (){
                    this.done()
                },
                onClick: function (e) {
                    console.log(e)
                    console.log(this)
                }
            },
        ]
    }, true);
}