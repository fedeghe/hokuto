var Engy = {};
Engy.solve = function(config) {
    return Balle.one(function (resolve, reject) {
        process(config).then(function (configResolved) {
            resolve(configResolved)
        })
    });
}

