function (o){
    return {
        tag:'p',
        children:[{
            tag: 'strong',
            html: o.name
        },{
            html : 'hello',
            children:[{
                component: 'yyy',
                params:{
                    name:'freddy'
                }
            }]
        }]
    };
}