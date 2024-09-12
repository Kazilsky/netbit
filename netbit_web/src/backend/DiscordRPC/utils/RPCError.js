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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPCError = void 0;
var Transport_1 = require("../structures/Transport");
var RPCError = /** @class */ (function (_super) {
    __extends(RPCError, _super);
    function RPCError(errorCode, message, options) {
        var _this = _super.call(this, message, options) || this;
        _this.message = "";
        _this.code = errorCode;
        _this.message = message !== null && message !== void 0 ? message : _this.message;
        return _this;
    }
    Object.defineProperty(RPCError.prototype, "name", {
        get: function () {
            return "".concat(__assign(__assign({}, Transport_1.CUSTOM_RPC_ERROR_CODE), Transport_1.RPC_ERROR_CODE)[this.code]);
        },
        enumerable: false,
        configurable: true
    });
    return RPCError;
}(Error));
exports.RPCError = RPCError;
