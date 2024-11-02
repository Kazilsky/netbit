"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _Client_refreshToken, _Client_transport, _Client_user, _Client_application, _Client_rest, _Client_refreshTimeout, _Client_connectionPromise, _Client__nonceMap;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
var v10_1 = require("discord-api-types/v10");
var async_event_emitter_1 = require("@vladfrangu/async_event_emitter");
var IPC_1 = require("./transport/IPC");
var WebSocket_1 = require("./transport/WebSocket");
var ClientUser_1 = require("./structures/ClientUser");
var RPCError_1 = require("./utils/RPCError");
var rest_1 = require("@discordjs/rest");
var node_crypto_1 = require("node:crypto");
var Transport_1 = require("./structures/Transport");
var Client = /** @class */ (function (_super) {
    __extends(Client, _super);
    function Client(options) {
        var _a, _b;
        var _this = _super.call(this) || this;
        _Client_refreshToken.set(_this, void 0);
        /**
         * transport instance
         */
        _Client_transport.set(_this, void 0);
        /**
         * current user
         */
        _Client_user.set(_this, void 0);
        /**
         * current application
         */
        _Client_application.set(_this, void 0);
        _Client_rest.set(_this, void 0);
        _Client_refreshTimeout.set(_this, void 0);
        _Client_connectionPromise.set(_this, void 0);
        _Client__nonceMap.set(_this, new Map());
        _this.clientId = options.clientId;
        _this.clientSecret = options.clientSecret;
        _this.pipeId = options.pipeId;
        __classPrivateFieldSet(_this, _Client_rest, new rest_1.REST({ version: "10" }).setToken("this-is-a-dummy"), "f");
        __classPrivateFieldSet(_this, _Client_transport, ((_a = options.transport) === null || _a === void 0 ? void 0 : _a.type) === undefined || options.transport.type === "ipc"
            ? new IPC_1.IPCTransport({
                client: _this,
                pathList: (_b = options.transport) === null || _b === void 0 ? void 0 : _b.pathList
            })
            : new (options.transport.type === "websocket" ? WebSocket_1.WebSocketTransport : options.transport.type)({
                client: _this
            }), "f");
        __classPrivateFieldGet(_this, _Client_transport, "f").on("message", function (message) {
            if (message.cmd === "DISPATCH" && message.evt === "READY") {
                if (message.data.user)
                    __classPrivateFieldSet(_this, _Client_user, new ClientUser_1.ClientUser(_this, message.data.user), "f");
                if (message.data.config && message.data.config.cdn_host)
                    __classPrivateFieldGet(_this, _Client_rest, "f").options.cdn = message.data.config.cdn_host;
                _this.emit("connected");
            }
            else {
                if (message.nonce && __classPrivateFieldGet(_this, _Client__nonceMap, "f").has(message.nonce)) {
                    var nonceObj = __classPrivateFieldGet(_this, _Client__nonceMap, "f").get(message.nonce);
                    if (message.evt === "ERROR") {
                        nonceObj.error.code = message.data.code;
                        nonceObj.error.message = message.data.message;
                        nonceObj === null || nonceObj === void 0 ? void 0 : nonceObj.reject(nonceObj.error);
                    }
                    else
                        nonceObj === null || nonceObj === void 0 ? void 0 : nonceObj.resolve(message);
                    __classPrivateFieldGet(_this, _Client__nonceMap, "f").delete(message.nonce);
                }
                _this.emit(message.evt, message.data);
            }
        });
        return _this;
    }
    Object.defineProperty(Client.prototype, "user", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_user, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "application", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_application, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "transport", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_transport, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "isConnected", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_transport, "f").isConnected;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @hidden
     */
    Client.prototype.request = function (cmd, args, evt) {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            var _this = this;
            return __generator(this, function (_a) {
                error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
                RPCError_1.RPCError.captureStackTrace(error, this.request);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var nonce = node_crypto_1.default.randomUUID();
                        __classPrivateFieldGet(_this, _Client_transport, "f").send({ cmd: cmd, args: args, evt: evt, nonce: nonce });
                        __classPrivateFieldGet(_this, _Client__nonceMap, "f").set(nonce, { resolve: resolve, reject: reject, error: error });
                    })];
            });
        });
    };
    // #endregion
    // #region Authorization handlers
    Client.prototype.authenticate = function (accessToken) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, application, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.request("AUTHENTICATE", { access_token: accessToken })];
                    case 1:
                        _a = (_b.sent()).data, application = _a.application, user = _a.user;
                        __classPrivateFieldSet(this, _Client_application, application, "f");
                        __classPrivateFieldSet(this, _Client_user, new ClientUser_1.ClientUser(this, user), "f");
                        this.emit("ready");
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.refreshAccessToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            var exchangeResponse;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.emit("debug", "CLIENT | Refreshing access token!");
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Client_rest, "f").post(v10_1.Routes.oauth2TokenExchange(), {
                                body: new URLSearchParams({
                                    client_id: this.clientId,
                                    client_secret: (_a = this.clientSecret) !== null && _a !== void 0 ? _a : "",
                                    grant_type: "refresh_token",
                                    refresh_token: (_b = __classPrivateFieldGet(this, _Client_refreshToken, "f")) !== null && _b !== void 0 ? _b : ""
                                }),
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                passThroughBody: true
                            })];
                    case 1:
                        exchangeResponse = _c.sent();
                        this.hanleAccessTokenResponse(exchangeResponse);
                        this.emit("debug", "CLIENT | Access token refreshed!");
                        return [2 /*return*/, exchangeResponse.access_token];
                }
            });
        });
    };
    Client.prototype.hanleAccessTokenResponse = function (data) {
        var _this = this;
        if (!("access_token" in data) ||
            !("refresh_token" in data) ||
            !("expires_in" in data) ||
            !("token_type" in data))
            throw new TypeError("Invalid access token response!\nData: ".concat(JSON.stringify(data, null, 2)));
        __classPrivateFieldGet(this, _Client_rest, "f").setToken(data.access_token);
        __classPrivateFieldGet(this, _Client_rest, "f").options.authPrefix = data.token_type;
        __classPrivateFieldSet(this, _Client_refreshToken, data.refresh_token, "f");
        __classPrivateFieldSet(this, _Client_refreshTimeout, setTimeout(function () { return void _this.refreshAccessToken(); }, data.expires_in), "f");
    };
    Client.prototype.authorize = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var rpcToken, code, exchangeResponse;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.clientSecret)
                            throw new ReferenceError("Client secret is required for authorization!");
                        if (!options.useRPCToken) return [3 /*break*/, 2];
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Client_rest, "f").post("/oauth2/token/rpc", {
                                body: new URLSearchParams({
                                    client_id: this.clientId,
                                    client_secret: this.clientSecret
                                }),
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded"
                                }
                            })];
                    case 1:
                        rpcToken = // Sadly discord-api-types doesn't have the oauth2/token/rpc endpoint
                            (_b.sent()).rpc_token;
                        _b.label = 2;
                    case 2: return [4 /*yield*/, this.request("AUTHORIZE", {
                            scopes: options.scopes,
                            client_id: this.clientId,
                            rpc_token: options.useRPCToken ? rpcToken : undefined,
                            prompt: (_a = options.prompt) !== null && _a !== void 0 ? _a : "consent"
                        })];
                    case 3:
                        code = (_b.sent()).data.code;
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Client_rest, "f").post(v10_1.Routes.oauth2TokenExchange(), {
                                body: new URLSearchParams({
                                    client_id: this.clientId,
                                    client_secret: this.clientSecret,
                                    grant_type: "authorization_code",
                                    code: code
                                }),
                                headers: {
                                    "content-type": "application/x-www-form-urlencoded"
                                },
                                passThroughBody: true
                            })];
                    case 4:
                        exchangeResponse = _b.sent();
                        this.hanleAccessTokenResponse(exchangeResponse);
                        return [2 /*return*/, exchangeResponse.access_token];
                }
            });
        });
    };
    // #endregion
    /**
     * Used to subscribe to events. `evt` of the payload should be set to the event being subscribed to. `args` of the payload should be set to the args needed for the event.
     * @param event event name now subscribed to
     * @param args args for the event
     * @returns an object to unsubscribe from the event
     */
    Client.prototype.subscribe = function (event, args) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.request("SUBSCRIBE", args, event)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, {
                                /**
                                 * Unsubscribes from the event
                                 */
                                unsubscribe: function () { return _this.request("UNSUBSCRIBE", args, event); }
                            }];
                }
            });
        });
    };
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////
    /**
     * connect to the local rpc server
     */
    Client.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error;
            var _this = this;
            return __generator(this, function (_a) {
                if (__classPrivateFieldGet(this, _Client_connectionPromise, "f"))
                    return [2 /*return*/, __classPrivateFieldGet(this, _Client_connectionPromise, "f")];
                error = new RPCError_1.RPCError(Transport_1.RPC_ERROR_CODE.UNKNOWN_ERROR);
                RPCError_1.RPCError.captureStackTrace(error, this.connect);
                __classPrivateFieldSet(this, _Client_connectionPromise, new Promise(function (resolve, reject) {
                    var timeout = setTimeout(function () {
                        __classPrivateFieldSet(_this, _Client_connectionPromise, undefined, "f");
                        error.code = Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_TIMEOUT;
                        error.message = "Connection timed out";
                        reject(error);
                    }, 10e3);
                    if (typeof timeout === "object" && "unref" in timeout)
                        timeout.unref();
                    _this.once("connected", function () {
                        __classPrivateFieldSet(_this, _Client_connectionPromise, undefined, "f");
                        __classPrivateFieldGet(_this, _Client_transport, "f").once("close", function (reason) {
                            __classPrivateFieldGet(_this, _Client__nonceMap, "f").forEach(function (promise) {
                                promise.error.code =
                                    typeof reason === "object" ? reason.code : Transport_1.CUSTOM_RPC_ERROR_CODE.CONNECTION_ENDED;
                                promise.error.message =
                                    typeof reason === "object" ? reason.message : (reason !== null && reason !== void 0 ? reason : "Connection ended");
                                promise.reject(promise.error);
                            });
                            _this.emit("disconnected");
                        });
                        clearTimeout(timeout);
                        resolve();
                    });
                    __classPrivateFieldGet(_this, _Client_transport, "f").connect().catch(reject);
                }), "f");
                return [2 /*return*/, __classPrivateFieldGet(this, _Client_connectionPromise, "f")];
            });
        });
    };
    /**
     * will try to authorize if a scope is specified, else it's the same as `connect()`
     * @param options options for the authorization
     */
    Client.prototype.login = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var accessToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.connect()];
                    case 1:
                        _a.sent();
                        if (!options || !options.scopes) {
                            this.emit("ready");
                            return [2 /*return*/];
                        }
                        accessToken = "";
                        if (!options.refreshToken) return [3 /*break*/, 3];
                        __classPrivateFieldSet(this, _Client_refreshToken, options.refreshToken, "f");
                        return [4 /*yield*/, this.refreshAccessToken()];
                    case 2:
                        accessToken = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        if (!this.clientSecret)
                            throw new ReferenceError("Client secret is required for authorization!");
                        return [4 /*yield*/, this.authorize(options)];
                    case 4:
                        accessToken = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.authenticate(accessToken)];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * disconnects from the local rpc server
     */
    Client.prototype.destroy = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (__classPrivateFieldGet(this, _Client_refreshTimeout, "f")) {
                            clearTimeout(__classPrivateFieldGet(this, _Client_refreshTimeout, "f"));
                            __classPrivateFieldSet(this, _Client_refreshTimeout, undefined, "f");
                            __classPrivateFieldSet(this, _Client_refreshToken, undefined, "f");
                        }
                        return [4 /*yield*/, __classPrivateFieldGet(this, _Client_transport, "f").close()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client.prototype.getCdn = function () {
        return __classPrivateFieldGet(this, _Client_rest, "f").cdn;
    };
    return Client;
}(async_event_emitter_1.AsyncEventEmitter));
exports.Client = Client;
_Client_refreshToken = new WeakMap(), _Client_transport = new WeakMap(), _Client_user = new WeakMap(), _Client_application = new WeakMap(), _Client_rest = new WeakMap(), _Client_refreshTimeout = new WeakMap(), _Client_connectionPromise = new WeakMap(), _Client__nonceMap = new WeakMap();
