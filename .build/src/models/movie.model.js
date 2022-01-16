"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Movie = void 0;
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    name: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    media_type: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    backdrop: {
        type: String,
    },
}, {
    timestamps: true
});
const Movie = (0, mongoose_1.model)("Movie", MovieSchema);
exports.Movie = Movie;
