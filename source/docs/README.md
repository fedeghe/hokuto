![hokuto](hokuto.png)
![track](https://click.jmvc.org/p/fEtBzv7O/1)


[![Coverage Status](https://coveralls.io/repos/github/fedeghe/hokuto/badge.svg?branch=master)](https://coveralls.io/github/fedeghe/hokuto?branch=master)
### Experimental dom engine


``` js
hokuto.render({
    config: {
        state: { n: 50 },
        children: [{
            tag:'span',
            html: function() {
                this.node.innerHTML = this.parent.state.n;
            },
            ref: 'lab'
        },{
            tag: 'input',
            attrs: { type: 'range' },
            onInput: function(e) {
                this.getByRef('lab').innerHTML = e.target.value;
            }
        }]
    }
})
```


  
