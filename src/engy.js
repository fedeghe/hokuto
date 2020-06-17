var Engy = {};
Engy.solve = function(config) {
    return {
        then: function (f) {
            return f(config)
        }
    }
}

