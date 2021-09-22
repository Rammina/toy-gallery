var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var Toy = require('./toy.model');
var generateId = require('../../utils/generateId.util');
exports.getToy = function (ctx) {
  return __awaiter(void 0, void 0, void 0, function () {
    var toyId, toy, err_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          toyId = ctx.params.toyId;
          return [4 /*yield*/, Toy.findById(toyId)];
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
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.getToyList = function (ctx) {
  return __awaiter(void 0, void 0, void 0, function () {
    var toys, err_2;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [4 /*yield*/, Toy.find().sort({ created: -1 })];
        case 1:
          toys = _a.sent();
          // check for any errors when retrieving the toys from the database
          ctx.assert(toys, 500, 'Unable to retrieve the toys.');
          // return success status code and JSON of the toys array
          ctx.status = 200;
          ctx.body = toys;
          return [3 /*break*/, 3];
        case 2:
          err_2 = _a.sent();
          throw err_2;
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.createToy = function (ctx) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, newToy, savedToy, err_3;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 2, , 3]);
          (_a = ctx.request.body),
            (name_1 = _a.name),
            (description = _a.description);
          // check for any missing required properties
          ctx.assert(name_1, 400, 'A toy should have a name.');
          newToy = new Toy({
            name: name_1,
            description: description,
          });
          return [4 /*yield*/, newToy.save()];
        case 1:
          savedToy = _b.sent();
          ctx.assert(savedToy, 500, 'Failed to save the toy in the database.');
          // return success status code and JSON of the toy object
          ctx.status = 201;
          ctx.body = savedToy;
          return [3 /*break*/, 3];
        case 2:
          err_3 = _b.sent();
          throw err_3;
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
exports.editToy = function (ctx) {
  return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_2, description, toyId, toy, savedToy, err_4;
    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          _b.trys.push([0, 3, , 4]);
          (_a = ctx.request.body),
            (name_2 = _a.name),
            (description = _a.description);
          toyId = ctx.params.toyId;
          // check for any missing required properties
          ctx.assert(
            toyId,
            400,
            'The toyId is missing. Something went wrong with the client request.',
          );
          ctx.assert(name_2, 400, 'A toy should have a name.');
          return [4 /*yield*/, Toy.findById(toyId)];
        case 1:
          toy = _b.sent();
          ctx.assert(toy, 404, 'Toy not found.');
          toy.name = name_2;
          toy.description = description;
          return [4 /*yield*/, toy.save()];
        case 2:
          savedToy = _b.sent();
          ctx.assert(savedToy, 500, 'Failed to edit the toy.');
          // return success status code and JSON of the toy object
          ctx.status = 200;
          ctx.body = savedToy;
          return [3 /*break*/, 4];
        case 3:
          err_4 = _b.sent();
          throw err_4;
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.deleteToy = function (ctx) {
  return __awaiter(void 0, void 0, void 0, function () {
    var toyId, toy, err_5;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          toyId = ctx.params.toyId;
          // check for missing id
          ctx.assert(
            toyId,
            400,
            'The toyId is missing. Something went wrong with the client request.',
          );
          return [4 /*yield*/, Toy.findByIdAndRemove(toyId)];
        case 1:
          toy = _a.sent();
          ctx.assert(
            toy,
            404,
            'Unable to find and remove the toy from the database.',
          );
          // return success status code and JSON of the toy object
          ctx.status = 200;
          ctx.body = { toyId: toyId };
          return [3 /*break*/, 3];
        case 2:
          err_5 = _a.sent();
          throw err_5;
        case 3:
          return [2 /*return*/];
      }
    });
  });
};
