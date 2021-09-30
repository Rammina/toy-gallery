"use strict";
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
exports.uploadToyImage = exports.deleteToy = exports.editToy = exports.createToy = exports.getToyList = exports.getToy = void 0;
var toy_model_1 = __importDefault(require("./toy.model"));
var user_model_1 = __importDefault(require("../users/user.model"));
var cloudinary = require('../../utils/cloudinary').cloudinary;
var getToy = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var toyId, toy, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                toyId = ctx.params.toyId;
                return [4 /*yield*/, toy_model_1.default.findById(toyId).populate('user')];
            case 1:
                toy = _a.sent();
                // check for any errors when retrieving the toys from the database
                ctx.assert(toy, 404, 'Toy not found.');
                // return success status code and JSON of the toy object
                ctx.status = 200;
                ctx.body = toy;
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                // send it to the error middleware
                throw err_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getToy = getToy;
var getToyList = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, sortPropName, sortOrder, filter, sortQuery, sortOrderNumber, filterQuery, filterRegex, toys, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = ctx.query, sortPropName = _a.sortPropName, sortOrder = _a.sortOrder, filter = _a.filter;
                sortQuery = {};
                if (sortPropName && sortOrder) {
                    sortOrderNumber = sortOrder === 'asc' ? 1 : -1;
                    // The order in which you assign parameters matters for its priority
                    sortQuery[sortPropName] = sortOrderNumber;
                    if (sortPropName !== 'name')
                        sortQuery.name = 1;
                }
                else {
                    sortQuery = { date_posted: -1, name: 1 }; //default nested sort
                }
                filterQuery = {};
                //filter based on frontend search bar value, but no filter if not given
                if (filter) {
                    filterRegex = { $regex: new RegExp(filter, 'ig') };
                    filterQuery = {
                        $or: [
                            { name: filterRegex },
                            { franchise: filterRegex },
                            { series: filterRegex },
                            { manufacturer: filterRegex },
                        ],
                    };
                }
                return [4 /*yield*/, toy_model_1.default.find(filterQuery)
                        .collation({ locale: 'en', caseFirst: 'off' })
                        .sort(sortQuery)
                        .populate('user')];
            case 1:
                toys = _b.sent();
                // check for any errors when retrieving the toys from the database
                ctx.assert(toys, 500, 'Unable to retrieve the toys.');
                // return success status code and JSON of the toys array
                ctx.status = 200;
                ctx.body = toys;
                return [3 /*break*/, 3];
            case 2:
                err_2 = _b.sent();
                throw err_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getToyList = getToyList;
var createToy = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, userId, manufacturer, description, franchise, series, user, newToy, savedToy, err_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 3, , 4]);
                _a = ctx.request.body, name_1 = _a.name, userId = _a.userId, manufacturer = _a.manufacturer, description = _a.description, franchise = _a.franchise, series = _a.series;
                // check for any missing required properties
                ctx.assert(name_1, 400, 'A toy should have a name.');
                ctx.assert(userId, 401, 'User is not logged in. Please sign in.');
                return [4 /*yield*/, user_model_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                ctx.assert(user, 404, 'Unable to find user in the database.');
                newToy = new toy_model_1.default({
                    name: name_1.trim(),
                    user: userId,
                    manufacturer: manufacturer ? manufacturer.trim() : '',
                    description: description ? description.trim() : '',
                    franchise: franchise ? franchise.trim() : '',
                    series: series ? series.trim() : '',
                });
                return [4 /*yield*/, newToy.save()];
            case 2:
                savedToy = _b.sent();
                ctx.assert(savedToy, 500, 'Failed to save the toy in the database.');
                // return success status code and JSON of the toy object
                ctx.status = 201;
                ctx.body = __assign(__assign({}, savedToy._doc), { user: user }); // ._doc contains the actual document properties
                return [3 /*break*/, 4];
            case 3:
                err_3 = _b.sent();
                throw err_3;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createToy = createToy;
var editToy = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, userId, manufacturer, description, franchise, series, toyId, user, toy, savedToy, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = ctx.request.body, name_2 = _a.name, userId = _a.userId, manufacturer = _a.manufacturer, description = _a.description, franchise = _a.franchise, series = _a.series;
                toyId = ctx.params.toyId;
                // check for any missing required properties
                ctx.assert(toyId, 400, 'The toyId is missing. Something went wrong with the client request.');
                ctx.assert(name_2, 400, 'A toy should have a name.');
                ctx.assert(userId, 401, 'User is not logged in. Please sign in.');
                return [4 /*yield*/, user_model_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                ctx.assert(user, 404, 'Unable to find user in the database.');
                return [4 /*yield*/, toy_model_1.default.findById(toyId)];
            case 2:
                toy = _b.sent();
                ctx.assert(toy, 404, 'Toy not found.');
                // remove whitespace, update the properties, and then save to the database
                toy.name = name_2.trim();
                toy.description = description ? description.trim() : '';
                toy.manufacturer = manufacturer ? manufacturer.trim() : '';
                toy.description = description ? description.trim() : '';
                toy.franchise = franchise ? franchise.trim() : '';
                toy.series = series ? series.trim() : '';
                return [4 /*yield*/, toy.save()];
            case 3:
                savedToy = _b.sent();
                ctx.assert(savedToy, 500, 'Failed to edit the toy.');
                // return success status code and JSON of the toy object + the user object
                ctx.status = 200;
                ctx.body = __assign(__assign({}, savedToy._doc), { user: user });
                return [3 /*break*/, 5];
            case 4:
                err_4 = _b.sent();
                throw err_4;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.editToy = editToy;
var deleteToy = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, toyId, user, toy, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                userId = ctx.request.body.userId;
                toyId = ctx.params.toyId;
                // check for missing properties
                ctx.assert(toyId, 400, 'The toyId is missing. Something went wrong with the client request.');
                ctx.assert(userId, 401, 'User is not logged in. Please sign in.');
                return [4 /*yield*/, user_model_1.default.findById(userId)];
            case 1:
                user = _a.sent();
                ctx.assert(user, 404, 'Unable to find user in the database.');
                return [4 /*yield*/, toy_model_1.default.findByIdAndRemove(toyId)];
            case 2:
                toy = _a.sent();
                ctx.assert(toy, 404, 'Unable to find and remove the toy from the database.');
                // return success status code and JSON of the toy object
                ctx.status = 200;
                ctx.body = { toyId: toyId };
                return [3 /*break*/, 4];
            case 3:
                err_5 = _a.sent();
                throw err_5;
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteToy = deleteToy;
var uploadToyImage = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, fileStr, userId, toyId, user, uploadedResponse, image_url, toy, savedToy, err_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                _a = ctx.request.body, fileStr = _a.fileStr, userId = _a.userId;
                toyId = ctx.params.toyId;
                ctx.assert(fileStr, 400, 'File string for image is missing.');
                ctx.assert(userId, 401, 'User is not logged in. Please sign in.');
                return [4 /*yield*/, user_model_1.default.findById(userId)];
            case 1:
                user = _b.sent();
                ctx.assert(user, 404, 'Unable to find user in the database.');
                return [4 /*yield*/, cloudinary.uploader.upload(fileStr, {
                        upload_preset: 'toy-gallery',
                        public_id: toyId + "-toy-main-image",
                    })];
            case 2:
                uploadedResponse = _b.sent();
                image_url = uploadedResponse.secure_url;
                return [4 /*yield*/, toy_model_1.default.findById(toyId)];
            case 3:
                toy = _b.sent();
                toy.image_url = image_url;
                return [4 /*yield*/, toy.save()];
            case 4:
                savedToy = _b.sent();
                ctx.assert(savedToy, 500, 'Failed to update the toy.');
                ctx.body = __assign(__assign({}, savedToy._doc), { user: user });
                return [3 /*break*/, 6];
            case 5:
                err_6 = _b.sent();
                throw err_6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.uploadToyImage = uploadToyImage;
