import Balle from 'balle'
import Processor from './Processor'
const Engy = {};
const _configSet = cnf => {
    for (let j in config) {
        if (j in cnf) {
            config[j] = cnf[j];
        }
    }
    return this;
}

function _process(a) {
    return (new Processor(a)).run();
}

function report(stats) {
    var j, ln = new Array(37).join('-');
    console.log(ln);
    console.log(
        'Engy used ' + stats.elements + ' component' + (stats.elements === 1 ? '' : 's')
    );
    console.log('usage: ');
    for (j in stats.requested) {
        console.log(
            '> ' + j + ': ' + stats.requested[j] + ' time' + (stats.requested[j] > 1 ? 's' : '')
        );
    }
    console.log(
        'Engy total time: ' +
        stats.time +
        'ms (' +
        (stats.time - stats.xhrTot) +
        ' unfolding, ' +
        stats.xhrTot +
        ' xhr)'
    );
    console.log(ln);
}
Engy.solve = function(config, clean, name) {
    console.log()
    var t = +new Date();
    return Balle.one(function(resolve, reject) {
        _process(config).then(function(r) {

            r[1] && report(r[1]);
            var now = +new Date();
            console.log('Engy process tot: ' + (now - t));

            // console.log('config: ', config)
            // console.log('clean: ', clean)
            // console.log('name: ', name)
            resolve([r[0], clean, name])
        })
    });
}
export default Engy