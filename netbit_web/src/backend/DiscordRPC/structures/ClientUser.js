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
exports.ClientUser = exports.ActivityPartyPrivacy = exports.ActivitySupportedPlatform = void 0;
var VoiceSettings_1 = require("./VoiceSettings");
var Channel_1 = require("./Channel");
var Guild_1 = require("./Guild");
var User_1 = require("./User");
var ActivitySupportedPlatform;
(function (ActivitySupportedPlatform) {
    ActivitySupportedPlatform["IOS"] = "ios";
    ActivitySupportedPlatform["ANDROID"] = "android";
    ActivitySupportedPlatform["WEB"] = "web";
})(ActivitySupportedPlatform || (exports.ActivitySupportedPlatform = ActivitySupportedPlatform = {}));
var ActivityPartyPrivacy;
(function (ActivityPartyPrivacy) {
    ActivityPartyPrivacy[ActivityPartyPrivacy["PRIVATE"] = 0] = "PRIVATE";
    ActivityPartyPrivacy[ActivityPartyPrivacy["PUBLIC"] = 1] = "PUBLIC";
})(ActivityPartyPrivacy || (exports.ActivityPartyPrivacy = ActivityPartyPrivacy = {}));
var ClientUser = /** @class */ (function (_super) {
    __extends(ClientUser, _super);
    function ClientUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // #region Helper function
    ClientUser.prototype.fetchUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = User_1.User.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("GET_USER", { id: userId })];
                    case 1: return [2 /*return*/, new (_a.apply(User_1.User, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used to get a guild the client is in.
     *
     * @param guildId - id of the guild to get
     * @param timeout - asynchronously get guild with time to wait before timing out
     * @returns partial guild
     */
    ClientUser.prototype.fetchGuild = function (guildId, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Guild_1.Guild.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("GET_GUILD", { guild_id: guildId, timeout: timeout })];
                    case 1: return [2 /*return*/, new (_a.apply(Guild_1.Guild, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used to get a list of guilds the client is in.
     * @returns the guilds the user is in
     */
    ClientUser.prototype.fetchGuilds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_GUILDS")];
                    case 1: return [2 /*return*/, (_a.sent()).data.guilds.map(function (guildData) { return new Guild_1.Guild(_this.client, guildData); })];
                }
            });
        });
    };
    /**
     * Used to get a channel the client is in.
     * @param channelId - id of the channel to get
     * @returns partial channel
     */
    ClientUser.prototype.fetchChannel = function (channelId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Channel_1.Channel.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("GET_CHANNEL", { channel_id: channelId })];
                    case 1: return [2 /*return*/, new (_a.apply(Channel_1.Channel, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used to get a guild's channels the client is in.
     * @param guildId - id of the guild to get channels for
     * @returns guild channels the user is in
     */
    ClientUser.prototype.fetchChannels = function (guildId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_CHANNELS", { guild_id: guildId })];
                    case 1: return [2 /*return*/, (_a.sent()).data.channels.map(function (channelData) { return new Channel_1.Channel(_this.client, channelData); })];
                }
            });
        });
    };
    /**
     * Used to get the client's current voice channel. There are no arguments for this command. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, or `null` if none.
     * @returns the client's current voice channel, `null` if none
     */
    ClientUser.prototype.getSelectedVoiceChannel = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_SELECTED_VOICE_CHANNEL")];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data !== null ? new Channel_1.Channel(this.client, response.data) : null];
                }
            });
        });
    };
    /**
     * Used to join voice channels, group dms, or dms. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, `null` if none.
     * @param channelId - channel id to join
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @param force - forces a user to join a voice channel
     * @returns the channel that the user joined, `null` if none
     */
    ClientUser.prototype.selectVoiceChannel = function (channelId, timeout, force, navigate) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Channel_1.Channel.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("SELECT_VOICE_CHANNEL", {
                                channel_id: channelId,
                                timeout: timeout,
                                force: force,
                                navigate: navigate
                            })];
                    case 1: return [2 /*return*/, new (_a.apply(Channel_1.Channel, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used to leave voice channels, group dms, or dms
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @param force - forces a user to join a voice channel
     */
    ClientUser.prototype.leaveVoiceChannel = function (timeout, force) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SELECT_VOICE_CHANNEL", {
                            channel_id: null,
                            timeout: timeout,
                            force: force
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used to get current client's voice settings
     * @returns the voice setting
     */
    ClientUser.prototype.getVoiceSettings = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = VoiceSettings_1.VoiceSettings.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("GET_VOICE_SETTINGS")];
                    case 1: return [2 /*return*/, new (_a.apply(VoiceSettings_1.VoiceSettings, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used by hardware manufacturers to send information about the current state of their certified devices that are connected to Discord.
     * @param devices - a list of devices for your manufacturer, in order of priority
     * @returns
     */
    ClientUser.prototype.setCeritfiedDevices = function (devices) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_CERTIFIED_DEVICES", { devices: devices })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used to accept an Ask to Join request.
     * @param userId - the id of the requesting user
     */
    ClientUser.prototype.sendJoinInvite = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SEND_ACTIVITY_JOIN_INVITE", { user_id: userId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used to reject an Ask to Join request.
     * @param userId - the id of the requesting user
     */
    ClientUser.prototype.closeJoinRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Used to join text channels, group dms, or dms. Returns the [Get Channel](https://discord.com/developers/docs/topics/rpc#getchannel) response, or `null` if none.
     * @param channelId - channel id to join
     * @param timeout - asynchronously join channel with time to wait before timing out
     * @returns the text channel that user joined
     */
    ClientUser.prototype.selectTextChannel = function (channelId, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = Channel_1.Channel.bind;
                        _b = [void 0, this.client];
                        return [4 /*yield*/, this.client.request("SELECT_TEXT_CHANNEL", { channel_id: channelId, timeout: timeout })];
                    case 1: return [2 /*return*/, new (_a.apply(Channel_1.Channel, _b.concat([(_c.sent()).data])))()];
                }
            });
        });
    };
    /**
     * Used to leave text channels, group dms, or dms.
     * @param timeout - asynchronously join channel with time to wait before timing out
     */
    ClientUser.prototype.leaveTextChannel = function (timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SELECT_TEXT_CHANNEL", { channel_id: null, timeout: timeout })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ClientUser.prototype.getRelationships = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_RELATIONSHIPS")];
                    case 1: return [2 /*return*/, (_a.sent()).data.relationships.map(function (data) {
                            return new User_1.User(_this.client, __assign(__assign({}, data.user), { presence: data.presence }));
                        })];
                }
            });
        });
    };
    /**
     * Used to update a user's Rich Presence.
     *
     * @param activity - the rich presence to assign to the user
     * @param pid - the application's process id
     * @returns The activity that have been set
     */
    ClientUser.prototype.setActivity = function (activity, pid) {
        return __awaiter(this, void 0, void 0, function () {
            var formattedAcitivity;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        formattedAcitivity = __assign(__assign({}, activity), { assets: {}, timestamps: {}, party: {}, secrets: {} });
                        if (activity.startTimestamp instanceof Date) {
                            formattedAcitivity.timestamps.start = Math.round(activity.startTimestamp.getTime());
                        }
                        else if (typeof activity.startTimestamp === "number") {
                            formattedAcitivity.timestamps.start = activity.startTimestamp;
                        }
                        if (activity.endTimestamp instanceof Date) {
                            formattedAcitivity.timestamps.end = Math.round(activity.endTimestamp.getTime());
                        }
                        else if (typeof activity.endTimestamp === "number") {
                            formattedAcitivity.timestamps.end = activity.endTimestamp;
                        }
                        if (activity.largeImageKey)
                            formattedAcitivity.assets.large_image = activity.largeImageKey;
                        if (activity.smallImageKey)
                            formattedAcitivity.assets.small_image = activity.smallImageKey;
                        if (activity.largeImageText)
                            formattedAcitivity.assets.large_text = activity.largeImageText;
                        if (activity.smallImageText)
                            formattedAcitivity.assets.small_text = activity.smallImageText;
                        if (activity.partyId)
                            formattedAcitivity.party.id = activity.partyId;
                        if (activity.partyPrivacy)
                            formattedAcitivity.party.privacy = activity.partyPrivacy;
                        if (activity.partySize && activity.partyMax)
                            formattedAcitivity.party.size = [activity.partySize, activity.partyMax];
                        if (activity.joinSecret)
                            formattedAcitivity.secrets.join = activity.joinSecret;
                        if (activity.spectateSecret)
                            formattedAcitivity.secrets.spectate = activity.spectateSecret;
                        if (activity.matchSecret)
                            formattedAcitivity.secrets.match = activity.matchSecret;
                        if (activity.supportedPlatforms)
                            formattedAcitivity.supported_platforms = activity.supportedPlatforms;
                        if (Object.keys(formattedAcitivity.assets).length === 0)
                            delete formattedAcitivity["assets"];
                        if (Object.keys(formattedAcitivity.timestamps).length === 0)
                            delete formattedAcitivity["timestamps"];
                        if (Object.keys(formattedAcitivity.party).length === 0)
                            delete formattedAcitivity["party"];
                        if (Object.keys(formattedAcitivity.secrets).length === 0)
                            delete formattedAcitivity["secrets"];
                        formattedAcitivity.instance = !!activity.instance;
                        // Clean-up
                        delete formattedAcitivity["startTimestamp"];
                        delete formattedAcitivity["endTimestamp"];
                        delete formattedAcitivity["largeImageKey"];
                        delete formattedAcitivity["smallImageKey"];
                        delete formattedAcitivity["largeImageText"];
                        delete formattedAcitivity["smallImageText"];
                        delete formattedAcitivity["partyId"];
                        delete formattedAcitivity["partyPrivacy"];
                        delete formattedAcitivity["partySize"];
                        delete formattedAcitivity["partyMax"];
                        delete formattedAcitivity["joinSecret"];
                        delete formattedAcitivity["spectateSecret"];
                        delete formattedAcitivity["matchSecret"];
                        delete formattedAcitivity["supportedPlatforms"];
                        return [4 /*yield*/, this.client.request("SET_ACTIVITY", {
                                pid: (pid !== null && pid !== void 0 ? pid : process) ? ((_a = process.pid) !== null && _a !== void 0 ? _a : 0) : 0,
                                activity: formattedAcitivity
                            })];
                    case 1: return [2 /*return*/, (_b.sent()).data];
                }
            });
        });
    };
    /**
     * Used to clear a user's Rich Presence.
     *
     * @param pid - the application's process id
     */
    ClientUser.prototype.clearActivity = function (pid) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_ACTIVITY", { pid: (pid !== null && pid !== void 0 ? pid : process) ? ((_a = process.pid) !== null && _a !== void 0 ? _a : 0) : 0 })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    // #region Undocumented
    // This region holds method that are not documented by Discord BUT does exist
    // Also most of this might not even be correct, use at your own risk
    /**
     * Used to get a user's avatar
     * @param userId - id of the user to get the avatar of
     * @param format - image format
     * @param size - image size
     * @return base64 encoded image data
     */
    ClientUser.prototype.getImage = function (userId_1) {
        return __awaiter(this, arguments, void 0, function (userId, format, size) {
            if (format === void 0) { format = "png"; }
            if (size === void 0) { size = 1024; }
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_IMAGE", { type: "user", id: userId, format: format, size: size })];
                    case 1: return [2 /*return*/, (_a.sent()).data.data_url];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    ClientUser.prototype.getSoundboardSounds = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_SOUNDBOARD_SOUNDS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    ClientUser.prototype.playSoundboardSound = function (guildId, soundId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("PLAY_SOUNDBOARD_SOUND", {
                            guild_id: guildId,
                            sound_id: soundId
                        })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VIDEO_WRITE
     * @returns
     */
    ClientUser.prototype.toggleVideo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("TOGGLE_VIDEO")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_SCREENSHARE_WRITE
     * @returns
     */
    ClientUser.prototype.toggleScreenshare = function (pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("TOGGLE_SCREENSHARE", { pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    ClientUser.prototype.setPushToTalk = function (active) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("PUSH_TO_TALK", { active: active })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    ClientUser.prototype.setVoiceSettings = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_VOICE_SETTINGS", req)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_VOICE_WRITE
     * @returns
     */
    ClientUser.prototype.setVoiceSettings2 = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_VOICE_SETTINGS_2", req)];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    /**
     * Requires RPC and RPC_GUILDS_MEMBERS_READ
     * @returns
     */
    ClientUser.prototype.getChannelPermissions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_CHANNEL_PERMISSIONS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getActivityInstanceConnectedParticipants = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_ACTIVITY_INSTANCE_CONNECTED_PARTICIPANTS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.navigateToConnections = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("NAVIGATE_TO_CONNECTIONS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.createChanenlInvite = function (channelId, args) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("CREATE_CHANNEL_INVITE", __assign({ channel_id: channelId }, args))];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openExternalLink = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("OPEN_EXTERNAL_LINK", { url: url })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getPlatformBehaviors = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_PLATFORM_BEHAVIORS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getProviderAccessToken = function (provider, connectionRedirect) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_PROVIDER_ACCESS_TOKEN", { provider: provider, connectionRedirect: connectionRedirect })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.maybeGetProviderAccessToken = function (provider) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("MAYBE_GET_PROVIDER_ACCESS_TOKEN", { provider: provider })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getSKUS = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_SKUS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getEntitlements = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_ENTITLEMENTS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getSKUsEmbedded = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_SKUS_EMBEDDED")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getEntitlementsEmbedded = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_ENTITLEMENTS_EMBEDDED")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.encourageHardwareAcceleration = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("ENCOURAGE_HW_ACCELERATION")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.captureLog = function (level, message) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("CAPTURE_LOG", { level: level, message: message })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.sendAnalyticsEvent = function (eventName, eventProperties) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SEND_ANALYTICS_EVENT", { eventName: eventName, eventProperties: eventProperties })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getLocale = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("USER_SETTINGS_GET_LOCALE")];
                    case 1: return [2 /*return*/, (_a.sent()).data.locale];
                }
            });
        });
    };
    ClientUser.prototype.getAchievements = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_USER_ACHIEVEMENTS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.setAchievement = function (achievementId, percentComplete) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_USER_ACHIEVEMENT", {
                            achievement_id: achievementId,
                            percent_complete: percentComplete
                        })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.createNetworkingToken = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("NETWORKING_CREATE_TOKEN")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.networkingPeerMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("NETWORKING_PEER_METRICS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.networkingSystemMetrics = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("NETWORKING_SYSTEM_METRICS")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getNetworkingConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_NETWORKING_CONFIG")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.startPurchase = function (skuId, pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("START_PURCHASE", { sku_id: skuId, pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.startPremiumPurchase = function (pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("START_PREMIUM_PURCHASE", { pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getApplicationTicket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_APPLICATION_TICKET")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.getEntitlementTicket = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GET_ENTITLEMENT_TICKET")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.validateApplication = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("VALIDATE_APPLICATION")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openOverlayVoiceSettings = function (pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("OPEN_OVERLAY_VOICE_SETTINGS", { pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openOverlayGuildInvite = function (code, pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("OPEN_OVERLAY_GUILD_INVITE", { code: code, pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openOverlayActivityInvite = function (type, pid) {
        return __awaiter(this, void 0, void 0, function () {
            var typeToNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typeToNumber = {
                            JOIN: 0
                        };
                        return [4 /*yield*/, this.client.request("OPEN_OVERLAY_ACTIVITY_INVITE", { type: typeToNumber[type], pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.setOverlayLocked = function (locked, pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_OVERLAY_LOCKED", { locked: locked, pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.browserHandoff = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("BROWSER_HANDOFF")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openGuildTemplateBrowser = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GUILD_TEMPLATE_BROWSER", { code: code })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openGiftCodeBrowser = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("GIFT_CODE_BROWSER", { code: code })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.brainTreePopupBridgeCallback = function (state, path, query) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("BRAINTREE_POPUP_BRIDGE_CALLBACK", { state: state, path: path, query: query })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.billingPopupBridgeCallback = function (state, path, query, paymentSourceType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("BILLING_POPUP_BRIDGE_CALLBACK", {
                            state: state,
                            path: path,
                            query: query,
                            payment_source_type: paymentSourceType
                        })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.connectionsCallback = function (providerType, code, openIdParams, state) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("CONNECTIONS_CALLBACK", {
                            providerType: providerType,
                            code: code,
                            open_id_params: openIdParams,
                            state: state
                        })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.deepLink = function (type, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("DEEP_LINK", { type: type, params: params })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.inviteBrowser = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("INVITE_BROWSER", { code: code })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.initiateImageUpload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("INITIATE_IMAGE_UPLOAD")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openShareMomentDialog = function (mediaUrl) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("OPEN_SHARE_MOMENT_DIALOG", { mediaUrl: mediaUrl })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.openInviteDialog = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("OPEN_INVITE_DIALOG")];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.acceptActivityInvite = function (type, userId, sessionId, channelId, messageId) {
        return __awaiter(this, void 0, void 0, function () {
            var typeToNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typeToNumber = {
                            JOIN: 0
                        };
                        return [4 /*yield*/, this.client.request("ACCEPT_ACTIVITY_INVITE", {
                                type: typeToNumber[type],
                                user_id: userId,
                                session_id: sessionId,
                                channel_id: channelId,
                                message_id: messageId
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.activityInviteUser = function (userId, type, content, pid) {
        return __awaiter(this, void 0, void 0, function () {
            var typeToNumber;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        typeToNumber = {
                            JOIN: 0
                        };
                        return [4 /*yield*/, this.client.request("ACTIVITY_INVITE_USER", {
                                user_id: userId,
                                type: typeToNumber[type],
                                content: content,
                                pid: pid
                            })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.closeActivityJoinRequest = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("CLOSE_ACTIVITY_JOIN_REQUEST", { user_id: userId })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.sendActivityJoinInvite = function (userId, pid) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SEND_ACTIVITY_JOIN_INVITE", { user_id: userId, pid: pid })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    ClientUser.prototype.setConfig = function (useInteractivePip) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.request("SET_CONFIG", { use_interactive_pip: useInteractivePip })];
                    case 1: return [2 /*return*/, (_a.sent()).data];
                }
            });
        });
    };
    return ClientUser;
}(User_1.User));
exports.ClientUser = ClientUser;
