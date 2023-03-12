WebPageMonitor
// .showNET()
.showFPS({ height: 20 })
// .showVIEW()
.showMEM({
    height: 10,
})
.showTAGS({
    frequency: 10,
    height: 10
})
// .showEVENTS({
//     frequency: 10,
//     exclude: [
//         'onmousemove',
//         'onpointerrawupdate',
//         'onpointermove'
//     ]
// })
.render({
    collapsible: true
});