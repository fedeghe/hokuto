function m(){
    function anchor(label, link) {
        console.log(document.location.href);
        var sel = document.location.href.endsWith(link)
        return {
            tag: 'a',
            attrs:{ href: link },
            className : sel ? 'selected' :'',
            text: label
        };
    }
    return {
        tag:'nav',
        children:[
            anchor('zero', 'index.html'),
            anchor('one', 'index0.html'),
            anchor('two', 'index1.html'),
            anchor('three', 'index2.html'),
            anchor('four', 'index3.html'),
            anchor('five', 'index4.html'),
            anchor('size', 'index5.html')
        ]
    };
}