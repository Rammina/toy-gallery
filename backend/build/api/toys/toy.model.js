"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var ToySchema = new Schema({
    name: { type: String, required: true, minlength: 1 },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image_url: { type: String, default: '' },
    manufacturer: { type: String, default: '' },
    franchise: { type: String, default: '' },
    series: { type: String, default: '' },
    description: { type: String, default: '' },
    date_posted: {
        type: Date,
        default: Date.now(),
        required: true,
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
