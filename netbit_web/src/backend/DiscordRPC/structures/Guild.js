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
exports.Guild = void 0;
var Base_1 = require("./Base");
var Guild = /** @class */ (function (_super) {
    __extends(Guild, _super);
    function Guild(client, props) {
        var _this = _super.call(this, client) || this;
        /**
         * guild member list
         * (always an empty array)
         * @deprecated
         */
        _this.members = []; // Always an empty array
        Object.assign(_this, props);
        _this.id = props.id;
        _this.name = props.name;
        _this.icon_url = props.icon_url;
        _this.vanity_url_code = props.vanity_url_code;
        return _this;
    }
    return Guild;
}(Base_1.Base));
exports.Guild = Guild;
