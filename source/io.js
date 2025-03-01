(function (ctx, _){

    var noop = function(){},
        override = function (o, els) {
            for(var i in els){
                if (els.hasOwnProperty(i))
                    o[i] = els[i];
            }
        },
        request = function(params){
            var url = params.url,
                timeout = params.timeout,
                user = params.user || null,
                password = params.password || null,
                timeout = params.timeout,
                responseType = params.responseType,
                body = params.body || null,
                method = params.method || (body ? 'POST' : 'GET'),
                onCompleted = params.onCompleted || noop,
                onLoad = params.onLoad || noop,
                onError = params.onError || noop,
                onAbort = params.onAbort || noop,
                onProgress = params.onProgress || noop,
                onTimeout = params.onTimeout || noop,
                headers = params.headers || {},
                withCredentials = !!params.withCredentials,
                xhr = new XMLHttpRequest();
            
            // addd2Obj(headers, getHeaders(method));

            if (xhr) {
                xhr.open(method, url, true, user, password);

                xhr.onreadystatechange = function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        const status = xhr.status;
                        if (status === 0 || (status >= 200 && status < 400)) {
                            onCompleted(xhr);
                            // The request has been completed successfully
                            // console.log(xhr.responseText);
                        } else {
                            onError(xhr);
                        // Oh no! There has been an error with the request!
                        }
                    }
                };

                
                xhr.responseType = responseType;
                xhr.timeout = timeout || null;
                xhr.onload = onLoad;
                xhr.onprogress = onProgress;
                xhr.onerror = onError;
                xhr.ontimeout = onTimeout;
                xhr.onabort = onAbort;
            
                if (body) {
                    override(headers, 'X-Requested-With', 'XMLHttpRequest');
                    if (!_.FormData || !(body instanceof _.FormData)) {
                        override(headers, 'Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
                    }
                    body = new URLSearchParams(body);
                }

            
                for (var field in headers) xhr.setRequestHeader(field, headers[field]);
                xhr.send(body);

            }
            return xhr;
        };
    ctx.get = function(params){
        var p = override(params, {
            method: 'GET',
            responseType: 'text',
            onCompleted: function(xhr){
                params.onCompleted.apply(xhr, [xhr.responseText]);
            }
        });
        return request(p);
    };
    ctx.getJson = function(params){
        var p = override(params, {
            method: 'GET',
            responseType: 'json',
            onCompleted: function(xhr){
                params.onCompleted.apply(xhr, [JSON.parse(xhr.responseText)]);
            }
        });
        return request(p);
    };

    // responseType: "", "arraybuffer", "blob", "document", "json", "text"

    // getJson
    // getXML
    // post
    // delete
    // put
    // patch
    // head
    // options
    // trace
    // connect
})(Hok.io, window);