"use strict";
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
        while (_) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveUserInfo = exports.register = void 0;
var user_model_1 = __importDefault(require("./user.model"));
// TODO: Think of the functions for the user
var register = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, newUser, savedUser, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                username = ctx.request.body.username;
                ctx.assert(username, 400, 'Username is missing, something went wrong with the registration request.');
                return [4 /*yield*/, user_model_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                ctx.assert(!user, 409, 'Username is already taken.');
                newUser = new user_model_1.default({
                    username: username,
                    toysOwned: [],
                    registerDate: new Date(),
                });
                return [4 /*yield*/, newUser.save()];
            case 2:
                savedUser = _a.sent();
                ctx.assert(savedUser, 500, 'Failed to store user information on the database.');
                // return success status code and JSON of the user object
                ctx.status = 200;
                ctx.body = savedUser;
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                // send it to the error middleware
                throw err_1;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var retrieveUserInfo = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var username, user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                username = ctx.params.username;
                ctx.assert(username, 400, 'Username is missing, something went wrong with authentication.');
                return [4 /*yield*/, user_model_1.default.findOne({ username: username })];
            case 1:
                user = _a.sent();
                ctx.assert(user, 404, 'Username not found in the database.');
                // return success status code and JSON of the user object
                ctx.status = 200;
                ctx.body = user;
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                // send it to the error middleware
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.retrieveUserInfo = retrieveUserInfo;
