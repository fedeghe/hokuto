import Balle from 'balle'
import Processor from './Processor'
const Engy = {
    solve: (config, clean, name) => {
        const t = +new Date();
        return Balle.one((resolve) => 
            _process(config).then( r => {
                r[1] && report(r[1]);
                const now = +new Date();
                console.log('Engy process tot: ' + (now - t));
                resolve([r[0], clean, name])
            })
        );
    }
};

function _process(a) { return (new Processor(a)).run();}

function report(stats) {
    let j;
    const ln = new Array(37).join('-');
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

export default Engy