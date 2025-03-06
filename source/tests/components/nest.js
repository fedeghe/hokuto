function (o){
    return {
        tag: 'p',
        html: o.name,
        children:[{
            component: 'p',
            params: {
                name: 'xxx'
            },
        }]
    }
}