"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        required: true,
    },
    toysOwned: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Toy' }],
    registerDate: {
        type: Date,
        default: Date.now(),
    },
});
UserSchema.set('toJSON', {
    transform: function (document, returnedObject) {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    },
});
exports.default = mongoose_1.default.model('User', UserSchema);
