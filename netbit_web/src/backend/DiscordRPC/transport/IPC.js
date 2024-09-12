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
exports.IPCTransport = exports.IPC_OPCODE = void 0;
var Transport_1 = require("../structures/Transport");
var RPCError_1 = require("../utils/RPCError");
var node_crypto_1 = require("node:crypto");
var node_path_1 = require("node:path");
var node_net_1 = require("node:net");
var node_fs_1 = require("node:fs");
var IPC_OPCODE;
(function (IPC_OPCODE) {
    IPC_OPCODE[IPC_OPCODE["HANDSHAKE"] = 0] = "HANDSHAKE";
    IPC_OPCODE[IPC_OPCODE["FRAME"] = 1] = "FRAME";
    IPC_OPCODE[IPC_OPCODE["CLOSE"] = 2] = "CLOSE";
    IPC_OPCODE[IPC_OPCODE["PING"] = 3] = "PING";
    IPC_OPCODE[IPC_OPCODE["PONG"] = 4] = "PONG";
})(IPC_OPCODE || (exports.IPC_OPCODE = IPC_OPCODE = {}));
var defaultPathList = [
    {
        platform: ["win32"],
        format: function (id) { return "\\\\?\\pipe\\discord-ipc-".concat(id); }
    },
    {
        platform: ["darwin", "linux"],
        format: function (id) {
            // macOS / Linux path
            var _a, _b, _c;
            var _d = process.env, XDG_RUNTIME_DIR = _d.XDG_RUNTIME_DIR, TMPDIR = _d.TMPDIR, TMP = _d.TMP, TEMP = _d.TEMP;
            var prefix = node_fs_1.default.realpathSync((_c = (_b = (_a = XDG_RUNTIME_DIR !== null && XDG_RUNTIME_DIR !== void 0 ? XDG_RUNTIME_DIR : TMPDIR) !== null && _a !== void 0 ? _a : TMP) !== null && _b !== void 0 ? _b : TEMP) !== null && _c !== void 0 ? _c : "".concat(node_path_1.default.sep, "tmp"));
            return node_path_1.default.join(prefix, "discord-ipc-".concat(id));
        }
    },
    {
        platform: ["linux"],
        format: function (id) {
            // snap
            var _a, _b, _c;
            var _d = process.env, XDG_RUNTIME_DIR = _d.XDG_RUNTIME_DIR, TMPDIR = _d.TMPDIR, TMP = _d.TMP, TEMP = _d.TEMP;
            var prefix = node_fs_1.default.realpathSync((_c = (_b = (_a = XDG_RUNTIME_DIR !== null && XDG_RUNTIME_DIR !== void 0 ? XDG_RUNTIME_DIR : TMPDIR) !== null && _a !== void 0 ? _a : TMP) !== null && _b !== void 0 ? _b : TEMP) !== null && _c !== void 0 ? _c : "".concat(node_path_1.default.sep, "tmp"));
            return node_path_1.default.join(prefix, "snap.discord", "discord-ipc-".concat(id));
        }
    },
    {
        platform: ["linux"],
        format: function (id) {
            // flatpak
            var _a, _b, _c;
            var _d = process.env, XDG_RUNTIME_DIR = _d.XDG_RUNTIME_DIR, TMPDIR = _d.TMPDIR, TMP = _d.TMP, TEMP = _d.TEMP;
            var prefix = node_fs_1.default.realpathSync((_c = (_b = (_a = XDG_RUNTIME_DIR !== null && XDG_RUNTIME_DIR !== void 0 ? XDG_RUNTIME_DIR : TMPDIR) !== null && _a !== void 0 ? _a : TMP) !== null && _b !== void 0 ? _b : TEMP) !== null && _c !== void 0 ? _c : "".concat(node_path_1.default.sep, "tmp"));
            return node_path_1.default.join(prefix, "app", "com.discordapp.Discord", "discord-ipc-".concat(id));
        }
    }
];
var createSocket = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, new Promise(function (resolve, reject) {
                var onError = function () {
                    socket.removeListener("conect", onConnect);
                    reject();
                };
                var onConnect = function () {
                    socket.removeListener("error", onError);
                    resolve(socket);
                };
                var socket = node_net_1.default.createConnection(path);
                socket.once("connect", onConnect);
                socket.once("error", onError);
            })];
    });
}); };
var IPCTransport = /** @class */ (function (_super) {
    __extends(IPCTransport, _super);
    function IPCTransport(options) {
        var _a;
        var _this = _super.call(this, options) || this;
        _this.pathList = (_a = options.pathList) !== null && _a !== void 0 ? _a : defaultPathList;
        return _this;
    }
    Object.defineProperty(IPCTransport.prototype, "isConnected", {
        get: function () {
            return this.socket !== undefined && this.socket.readyState === "open";
        },
        enumerable: false,
        configurable: true
    });
    IPCTransport.prototype.getSocket = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pathList, pipeId;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                if (this.socket)
                    return [2 /*return*/, this.socket];
                pathList = (_a = this.pathList) !== null && _a !== void 0 ? _a : defaultPathList;
                pipeId = this.client.pipeId;
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
                        var _loop_1, _i, pathList_1, pat, state_1;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _loop_1 = function (pat) {
                                        var tryCreateSocket, handleSocketId, socket, i, socket;
                                        return __generator(this, function (_b) {
                                            switch (_b.label) {
                                                case 0:
                                                    tryCreateSocket = function (path) { return __awaiter(_this, void 0, void 0, function () {
                                                        var socket;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0: return [4 /*yield*/, createSocket(path).catch(function () { return undefined; })];
                                                                case 1:
                                                                    socket = _a.sent();
                                                                    return [2 /*return*/, socket];
                                                            }
                                                        });
                                                    }); };
                                                    handleSocketId = function (id) { return __awaiter(_this, void 0, void 0, function () {
                                                        var socketPath;
                                                        return __generator(this, function (_a) {
                                                            switch (_a.label) {
                                                                case 0:
                                                                    if (!pat.platform.includes(process.platform))
                                                                        return [2 /*return*/];
                                                                    socketPath = pat.format(id);
                                                                    if (process.platform !== "win32" && !node_fs_1.default.existsSync(node_path_1.default.dirname(socketPath)))
                                                                        return [2 /*return*/];
                                                                    return [4 /*yield*/, tryCreateSocket(socketPath)];
                                                                case 1: return [2 /*return*/, _a.sent()];
                                                            }
                                                        });
                                                    }); };
                                                    if (!pipeId) return [3 /*break*/, 2];
                                                    return [4 /*yield*/, handleSocketId(pipeId)];
                                                case 1:
                                                    socket = _b.sent();
                                                    if (socket)
                                                        return [2 /*return*/, { value: resolve(socket) }];
                                                    return [3 /*break*/, 6];
                                                case 2:
                                                    i = 0;
                                                    _b.label = 3;
                                                case 3:
                                                    if (!(i < 10)) return [3 /*break*/, 6];
                                                    return [4 /*yield*/, handleSocketId(i)];
                                                case 4:
                                                    socket = _b.sent();
                                                    if (socket)
                                                        return [2 /*return*/, { value: resolve(socket) }];
                                                    _b.label = 5;
                                                case 5:
                                                    i++;
                                                    return [3 /*break*/, 3];
                                                case 6: return [2 /*return*/];
                                            }
                                        });
                                    };
                                    _i = 0, pathList_1 = pathList;
                                    _a.label = 1;
                                case 1:
                                    if (!(_i < pathList_1.length)) return [3 /*break*/, 4];
                                    pat = pathList_1[_i];
                                    return [5 /*yield**/, _loop_1(pat)];
                                case 2:
                                    state_1 = _a.sent();
                                    if (typeof state_1 === "object")
                                        return [2 /*return*/, state_1.value];
                                    _a.label = 3;
                                case 3:
                                    _i++;
                                    return [3 /*break*/, 1];
                                case 4:
                                    reject(new RPCError_1.RPCError(Transport_1.CUSTOM_RPC_ERROR_CODE.COULD_NOT_CONNECT, "Could not connect"));
                                    return [2 /*return*/];
                            }
                        });
                    }); })];
            });
        });
    };
    IPCTransport.prototype.connect = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.socket) return [3 /*break*/, 2];
                        _a = this;
                        return [4 /*yield*/, this.getSocket()];
                    case 1:
                        _a.socket = _b.sent();
                        _b.label = 2;
                    case 2:
                        this.emit("open");
                        this.send({
                            v: 1,
                            client_id: this.client.clientId
                        }, IPC_OPCODE.HANDSHAKE);
                        this.socket.on("readable", function () {
                            var _a, _b;
                            var data = Buffer.alloc(0);
                            do {
                                if (!_this.isConnected)
                                    break;
                                var chunk = (_a = _this.socket) === null || _a === void 0 ? void 0 : _a.read();
                                if (!chunk)
                                    break;
                                _this.client.emit("debug", "SERVER => CLIENT | ".concat((_b = chunk
                                    .toString("hex")
                                    .match(/.{1,2}/g)) === null || _b === void 0 ? void 0 : _b.join(" ").toUpperCase()));
                                data = Buffer.concat([data, chunk]);
                            } while (true);
                            if (data.length < 8) {
                                if (data.length === 0)
                                    return;
                                // TODO : Handle error
                                _this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                                return;
                            }
                            var op = data.readUInt32LE(0);
                            var length = data.readUInt32LE(4);
                            if (data.length !== length + 8) {
                                // TODO : Handle error
                                _this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                                return;
                            }
                            var parsedData;
                            try {
                                parsedData = JSON.parse(data.subarray(8, length + 8).toString());
                            }
                            catch (_c) {
                                // TODO : Handle error
                                _this.client.emit("debug", "SERVER => CLIENT | Malformed packet, invalid payload");
                                return;
                            }
                            _this.client.emit("debug", "SERVER => CLIENT | OPCODE.".concat(IPC_OPCODE[op], " |"), parsedData);
                            switch (op) {
                                case IPC_OPCODE.FRAME: {
                                    if (!data)
                                        break;
                                    _this.emit("message", parsedData);
                                    break;
                                }
                                case IPC_OPCODE.CLOSE: {
                                    _this.emit("close", parsedData);
                                    break;
                                }
                                case IPC_OPCODE.PING: {
                                    _this.send(parsedData, IPC_OPCODE.PONG);
                                    _this.emit("ping");
                                    break;
                                }
                            }
                        });
                        this.socket.on("close", function () {
                            _this.socket = undefined;
                            _this.emit("close", "Closed by Discord");
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    IPCTransport.prototype.send = function (message, op) {
        var _a;
        if (op === void 0) { op = IPC_OPCODE.FRAME; }
        this.client.emit("debug", "CLIENT => SERVER | OPCODE.".concat(IPC_OPCODE[op], " |"), message);
        var dataBuffer = message ? Buffer.from(JSON.stringify(message)) : Buffer.alloc(0);
        var packet = Buffer.alloc(8);
        packet.writeUInt32LE(op, 0);
        packet.writeUInt32LE(dataBuffer.length, 4);
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.write(Buffer.concat([packet, dataBuffer]));
    };
    IPCTransport.prototype.ping = function () {
        this.send(node_crypto_1.default.randomUUID(), IPC_OPCODE.PING);
    };
    IPCTransport.prototype.close = function () {
        var _this = this;
        if (!this.socket)
            return Promise.resolve();
        return new Promise(function (resolve) {
            _this.socket.once("close", function () {
                _this.emit("close", "Closed by client");
                _this.socket = undefined;
                resolve();
            });
            _this.socket.end();
        });
    };
    return IPCTransport;
}(Transport_1.Transport));
exports.IPCTransport = IPCTransport;
