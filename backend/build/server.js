"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// central point for passing middleware to the server
var koa_1 = __importDefault(require("koa"));
var bodyParser = require('koa-bodyparser')();
var compress = require('koa-compress')();
var cors = require('@koa/cors')( /* Add your cors option */);
var helmet = require('koa-helmet')( /* Add your security option */);
var logger = require('koa-logger')();
var error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
var toy_routes_1 = __importDefault(require("./api/toys/toy.routes"));
var user_routes_1 = __importDefault(require("./api/users/user.routes"));
var test_1 = __importDefault(require("./api/test"));
var server = new koa_1.default();
// Add here only development middlewares
if (process.env.NODE_ENV) {
    server.use(logger);
}
// Pass to the server instance middlewares
server.use(error_middleware_1.default).use(helmet).use(compress).use(cors).use(bodyParser);
// Apply to the server the api routers
server.use(toy_routes_1.default.routes());
server.use(user_routes_1.default.routes());
server.use(test_1.default.routes());
exports.default = server;
