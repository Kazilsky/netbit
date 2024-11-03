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
exports.Channel = void 0;
var Message_1 = require("./Message");
var Base_1 = require("./Base");
var Channel = /** @class */ (function (_super) {
    __extends(Channel, _super);
    function Channel(client, props) {
        var _a;
        var _this = _super.call(this, client) || this;
        Object.assign(_this, props);
        _this.id = props.id;
        _this.guild_id = props.guild_id;
        _this.name = props.name;
        _this.type = props.type;
        _this.topic = props.topic;
        _this.bitrate = props.bitrate;
        _this.user_limit = props.user_limit;
        _this.position = props.position;
        _this.voice_states = props.voice_states;
        _this.messages = (_a = props.messages) === null || _a === void 0 ? void 0 : _a.map(function (messgeData) { return new Message_1.Message(client, messgeData); });
        return _this;
    }
    return Channel;
}(Base_1.Base));
exports.Channel = Channel;
