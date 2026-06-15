function _(){
    function getChildren(els) {
        var red = els.reduce(function(acc, el){
            var sel = document.location.href.endsWith(el.href),
                el = {
                    tag: 'a',
                    attrs:{ href: el.href },
                    className : sel ? 'selected' :'',
                    text: el.label
                };
            acc.children.push(el);
            acc.sel |= sel;
            return acc;
        }, {children:[], sel:false});
        if (!red.sel) red.children[0].className = 'selected';
        return red.children;
    }
    return {
        tag:'nav',
        children: getChildren([
            {
                label:'zero',
                href:'index.html'
            },{
                label:'one',
                href:'index0.html'
            },{
                label:'two',
                href:'index1.html'
            },{
                label:'three',
                href:'index2.html'
            },{
                label:'four',
                href:'index3.html'
            },{
                label:'five',
                href:'index4.html'
            },{
                label:'six',
                href:'index5.html'
            }
        ])
    };
}