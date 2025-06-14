Hok.fx = (function(){

    function fadeIn(params){
        params = params || {};
        var t = ((params.duration || 500) / 1e3).toFixed(1),
            additionalStyles = params.additionalStyles || '',
            style = hokuto._.dom.style({
                content: 'body{transition:opacity 3000s ease-in-out; opacity: 1;}'+additionalStyles
            });
        document.body.appendChild(style);
    }

    return {
        fadeIn: fadeIn
    };
})();