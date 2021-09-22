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
// tests related to the Toy document and its HTTP methods
var supertest_1 = __importDefault(require("supertest"));
var server_1 = __importDefault(require("../../server"));
var toy_model_1 = __importDefault(require("../../api/toys/toy.model"));
var test_setup_1 = __importDefault(require("../../test-setup"));
var setupDB = test_setup_1.default.setupDB;
setupDB('toys-endpoint-testing', true);
//TODO: some of these tests should be split to different ones
// toys retrieving the toy list
describe('GET /', function () {
    // handle success case
    test('retrieve the correct number of toys from the database', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toys;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).get('/api/toys/')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    console.log(server_1.default);
                    console.log(server_1.default.callback());
                    console.log(res);
                    console.log(res.body);
                    return [4 /*yield*/, toy_model_1.default.find({})];
                case 2:
                    toys = _a.sent();
                    console.log(toys);
                    console.log(toys.length);
                    expect(toys.length).toBe(3);
                    return [2 /*return*/];
            }
        });
    }); });
});
// retrieve only a specific toy
describe('GET /:toyId', function () {
    // handle success case
    test('retrieve the correct toy given an id', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).get('/api/toys/000000000001')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [4 /*yield*/, toy_model_1.default.findById('000000000001')];
                case 2:
                    toy = _a.sent();
                    expect(toy).toMatchObject({
                        _id: '000000000001',
                        name: 'Thor 1/6 Scale',
                        manufacturer: 'Hot Toys',
                        description: 'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
                        image_url: 'https://www.sideshow.com/storage/product-images/903422/thor_marvel_silo.png',
                        franchise: 'Marvel',
                        series: 'Avengers: Infinity War',
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    //  handle fail case
    test('return status code of `404` and query return value of `null` if toy does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).get('/api/toys/000000000009')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [4 /*yield*/, toy_model_1.default.findById('000000000009')];
                case 2:
                    toy = _a.sent();
                    expect(toy).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('POST /', function () {
    // handle success case
    test('return status code of `201` when sending valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).post('/api/toys/').send({
                        name: 'Thor 1/6 Scale',
                        manufacturer: 'Hot Toys',
                        description: 'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
                        franchise: 'Marvel',
                        series: 'Avengers: Infinity War',
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    return [2 /*return*/];
            }
        });
    }); });
    test('response contains the correct properties when sending valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).post('/api/toys/').send({
                        name: 'Thor 1/6 Scale',
                        manufacturer: 'Hot Toys',
                        description: 'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
                        franchise: 'Marvel',
                        series: 'Avengers: Infinity War',
                    })];
                case 1:
                    res = _a.sent();
                    // Ensure that the response contains the correct properties
                    expect(res.body.name).toBeTruthy();
                    expect(res.body.manufacturer).toBeTruthy();
                    expect(res.body.franchise).toBeTruthy();
                    expect(res.body.series).toBeTruthy();
                    expect(res.body.description).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    test('Add toy document to the database when sending valid data', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).post('/api/toys/').send({
                        name: 'Thor 1/6 Scale',
                        manufacturer: 'Hot Toys',
                        description: 'Sophisticatedly crafted based on Chris Hemsworth’s appearance in the film with astonishing likeness, the Thor collectible figure features a newly developed head sculpt with specially applied luminous reflective effect on the eye that accentuates Thor using his thunder power, a newly developed muscular body with two pairs of interchangeable arms, intricately detailed body armor with LED light up circle plates and lightning effect accessories, a detachable red-colored cap, detail recreation of Thor’s weapon Stormbreaker, and a specially designed figure stand with movie logo.',
                        franchise: 'Marvel',
                        series: 'Avengers: Infinity War',
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, toy_model_1.default.findById(res.body.id)];
                case 2:
                    toy = _a.sent();
                    expect(toy.name).toBeTruthy();
                    expect(toy.manufacturer).toBeTruthy();
                    expect(toy.franchise).toBeTruthy();
                    expect(toy.series).toBeTruthy();
                    expect(toy.description).toBeTruthy();
                    return [2 /*return*/];
            }
        });
    }); });
    // handle fail case
    test('missing toy name should return status code `400` and error message', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).post('/api/toys/').send({
                        description: 'toy without a name',
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(400);
                    // .toContain is used because the error message's wording could be changed
                    expect(res.body.status).toContain('fail');
                    expect(res.body.message).toContain('toy should have a name');
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('PATCH /:toyId', function () {
    // handle success case
    test('return status code `200` when valid data is sent', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback())
                        .patch('/api/toys/000000000001')
                        .send({
                        name: 'Captain America',
                        manufacturer: 'Hot Toys',
                        description: 'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
                        franchise: 'Marvel',
                        series: 'Avengers: Endgame',
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('response body returns updated values when valid data is sent', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback())
                        .patch('/api/toys/000000000001')
                        .send({
                        name: 'Captain America',
                        manufacturer: 'Hot Toys',
                        description: 'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
                        franchise: 'Marvel',
                        series: 'Avengers: Endgame',
                    })];
                case 1:
                    res = _a.sent();
                    // Ensure that the response contains the updated values
                    expect(res.body.name).toBe('Captain America');
                    expect(res.body.manufacturer).toBe('Hot Toys');
                    expect(res.body.franchise).toBe('Marvel');
                    expect(res.body.series).toBe('Avengers: Endgame');
                    expect(res.body.description).toBe('Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame');
                    return [2 /*return*/];
            }
        });
    }); });
    test('updates toy document in the database when valid data is sent', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback())
                        .patch('/api/toys/000000000001')
                        .send({
                        name: 'Captain America',
                        manufacturer: 'Hot Toys',
                        description: 'Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame',
                        franchise: 'Marvel',
                        series: 'Avengers: Endgame',
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, toy_model_1.default.findById(res.body.id)];
                case 2:
                    toy = _a.sent();
                    expect(toy.name).toBe('Captain America');
                    expect(toy.manufacturer).toBe('Hot Toys');
                    expect(toy.franchise).toBe('Marvel');
                    expect(toy.series).toBe('Avengers: Endgame');
                    expect(toy.description).toBe('Authentic and detailed likeness of Chris Evans as Captain America in Avengers: Endgame');
                    return [2 /*return*/];
            }
        });
    }); });
    // handle fail case
    // missing name property
    test('missing toy name should return status code `400` and error message', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback())
                        .patch('/api/toys/:toyId')
                        .send({
                        description: 'toy without a name',
                    })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(400);
                    // .toContain is used because the error message's wording could be changed
                    expect(res.body.status).toContain('fail');
                    expect(res.body.message).toContain('toy should have a name');
                    return [2 /*return*/];
            }
        });
    }); });
    // not found because of wrong id
    test('return status code of `404` and query return value of `null` if toy does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback())
                        .patch('/api/toys/000000000009')
                        .send({ name: 'new toy name', description: 'new description' })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [4 /*yield*/, toy_model_1.default.findById('000000000009')];
                case 2:
                    toy = _a.sent();
                    expect(toy).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('DELETE /:toyId', function () {
    // handle success case
    test('return status code of `200` when deleting existing toy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).delete('/api/toys/000000000001')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    return [2 /*return*/];
            }
        });
    }); });
    test('remove the toy from the database when deleting existing toy', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).delete('/api/toys/000000000001')];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, toy_model_1.default.findById(res.body.id)];
                case 2:
                    toy = _a.sent();
                    expect(toy).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
    // handle fail case
    // not found because of wrong id
    test('return status code of `404` and query return value of `null` if toy does not exist', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, toy;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(server_1.default.callback()).delete('/api/toys/000000000009')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(404);
                    return [4 /*yield*/, toy_model_1.default.findById('000000000009')];
                case 2:
                    toy = _a.sent();
                    expect(toy).toBe(null);
                    return [2 /*return*/];
            }
        });
    }); });
});
