"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = __importDefault(require("@koa/router"));
var toy_controller_1 = require("./toy.controller");
var router = new router_1.default({
    prefix: "/api/toys",
});
router
    .get('/:toyId', toy_controller_1.getToy)
    .get('/', toy_controller_1.getToyList)
    .post('/', toy_controller_1.createToy)
    .patch('/:toyId', toy_controller_1.editToy)
    .patch('/:toyId/upload_image', toy_controller_1.uploadToyImage)
    .delete('/:toyId', toy_controller_1.deleteToy);
// adding custom settings for middleware of upload image routes
// app.use("/projects/:id/upload_image", express.json({ limit: "50mb" }));
// app.use("/projects/:id/upload_image", express.urlencoded({ extended: "true" }));
exports.default = router;
