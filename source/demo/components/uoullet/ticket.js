
function _() {
    var width = 500,
        mid = 10;
    return {
        tag: 'table',
        children: [
            {
                tag: 'tr',
                children: [
                    {
                        tag: 'td',
                        attrs: { colspan: 3, width : width },
                        children: [
                            {
                                tag: 'img',
                                attrs: {
                                    width: width,
                                    src: './IMG_0461.PNG',
                                    alt: 'Leonardo Logo'
                                },
                                // style:{
                                //     marginBottom: '1rem'
                                // }
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'tr',
                children: [
                    {
                        tag: 'td',
                        attrs: { width: 2*width/3 - mid/2 },
                        children: [
                            {
                                tag: 'h3',
                                text: 'Congratulations,'
                            },
                            {
                                tag: 'p',
                                html: 'You’re now part of the <i>UOULLET<i> story.'
                            },
                            {
                                tag: 'p',
                                html: 'Your <i>UOULLET</i> is ready for its journey.\nMay it age beautifully, carry stories, and be as fun to use as it was to make.'
                            },
                            {
                                tag: 'p',
                                style:{borderTop:'1px dotted #eee'},
                            },
                            
                            {
                                style: {display:'flex'},
                                children: [
                                    {
                                        tag: 'p',
                                        html: 'Be sure to check out the “how to” video so to exploit your <i>UOULLET</i> at its best.',
                                        style:{
                                            width:'80%'
                                        }
                                    },
                                    {
                                        tag: 'p',
                                        text: '☞',
                                        style: {
                                            fontSize: '2rem',
                                            height: '0.2rem',
                                            lineHeight: '0.2rem',
                                            width:'20%',
                                            textAlign:'center',
                                            color: 'red'
                                        }
                                    }
                                ]
                                
                            }
                        ]
                    },
                    {
                        tag: 'td',
                        attrs: { width: mid }
                    },
                    {
                        tag: 'td',
                        attrs: { width: width/3 - mid/2 },
                        children: [
                            {
                                tag: 'img',
                                attrs: {
                                    width: width/3 - mid/2,
                                    src: './howto.png',
                                    alt: 'how to uoullet'
                                }
                            }
                        ]
                    }
                ]
            },
            {
                tag: 'tr',
                children: [
                    {
                        tag: 'td',
                        attrs: { colspan: 3, width: width/2 },
                        style:{borderTop:'1px dotted #aaa', paddingTop:'0.5rem'},
                        children: [
                            {
                                tag: 'h3',
                                text: 'Crafted for you by:'
                            }
                        ]
                    }
                ]
            }
        ]
    }
}