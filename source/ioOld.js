Hok.io = (function (){

    var xdr = typeof Hok.W.XDomainRequest !== Hok.TYPES.U
            && document.all
            && !(navigator.userAgent.match(/opera/i)),

        getxhr = function(o) {
            var xhr,
                i = 0,
                IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                len = IEfuckIds.length;

            if (xdr && o.cors) {
                xhr = new Hok.W.XDomainRequest();
            } else {
                try {
                    xhr = new Hok.W.XMLHttpRequest();
                } catch (e1) {
                    for (null; i < len; i += 1) {
                        try {
                            xhr = new Hok.W.ActiveXObject(IEfuckIds[i]);
                        } catch (e2) { continue; }
                    }
                    !xhr && Hok.W.alert('No way to initialize XHR');
                }
            }
            return xhr;
        },

        setHeaders = function (xhr, typ) {
            var tmp = {
                xml: 'text/xml',
                html: 'text/html',
                json: 'application/json'
            }[typ] || 'text/html';
            xhr.setRequestHeader('Accept', tmp + 'charset=utf-8');
        },

        setMultipartHeader = function(xhr){
            return xhr.setRequestHeader('Content-Type', 'multipart/form-data');
        },

        setCookiesHeaders = function(xhr) {
            var cookies = Hok.cookie.getall(),
                l = cookies.length,
                i = 0;
            while (i < l) {
                xhr.setRequestHeader('Cookie', cookies[i].name + '=' + cookies[i].value);
                i++;
            }
        },

        ajcall = function(uri, options) {
            var method = (options && options.method) || 'POST',
                cback = options && options.cback,
                cbOpened = (options && options.opened) || Hok.noop,
                cbLoading = (options && options.loading) || Hok.noop,
                cbError = (options && options.error) || Hok.noop,
                cbAbort = (options && options.abort) || Hok.noop,
                sync = options && options.sync,
                type = (options && options.type) || 'text/html',
                cache = (options && options.cache !== undefined) ? options.cache : true,
                targetType = type === 'xml' ? 'responseXML' : 'responseText',
                timeout = (options && options.timeout) || 10000,
                hasFiles = options && options.hasFiles,
                formData,
                xhr = getxhr(options),
                data = (options && options.data) || {},
                complete = false,
                res = false,
                ret = false,
                state = false,
                tmp;
        
            // prepare data, caring of cache
            //
            if (!cache) {
                data.C = +new Date();
            }
        
            if (method === 'GET') {
                data = Hok.object.toQs(data).substr(1);
            } else {
                // wrap data into a FromData object
                //
                formData = new Hok.W.FormData();
                for (tmp in data) {
                    if (data.hasOwnProperty(tmp)) {
                        formData.append(tmp, data[tmp]);
                    }
                }
                data = formData;
            }
        
            if (xdr && options.cors) {
                // xhr is actually a xdr
                xhr.open(method, (method === 'GET') ? (uri + ((data) ? ('?' + data) : '')) : uri);
        
                xhr.onerror = cbError;
                xhr.ontimeout = function(){};
                xhr.onprogress = function(e) {
                    if (e.lengthComputable) {
                        var percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };
                xhr.onload = function( /* r */ ) {
                    // cback((targetType === 'responseXML') ? r.target[targetType].childNodes[0] : r.target[targetType]);
                    cback(xhr.responseText);
                };
                xhr.timeout = timeout;
        
                setHeaders(xhr, hasFiles, type);
        
                tmp = {
                    xml: 'text/xml',
                    html: 'text/html',
                    json: 'application/json'
                }[type] || 'text/html';
        
                xhr.contentType = tmp;
                window.setTimeout(function(){
                    xhr.send();
                }, 20);
            } else {
                // eslint-disable-next-line complexity
                xhr.onreadystatechange = function(){
        
                    if (state === xhr.readyState) {
                        return false;
                    }
                    state = xhr.readyState;
        
                    // 404
                    //
                    if (xhr.status == 404 || (parseInt(xhr.readyState, 10) === 4 && parseInt(xhr.status, 10) === 0)) {
                        xhr.onerror({ error: 404, xhr: xhr, url: uri });
                        xhr.abort();
                        return false;
                    }
        
                    if (state === 'complete' || (parseInt(state, 10) === 4 && parseInt(xhr.status, 10) === 200)) {
                        complete = true;
        
                        if (parseInt(xhr.status, 10) === 404) {
                            xhr.onerror.call(xhr);
                            return false;
                        }
        
        
                        if (cback) {
                            res = xhr[targetType];
                            (function() { cback(res); })(res);
                        }
                        ret = xhr[targetType];
        
                        // IE leak ?????
                        Hok.W.setTimeout(function() {
                            xhr = null;
                        }, 50);
                        return ret;
                    } else if (state === 3) {
                        // loading data
                        //
                        cbLoading(xhr);
                    } else if (state === 2) {
                        // headers received
                        //
                        cbOpened(xhr);
                    } else if (state === 1) {
                        // only if no file upload is required
                        // add the header
                        //
                        if (!hasFiles) {
                            setHeaders(xhr, type);
                            // NOOOOOOO
                            // _.setCookiesHeaders(xhr);
                        } else {
                            setHeaders(xhr, 'json');
                            // NO HEADERS AT ALL!!!!!!
                            // othewise no up
                            //
                            // _.setMultipartHeader(xhr);
                        }
                        switch (method) {
                            case 'POST':
                            case 'PUT':
                                try {
                                    xhr.send(data || true);
                                } catch (e1) {}
                                break;
                            case 'DELETE':
                            case 'GET':
                                try {
                                    xhr.send(null);
                                } catch (e2) {}
                                break;
                            default:
                                Hok.W.alert(method);
                                xhr.send(null);
                                break;
                        }
                    }
                    return true;
                };
        
                // error, no arrow cause arguments
                //
                xhr.onerror = function() { cbError && cbError.apply(null, arguments)};
        
                // abort, no arrow cause arguments
                //
                xhr.onabort = function () {cbAbort && cbAbort.apply(null, arguments)};
        
                // open request
                //
                xhr.open(method, method === 'GET' ? uri + (data ? ('?' + data) : '') : uri, sync);
        
                // thread abortion
                //
                Hok.W.setTimeout(function() {
                    if (!complete) {
                        complete = true;
                        xhr.abort();
                    }
                }, timeout);
                try {
                    return (targetType === 'responseXML')
                        ? xhr[targetType].childNodes[0]
                        : xhr[targetType];
                } catch (e3) {}
            }
            return true;
        };

    // returning module
    return {
        getxhr: getxhr,
        post: function(uri, cback, sync, data, cache, files, error) {
            return ajcall(uri, {
                cback: function (r) {
                    if (files) {
                        r = r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '');
                        cback((Hok.W.JSON && Hok.W.JSON.parse) ? JSON.parse(r) : eval(['(', r, ')'].join('')));
                    } else {
                        cback(r);
                    }
                },
                method: 'POST',
                sync: sync,
                data: data,
                cache: cache,
                error: error,
                hasFiles: !!files
            })
        },
        get: function(uri, cback, sync, data, cache, error) { return ajcall(uri, {
            cback: cback || Hok.noop,
            method: 'GET',
            sync:sync,
            data: data,
            cache:cache,
            error:error
        })},
        put: function(uri, cback, sync, data, cache, error) { return ajcall(uri, {
            cback:  cback || Hok.noop,
            method: 'PUT',
            sync: sync,
            data: data,
            cache: cache,
            error: error
        })},
        getJson: function(uri, cback, data, cors) { return ajcall(uri, {
            type: 'json',
            method: 'GET',
            sync: false,
            cback: function(r) {
                // just to allow inline comments on json (not valid in json)
                // cleanup comments
                r = r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '');
                cback((Hok.W.JSON && Hok.W.JSON.parse) ? JSON.parse(r) : eval(['(', r, ')'].join('')));
            },
            data: data,
            cors: !!cors
        })},
        getXML: function(uri, cback){
            return ajcall(uri, {
                method: 'GET',
                sync: false,
                type: 'xml',
                cback: cback || Hok.noop
            });
        }
    };

})();