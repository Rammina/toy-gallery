"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ToySchema = new Schema({
    name: { type: String, required: true, minlength: 1 },
    description: { type: String, default: '' },
    finished: { type: Boolean, default: false },
    created: {
        type: Date,
        default: Date.now(),
    },
});
ToySchema.set('toJSON', {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model('Toy', ToySchema);
