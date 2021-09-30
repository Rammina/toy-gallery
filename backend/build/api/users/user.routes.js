"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("@koa/router"));
var user_controller_1 = require("./user.controller");
var router = new router_1.default({
    prefix: "/api/users",
});
router
    .get('/:username', user_controller_1.retrieveUserInfo)
    .post('/register', user_controller_1.register);
exports.default = router;
