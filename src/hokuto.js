var hokuto = (function () {
    // only IE
    maltaF('./../node_modules/balle/source/index.js');

    maltaF('utils.js');
    
    maltaF('Unode.js');
    
    maltaF('engy.js');

    return {
        render: function (config) {
            var target = config.target,
                fragment = document.createDocumentFragment(),
                wn = new Unode(
                    Object.assign(
                        {},
                        config,
                        {
                            target: fragment,
                        }, {
                            map: {}
                        }
                    )
                );
            var n = wn.render().then(function (n) {
                target.appendChild(fragment)
                // console.log('solved', n)
                return n
            });
            return n;
        },
        renderWithComponents: function (config) {
            console.log('init', config)
            // return Engy.solve(config).then(render)
        }
    }
})();