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
exports.User = void 0;
var Base_1 = require("./Base");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(client, props) {
        var _this = _super.call(this, client) || this;
        Object.assign(_this, props);
        // word can't explains how much i hate this
        _this.id = props.id;
        _this.username = props.username;
        _this.discriminator = props.discriminator;
        _this.avatar = props.avatar;
        return _this;
    }
    Object.defineProperty(User.prototype, "avatarUrl", {
        /**
         * The URL to the user's avatar.
         */
        get: function () {
            return this.client.getCdn().avatar(this.id, this.avatar);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "defaultAvatarUrl", {
        /**
         * The URL to the user's default avatar. (avatar that is used when user have no avatar)
         */
        get: function () {
            return this.client.getCdn().defaultAvatar(parseInt(this.discriminator.substring(1)) % 5);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(User.prototype, "tag", {
        /**
         * User's tag
         */
        get: function () {
            return "".concat(this.username, "#").concat(this.discriminator);
        },
        enumerable: false,
        configurable: true
    });
    return User;
}(Base_1.Base));
exports.User = User;
