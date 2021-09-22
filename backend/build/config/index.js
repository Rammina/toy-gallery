Object.defineProperty(exports, '__esModule', { value: true });
require('dotenv').config();
var fs = require('fs');
var path = require('path');
var config = {};
var basePath = path.join(__dirname, 'components');
// Require all the files from the components folder and add the imported to a unique configuration object
fs.readdirSync(basePath).forEach(function (file) {
  var componentConfig = require(path.join(basePath, file));
  Object.assign(config, componentConfig);
});
exports.default = config;
