"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.List = void 0;
const mongoose_1 = require("mongoose");
const ListSchema = new mongoose_1.Schema({
    user_id: {
        type: mongoose_1.SchemaTypes.ObjectId,
        require: true,
        ref: "User"
    },
    modie_id: {
        type: mongoose_1.SchemaTypes.ObjectId,
        require: true,
        ref: "Movie"
    }
}, {
    timestamps: true
});
const List = (0, mongoose_1.model)("List", ListSchema);
exports.List = List;
