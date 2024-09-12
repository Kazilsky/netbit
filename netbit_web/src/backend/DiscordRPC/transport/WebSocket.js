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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocketTransport = void 0;
var Transport_1 = require("../structures/Transport");
var RPCError_1 = require("../utils/RPCError");
var ws_1 = require("ws");
var WebSocketTransport = /** @class */ (function (_super) {
    __extends(WebSocketTransport, _super);
    function WebSocketTransport() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(WebSocketTransport.prototype, "isConnected", {
        get: function () {
            return this.ws !== undefined && this.ws.readyState === 1;
        },
        enumerable: false,
        configurable: true
    });
    WebSocketTransport.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _loop_1, this_1, i, state_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _loop_1 = function (i) {
                            var ws;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
                                            var socket = new ws_1.WebSocket("ws://127.0.0.1:".concat(6463 + i, "/?v=1&client_id=").concat(_this.client.clientId, "&encoding=json"));
                                            socket.onopen = function () {
                                                socket.onclose = null;
                                                socket.onopen = null;
                                                resolve(socket);
                                            };
                                            socket.onerror = function () {
                                                socket.onclose = null;
                                                socket.onopen = null;
                                                reject();
                                            };
                                        }).catch(function () { return undefined; })];
                                    case 1:
                                        ws = _b.sent();
                                        if (ws) {
                                            this_1.ws = ws;
                                            resolve();
                                            return [2 /*return*/, "break"];
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 10)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_1(i)];
                    case 2:
                        state_1 = _a.sent();
                        if (state_1 === "break")
                            return [3 /*break*/, 4];
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!this.ws)
                            reject(new RPCError_1.RPCError(Transport_1.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Failed to connect to websocket"));
                        this.ws.onmessage = function (event) {
                            _this.emit("message", JSON.parse(event.data.toString()));
                        };
                        this.ws.onclose = function (event) {
                            if (!event.wasClean)
                                return;
                            _this.ws = undefined;
                            _this.emit("close", event.reason);
                        };
                        this.ws.onerror = function (event) {
                            var _a;
                            try {
                                (_a = _this.ws) === null || _a === void 0 ? void 0 : _a.close();
                            }
                            catch (_b) { }
                            throw event.error;
                        };
                        this.emit("open");
                        return [2 /*return*/];
                }
            });
        }); });
    };
    WebSocketTransport.prototype.send = function (data) {
        var _a;
        (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify(data));
    };
    WebSocketTransport.prototype.ping = function () { };
    WebSocketTransport.prototype.close = function () {
        var _this = this;
        if (!this.ws)
            return new Promise(function (resolve) { return void resolve(); });
        return new Promise(function (resolve) {
            _this.ws.once("close", function () {
                _this.emit("close", "Closed by client");
                _this.ws = undefined;
                resolve();
            });
            _this.ws.close();
        });
    };
    return WebSocketTransport;
}(Transport_1.Transport));
exports.WebSocketTransport = WebSocketTransport;
