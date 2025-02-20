(function (ctx){

    ctx.get = function(uri, onSuccess, onError){
        return fetch(uri)
            .then(function (response){
                if(!response.ok){
                    onError()
                    return Promise.reject()
                }
                return response
            })
            .then(function(v){
                return v.text()
            })
            .then(onSuccess)
    };
    ctx.post = function(uri, data, onSuccess, onError){
        return fetch(uri,{
                method: 'POST',
                headers: {
                    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    
                },
                body: new URLSearchParams(data)
            })
            .then(function (response){
                if(!response.ok){
                    onError()
                    return Promise.reject()
                }
                return response
            })
            .then(function (r){ return r.json()})
            .then(onSuccess)
    };

    ctx.getJson = function(uri, onSuccess, onError) {
        return fetch(uri)
            .then(function (response) {
                if(!response.ok){
                    onError()
                    return Promise.reject()
                }
                return response
            })
            .then(function(j){
                return j.json()
            })
            .then(onSuccess)
            .catch(onError)
    };

    ctx.getXML = function(uri, onSuccess, onError) {
        //'https://codetogo.io/api/users.xml'
        return fetch(uri)
            .then(function(response) {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(function(xmlText){
                var parser = new DOMParser();
                return parser.parseFromString(xmlText,'text/xml');
            })
            .then(onSuccess)
            .catch(onError); 
    }
})(Hok.io);