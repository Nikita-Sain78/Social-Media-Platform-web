"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("./user.model"));
const postSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        minlength: 80,
        required: true,
    },
    description: {
        type: String,
    },
    media: {
        type: String,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: user_model_1.default,
    },
    likes: [
        {
            totalLikes: {
                type: Number,
            },
            likedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: user_model_1.default,
            },
        },
    ],
    comments: [
        {
            commentedBy: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: user_model_1.default,
            },
        },
    ],
});
//# sourceMappingURL=post.model.js.map