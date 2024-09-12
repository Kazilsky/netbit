"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebSocket = exports.IPC = void 0;
__exportStar(require("./Client"), exports);
__exportStar(require("./structures/ClientUser"), exports);
__exportStar(require("./structures/CertifiedDevice"), exports);
__exportStar(require("./structures/Channel"), exports);
__exportStar(require("./structures/Guild"), exports);
__exportStar(require("./structures/User"), exports);
__exportStar(require("./structures/VoiceSettings"), exports);
__exportStar(require("./structures/Transport"), exports);
__exportStar(require("./structures/Message"), exports);
exports.IPC = require("./transport/IPC");
exports.WebSocket = require("./transport/WebSocket");
