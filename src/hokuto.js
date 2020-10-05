var hokuto = (function () {
    // only IE
    maltaF('_balle.js');
    maltaF('_searchhash.js');

    maltaF('poly.js');

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
            return wn.render().then(function () {
                target.appendChild(fragment);
            });
        },
        renderWithComponents: function (config) {
            console.log('init', config)
            // return Engy.solve(config).then(render)
        }
    }
})();