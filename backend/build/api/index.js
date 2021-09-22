var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs_1 = __importDefault(require('fs'));
var path_1 = __importDefault(require('path'));
var router_1 = __importDefault(require('@koa/router'));
var baseName = path_1.default.basename(__filename);
var applyApiMiddleware = function (app) {
  var router = new router_1.default({
    prefix: '/api',
  });
  // Require all the folders and create a sub-router for each feature api
  fs_1.default
    .readdirSync(__dirname)
    .filter(function (file) {
      return file.indexOf('.') !== 0 && file !== baseName;
    })
    .forEach(function (file) {
      var api = require(path_1.default.join(__dirname, file))(router_1.default);
      console.log(api);
      router.use(api.routes());
    });
  app.use(router.routes()).use(router.allowedMethods());
};
exports.default = applyApiMiddleware;
