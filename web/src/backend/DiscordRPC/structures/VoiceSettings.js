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
exports.VoiceSettings = exports.KEY_TYPE = void 0;
var Base_1 = require("./Base");
var KEY_TYPE;
(function (KEY_TYPE) {
    KEY_TYPE[KEY_TYPE["KEYBOARD_KEY"] = 0] = "KEYBOARD_KEY";
    KEY_TYPE[KEY_TYPE["MOUSE_BUTTON"] = 1] = "MOUSE_BUTTON";
    KEY_TYPE[KEY_TYPE["KEYBOARD_MODIFIER_KEY"] = 2] = "KEYBOARD_MODIFIER_KEY";
    KEY_TYPE[KEY_TYPE["GAMEPAD_BUTTON"] = 3] = "GAMEPAD_BUTTON";
})(KEY_TYPE || (exports.KEY_TYPE = KEY_TYPE = {}));
var VoiceSettings = /** @class */ (function (_super) {
    __extends(VoiceSettings, _super);
    function VoiceSettings(client, props) {
        var _this = _super.call(this, client) || this;
        Object.assign(_this, props);
        _this.input = props.input;
        _this.output = props.output;
        _this.mode = props.mode;
        _this.automatic_gain_control = props.automatic_gain_control;
        _this.echo_cancellation = props.echo_cancellation;
        _this.noise_suppression = props.noise_suppression;
        _this.qos = props.qos;
        _this.silence_warning = props.silence_warning;
        _this.deaf = props.deaf;
        _this.mute = props.mute;
        return _this;
    }
    return VoiceSettings;
}(Base_1.Base));
exports.VoiceSettings = VoiceSettings;
