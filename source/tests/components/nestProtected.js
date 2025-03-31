function (o){
    return {
        tag: 'p',
        id: 'nest',
        protected: true,
        html: o.name,
        children:[{
            component: 'p',
            params: {
                name: 'xxx'
            },
        }]
    }
}