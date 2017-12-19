var http = require("http");
var types = require("utils/types");
var utils = require("utils/utils");
var getter = utils.ios.getter;
var domainDebugger = require("./../debugger/debugger");
var device = utils.ios.getter(UIDevice, UIDevice.currentDevice).userInterfaceIdiom === 0 ? "Phone" : "Pad";
var GET = "GET";
var USER_AGENT_HEADER = "User-Agent";
var USER_AGENT = "Mozilla/5.0 (i" + device + "; CPU OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5355d Safari/8536.25";
var sessionConfig = getter(NSURLSessionConfiguration, NSURLSessionConfiguration.defaultSessionConfiguration);
var queue = getter(NSOperationQueue, NSOperationQueue.mainQueue);
var NSURLSessionTaskDelegateImpl = (function (_super) {
    __extends(NSURLSessionTaskDelegateImpl, _super);
    function NSURLSessionTaskDelegateImpl() {
        _super.apply(this, arguments);
    }
    NSURLSessionTaskDelegateImpl.prototype.URLSessionTaskWillPerformHTTPRedirectionNewRequestCompletionHandler = function (session, task, response, request, completionHandler) {
        completionHandler(null);
    };
    NSURLSessionTaskDelegateImpl.ObjCProtocols = [NSURLSessionTaskDelegate];
    return NSURLSessionTaskDelegateImpl;
}(NSObject));
var sessionTaskDelegateInstance = NSURLSessionTaskDelegateImpl.new();
var defaultSession;
function ensureDefaultSession() {
    if (!defaultSession) {
        defaultSession = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, null, queue);
    }
}
var sessionNotFollowingRedirects;
function ensureSessionNotFollowingRedirects() {
    if (!sessionNotFollowingRedirects) {
        sessionNotFollowingRedirects = NSURLSession.sessionWithConfigurationDelegateDelegateQueue(sessionConfig, sessionTaskDelegateInstance, queue);
    }
}
var imageSource;
function ensureImageSource() {
    if (!imageSource) {
        imageSource = require("image-source");
    }
}
function request(options) {
    return new Promise(function (resolve, reject) {
        try {
            var network = domainDebugger.getNetwork();
            var debugRequest = network && network.create();
            var urlRequest = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(options.url));
            urlRequest.HTTPMethod = types.isDefined(options.method) ? options.method : GET;
            urlRequest.setValueForHTTPHeaderField(USER_AGENT, USER_AGENT_HEADER);
            if (options.headers) {
                for (var header in options.headers) {
                    urlRequest.setValueForHTTPHeaderField(options.headers[header] + "", header);
                }
            }
            if (types.isString(options.content) || options.content instanceof FormData) {
                urlRequest.HTTPBody = NSString.stringWithString(options.content.toString()).dataUsingEncoding(4);
            }
            if (types.isNumber(options.timeout)) {
                urlRequest.timeoutInterval = options.timeout / 1000;
            }
            var session;
            if (types.isBoolean(options.dontFollowRedirects) && options.dontFollowRedirects) {
                ensureSessionNotFollowingRedirects();
                session = sessionNotFollowingRedirects;
            }
            else {
                ensureDefaultSession();
                session = defaultSession;
            }
            var dataTask = session.dataTaskWithRequestCompletionHandler(urlRequest, function (data, response, error) {
                if (error) {
                    reject(new Error(error.localizedDescription));
                }
                else {
                    var headers = {};
                    if (response && response.allHeaderFields) {
                        var headerFields = response.allHeaderFields;
                        headerFields.enumerateKeysAndObjectsUsingBlock(function (key, value, stop) {
                            http.addHeader(headers, key, value);
                        });
                    }
                    if (debugRequest) {
                        debugRequest.mimeType = response.MIMEType;
                        debugRequest.data = data;
                        var debugResponse = {
                            url: options.url,
                            status: response.statusCode,
                            statusText: NSHTTPURLResponse.localizedStringForStatusCode(response.statusCode),
                            headers: headers,
                            mimeType: response.MIMEType,
                            fromDiskCache: false
                        };
                        debugRequest.responseReceived(debugResponse);
                        debugRequest.loadingFinished();
                    }
                    resolve({
                        content: {
                            raw: data,
                            toString: function (encoding) { return NSDataToString(data, encoding); },
                            toJSON: function (encoding) {
                                return utils.parseJSON(NSDataToString(data, encoding));
                            },
                            toImage: function () {
                                ensureImageSource();
                                return new Promise(function (resolve, reject) {
                                    UIImage.tns_decodeImageWithDataCompletion(data, function (image) {
                                        if (image) {
                                            resolve(imageSource.fromNativeSource(image));
                                        }
                                        else {
                                            reject(new Error("Response content may not be converted to an Image"));
                                        }
                                    });
                                });
                            },
                            toFile: function (destinationFilePath) {
                                var fs = require("file-system");
                                var fileName = options.url;
                                if (!destinationFilePath) {
                                    destinationFilePath = fs.path.join(fs.knownFolders.documents().path, fileName.substring(fileName.lastIndexOf('/') + 1));
                                }
                                if (data instanceof NSData) {
                                    data.writeToFileAtomically(destinationFilePath, true);
                                    return fs.File.fromPath(destinationFilePath);
                                }
                                else {
                                    reject(new Error("Cannot save file with path: " + destinationFilePath + "."));
                                }
                            }
                        },
                        statusCode: response.statusCode,
                        headers: headers
                    });
                }
            });
            if (options.url && debugRequest) {
                var request = {
                    url: options.url,
                    method: "GET",
                    headers: options.headers
                };
                debugRequest.requestWillBeSent(request);
            }
            dataTask.resume();
        }
        catch (ex) {
            reject(ex);
        }
    });
}
exports.request = request;
function NSDataToString(data, encoding) {
    var code = 4;
    if (encoding === 1) {
        code = 1586;
    }
    return NSString.alloc().initWithDataEncoding(data, code).toString();
}
//# sourceMappingURL=http-request.js.map