import Balle from 'balle'
const Engy = {};
Engy.solve = function(config) {
    return Balle.one(function(resolve, reject) {
        process(config).then(function(configResolved) {
            resolve(configResolved)
        })
    });
}
export default Engy