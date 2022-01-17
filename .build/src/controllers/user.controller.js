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
Object.defineProperty(exports, "__esModule", { value: true });
exports.destroy = exports.create = exports.view = exports.all = void 0;
const user_model_1 = require("../models/user.model");
//rota de teste (se descomentar, adicionar "all" no export) e habilitar nas rotas;
function all(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_model_1.User.find();
        const allUsers = user.map(usuarios => '_id: ' + `${usuarios._id}` + ', name: ' + `${usuarios.name}` + ', email: ' + `${usuarios.email}` + ', createdAt: ' + `${usuarios.createdAt}` + ', updatedAt: ' + `${usuarios.updatedAt}`);
        console.log(allUsers);
        return res.json({ allUsers });
    });
}
exports.all = all;
function view(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        if (!id) {
            return res.status(404).json({
                message: 'Usuário não encontrado!'
            });
        }
        const user = yield user_model_1.User.findById(id);
        if (!user) {
            return res.status(404).json({
                message: 'Usuário não encontrado'
            });
        }
        return res.status(200).json({
            user: {
                id: user._id,
                name: user.name
            }
        });
    });
}
exports.view = view;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, email, password } = req.body;
        const userExists = yield user_model_1.User.findOne({ email });
        if (userExists) {
            return res.status(403).json({
                message: 'Usuário já cadastrado'
            });
        }
        const user = new user_model_1.User({ name, email, password });
        user.save((error, result) => {
            if (error) {
                console.log('Error: ', typeof error);
                res.json(error);
            }
            res.status(201).json({
                id: result._id,
                name: result.name
            });
        });
    });
}
exports.create = create;
function destroy(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const idExists = yield user_model_1.User.findById(id);
        if (!idExists) {
            return res.status(404).json({
                message: 'Usuário não encontrado!'
            });
        }
        const deleteUser = yield user_model_1.User.findByIdAndDelete(id);
        if (!deleteUser) {
            res.status(500).json({
                message: 'Erro: Não foi possível deletar o usuário!'
            });
        }
        return res.status(200).json({
            message: 'Usuário apagado com sucesso!'
        });
    });
}
exports.destroy = destroy;
