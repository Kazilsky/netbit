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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CertifiedDevice = exports.DeviceType = void 0;
var Base_1 = require("./Base");
var DeviceType;
(function (DeviceType) {
    DeviceType["AUDIO_INPUT"] = "audioinput";
    DeviceType["AUDIO_OUTPUT"] = "audiooutput";
    DeviceType["VIDEO_INPUT"] = "videoinput";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var CertifiedDevice = /** @class */ (function (_super) {
    __extends(CertifiedDevice, _super);
    function CertifiedDevice(client, props) {
        var _this = _super.call(this, client) || this;
        Object.assign(_this, props);
        _this.type = props.type;
        _this.id = props.id;
        _this.vendor = props.vendor;
        _this.model = props.model;
        _this.related = props.related;
        return _this;
    }
    return CertifiedDevice;
}(Base_1.Base));
exports.CertifiedDevice = CertifiedDevice;
