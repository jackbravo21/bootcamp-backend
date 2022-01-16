"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = exports.create = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../index");
function index(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!req.headers.authorization) {
                return res.status(401).json({
                    error: 'Usuário não autorizado!'
                });
            }
            if (!req.user) {
                return res.status(401).json({
                    error: 'Sem autorização!'
                });
            }
            return res.status(200).json({
                userId: req.user
            });
        }
        catch (error) {
            return res.status(400).json({
                error,
            });
        }
    });
}
exports.index = index;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const userExists = yield user_model_1.User.findOne({ email });
            if (!userExists) {
                return res.status(403).json({
                    message: 'Não foi possível autenticar.'
                });
            }
            const isValid = yield userExists.comparePassword(password);
            if (!isValid) {
                return res.status(401).json({
                    message: 'Não foi possível autenticar.'
                });
            }
            const accessToken = createAccessToken(userExists._id);
            return res.status(200).json({
                user: {
                    id: userExists._id,
                    name: userExists.name
                },
                accessToken
            });
        }
        catch (error) {
            return res.status(400).json({
                error,
            });
        }
    });
}
exports.create = create;
function createAccessToken(userId) {
    return jsonwebtoken_1.default.sign({
        id: userId
    }, index_1.ENV_VARS.token_secret, {
        //expiresIn: 900 // 15min
        expiresIn: 86400 // 1d
    });
}
