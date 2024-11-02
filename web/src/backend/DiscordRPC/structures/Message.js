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
exports.Message = void 0;
var Base_1 = require("./Base");
var User_1 = require("./User");
var Message = /** @class */ (function (_super) {
    __extends(Message, _super);
    function Message(client, props) {
        var _this = _super.call(this, client) || this;
        Object.assign(_this, props);
        _this.id = props.id;
        _this.blocked = props.blocked;
        _this.bot = props.bot;
        _this.content = props.content;
        _this.content_parsed = props.content_parsed;
        _this.nick = props.nick;
        _this.author_color = props.author_color;
        _this.edited_timestamp = props.edited_timestamp;
        _this.timestamp = props.timestamp;
        _this.tts = props.tts;
        _this.mentions = props.mentions.map(function (mentionData) { return new User_1.User(client, mentionData); });
        _this.mention_everyone = props.mention_everyone;
        _this.mention_roles = props.mention_roles;
        _this.embeds = props.embeds;
        _this.attachments = props.attachments;
        _this.author = new User_1.User(client, props.author);
        _this.pinned = props.pinned;
        _this.type = props.type;
        return _this;
    }
    return Message;
}(Base_1.Base));
exports.Message = Message;
