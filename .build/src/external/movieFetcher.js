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
exports.bulkCreate = exports.movieFetcher = void 0;
const fs_1 = __importDefault(require("fs"));
const axios_1 = __importDefault(require("axios"));
const movie_model_1 = require("../models/movie.model");
const URL_MOVIES = 'https://api.themoviedb.org/3/trending/all/week?api_key=8c9751844a68e8e7105d68bd90f6eb25';
const URL_CATEGORIES_MOVIES = 'https://api.themoviedb.org/3/genre/movie/list?api_key=8c9751844a68e8e7105d68bd90f6eb25&language=en-US';
const URL_CATEGORIES_TV = 'https://api.themoviedb.org/3/genre/tv/list?api_key=8c9751844a68e8e7105d68bd90f6eb25&language=en-US';
const URL_IMAGES = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';
function movieFetcher(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const getMovies = yield (0, axios_1.default)(URL_MOVIES);
        const moviesList = getMovies.data.results;
        const getCategoriesMovie = yield (0, axios_1.default)(URL_CATEGORIES_MOVIES);
        const catsListMovie = getCategoriesMovie.data.genres;
        const getCategoriesTV = yield (0, axios_1.default)(URL_CATEGORIES_TV);
        const catsListTV = getCategoriesTV.data.genres;
        const moviesArray = [];
        moviesList.map((obj) => {
            const movieObj = {
                name: undefined,
                category: undefined,
                description: undefined,
                media_type: undefined,
                poster: undefined,
                backdrop: undefined
            };
            if (obj.media_type === "movie") {
                movieObj.name = obj.title;
            }
            else {
                movieObj.name = obj.name;
            }
            const poster_url = URL_IMAGES + obj.poster_path;
            const backdrop_url = URL_IMAGES + obj.backdrop_path;
            movieObj.category = obj.genre_ids;
            movieObj.description = obj.overview;
            movieObj.media_type = obj.media_type;
            movieObj.poster = poster_url;
            movieObj.backdrop = backdrop_url;
            moviesArray.push(movieObj);
        });
        moviesArray.map((movie, movieIndex) => {
            catsListMovie.find((cat, catIndex) => {
                if (movie.media_type === "movie" && cat.id === movie.category[0]) {
                    movie.category = cat.name;
                }
            });
        });
        moviesArray.map((movie, movieIndex) => {
            catsListTV.find((cat, catIndex) => {
                if (movie.media_type === "tv"
                    && cat.id === movie.category[0]) {
                    movie.category = cat.name;
                }
            });
        });
        writeToJson(moviesArray);
        return res.status(200).json({
            moviesArray
        });
    });
}
exports.movieFetcher = movieFetcher;
function writeToJson(array) {
    const arrayMovies = JSON.stringify(array);
    const fileSteam = fs_1.default.createWriteStream('./src/movies.json');
    fileSteam.write(arrayMovies + '\n');
    fileSteam.on('finish', () => {
        console.log('File Steam concluido');
    });
    fileSteam.on('error', (error) => {
        console.log(`File Steam teve um erro: ${error}`);
    });
    fileSteam.end();
}
function bulkCreate(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { filePath } = req.body;
        const array = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        const movies = yield movie_model_1.Movie.insertMany(array).catch(error => {
            return res.status(500).json(error);
        });
        return res.status(201).json(movies);
    });
}
exports.bulkCreate = bulkCreate;
