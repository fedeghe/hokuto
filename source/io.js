Hok.io = (function (){

    function get(uri, onSuccess, onError){
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
    }

    function getJson(uri, onSuccess, onError) {
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
    }

    function getXML(uri, onSuccess, onError) {
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

    return {
        get: get,
        getJson: getJson,
        getXML: getXML
    };
})();