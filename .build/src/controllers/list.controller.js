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
exports.remove = exports.add = exports.index = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const list_model_1 = require("../models/list.model");
const movie_model_1 = require("../models/movie.model");
function index(req, res) {
    const userId = req.user;
    list_model_1.List.aggregate([
        {
            $match: {
                'user_id': new mongoose_1.default.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: 'movies',
                localField: 'movie_id',
                foreignField: '_id',
                as: 'movies_list'
            }
        },
    ]).exec(function (error, list) {
        if (error) {
            console.log(error);
            return res.status(500).json(error);
        }
        const array = [];
        list.map((item) => {
            array.push(item.movies_list);
        });
        const result = array.flat(Infinity);
        return res.status(200).json(result);
    });
}
exports.index = index;
function add(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const movie = yield movie_model_1.Movie.findById(id);
        if (!movie) {
            return res.status(404).json({
                message: 'Esse filme não existe.'
            });
        }
        const insideList = yield list_model_1.List.findOne({ movie_id: id, user_id: req.user });
        if (insideList) {
            return res.status(401).json({
                message: 'Esse filme já se encontra na lista!'
            });
        }
        const data = new list_model_1.List({
            user_id: req.user,
            movie_id: movie._id
        });
        data.save((error, result) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(201).json(result);
        });
    });
}
exports.add = add;
function remove(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const listItem = yield list_model_1.List.findOne({ movie_id: id, user_id: req.user });
        console.log(listItem);
        if (!listItem) {
            return res.status(404).json({
                message: 'Item não existente na lista!'
            });
        }
        const deleted = yield list_model_1.List.findByIdAndDelete(listItem._id).catch(error => {
            return res.status(500).json({
                error,
                message: 'Erro: Não foi possível apagar este item da lista!'
            });
        });
        return res.status(200).json({
            message: 'Item apagado com sucesso!'
        });
    });
}
exports.remove = remove;
