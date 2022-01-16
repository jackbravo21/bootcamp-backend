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
exports.search = exports.view = exports.create = exports.index = void 0;
const movie_model_1 = require("../models/movie.model");
const pagination_1 = require("../middlewares/pagination");
function index(req, res) {
    const page = req.query.page;
    movie_model_1.Movie.find((error, result) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }
        return res.status(201).json((0, pagination_1.paginate)(result, 10, parseInt(page)));
    });
}
exports.index = index;
function create(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, category, description, media_type, poster, backdrop } = req.body;
        const movieExists = yield movie_model_1.Movie.findOne({ name });
        if (movieExists) {
            return res.status(409).json({
                message: 'Filme já existe.'
            });
        }
        const movie = new movie_model_1.Movie({ name, category, description, media_type, poster, backdrop });
        movie.save((error, result) => {
            if (error) {
                return res.status(500).json({
                    error
                });
            }
            return res.status(201).json({
                result
            });
        });
    });
}
exports.create = create;
function view(req, res) {
    const { id } = req.params;
    movie_model_1.Movie.findById(id, (error, result) => {
        if (error) {
            return res.status(500).json({
                error
            });
        }
        return res.status(200).json({
            result
        });
    });
}
exports.view = view;
function search(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { search } = req.params;
        const regex = new RegExp(search, 'gi');
        const result = yield movie_model_1.Movie.find({ name: regex }).catch(error => {
            console.log(error);
            return res.status(500).json({
                message: error
            });
        });
        if (!result) {
            return res.status(500).json({
                message: 'Não foi possível encontrar!'
            });
        }
        return res.status(200).json({
            result
        });
    });
}
exports.search = search;
