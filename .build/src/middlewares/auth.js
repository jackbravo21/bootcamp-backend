"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
function authorize(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            message: 'Não autorizado'
        });
    }
    const token = authorization.replace('Bearer', '').trim();
    try {
        if (index_1.ENV_VARS.token_secret) {
            const data = jsonwebtoken_1.default.verify(token, index_1.ENV_VARS.token_secret);
            const { id } = data;
            if (!id) {
                return res.status(401).json({
                    error: 'Não autorizado!'
                });
            }
            req.user = id;
            return next();
        }
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error });
    }
}
exports.authorize = authorize;
