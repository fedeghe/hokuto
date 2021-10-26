import { W, TYPES, noop } from './core'
import COOKIE from './cookie'
import OBJECT from './object'
const xdr = typeof W.XDomainRequest !== TYPES.U
    && document.all
    && !(navigator.userAgent.match(/opera/i)),
    _ = {
        /**
         * Façade for getting the xhr object
         * @return {object} the xhr
         */
        getxhr: o => {
            let xhr,
                i = 0;
            const IEfuckIds = ['Msxml2.XMLHTTP', 'Msxml3.XMLHTTP', 'Microsoft.XMLHTTP'],
                len = IEfuckIds.length;

            if (xdr && o.cors) {
                xhr = new W.XDomainRequest();
            } else {
                try {
                    xhr = new W.XMLHttpRequest();
                } catch (e1) {
                    for (null; i < len; i += 1) {
                        try {
                            xhr = new W.ActiveXObject(IEfuckIds[i]);
                        } catch (e2) { continue; }
                    }
                    !xhr && W.alert('No way to initialize XHR');
                }
            }
            return xhr;
        },

        setHeaders: (xhr, type) => {
            const tmp = {
                xml: 'text/xml',
                html: 'text/html',
                json: 'application/json'
            }[type] || 'text/html';
            xhr.setRequestHeader('Accept', tmp + 'charset=utf-8');
        },

        setMultipartHeader: xhr => xhr.setRequestHeader('Content-Type', 'multipart/form-data'),

        setCookiesHeaders: xhr => {
            const cookies = COOKIE.getall(),
                l = cookies.length;

            let i = 0;
            while (i < l) {
                xhr.setRequestHeader('Cookie', cookies[i].name + '=' + cookies[i].value);
                i++;
            }
        },

        // eslint-disable-next-line complexity
        ajcall: (uri, options) => {
            const method = (options && options.method) || 'POST',
                cback = options && options.cback,
                cbOpened = (options && options.opened) || noop,
                cbLoading = (options && options.loading) || noop,
                cbError = (options && options.error) || noop,
                cbAbort = (options && options.abort) || noop,
                sync = options && options.sync,
                type = (options && options.type) || 'text/html',
                cache = (options && options.cache !== undefined) ? options.cache : true,
                targetType = type === 'xml' ? 'responseXML' : 'responseText',
                timeout = (options && options.timeout) || 10000,
                hasFiles = options && options.hasFiles;
                
            let formData,
                xhr = _.getxhr(options),
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
                data = OBJECT.toQs(data).substr(1);
            } else {
                // wrap data into a FromData object
                //
                formData = new W.FormData();
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
                xhr.ontimeout = () => {};
                xhr.onprogress = e => {
                    if (e.lengthComputable) {
                        const percentComplete = (e.loaded / e.total) * 100;
                        console.log(percentComplete + '% uploaded');
                    }
                };
                xhr.onload = ( /* r */ ) => {
                    // cback((targetType === 'responseXML') ? r.target[targetType].childNodes[0] : r.target[targetType]);
                    cback(xhr.responseText);
                };
                xhr.timeout = timeout;
        
                _.setHeaders(xhr, hasFiles, type);
        
                tmp = {
                    xml: 'text/xml',
                    html: 'text/html',
                    json: 'application/json'
                }[type] || 'text/html';
        
                xhr.contentType = tmp;
                window.setTimeout(() => {
                    xhr.send();
                }, 20);
            } else {
                // eslint-disable-next-line complexity
                xhr.onreadystatechange = () => {
        
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
                        W.setTimeout(() => {
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
                            _.setHeaders(xhr, type);
                            // NOOOOOOO
                            // _.setCookiesHeaders(xhr);
                        } else {
                            _.setHeaders(xhr, 'json');
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
                                W.alert(method);
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
                W.setTimeout(() => {
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
        }
    };


// returning module
//
export default {
    getxhr: _.getxhr,
    post: (uri, cback, sync, data, cache, files, error) => _.ajcall(uri, {
        cback: r => {
            if (files) {
                r = r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '');
                cback((W.JSON && W.JSON.parse) ? JSON.parse(r) : eval(['(', r, ')'].join('')));
            } else {
                cback(r);
            }
        },
        method: 'POST',
        sync,
        data,
        cache,
        error,
        hasFiles: !!files
    }),
    get: (uri, cback, sync, data, cache, error) => _.ajcall(uri, {
        cback: cback || noop,
        method: 'GET',
        sync,
        data,
        cache,
        error
    }),
    put: (uri, cback, sync, data, cache, error) => _.ajcall(uri, {
        cback,
        method: 'PUT',
        sync,
        data,
        cache,
        error
    }),
    getJson: (uri, cback, data, cors) => _.ajcall(uri, {
        type: 'json',
        method: 'GET',
        sync: false,
        cback: r => {
            // just to allow inline comments on json (not valid in json)
            // cleanup comments
            r = r.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, '');
            cback((W.JSON && W.JSON.parse) ? JSON.parse(r) : eval(['(', r, ')'].join('')));
        },
        data,
        cors: !!cors
    }),
    getXML: (uri, cback) => _.ajcall(uri, {
        method: 'GET',
        sync: false,
        type: 'xml',
        cback: cback || noop
    })
};