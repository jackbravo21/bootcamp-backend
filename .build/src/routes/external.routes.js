"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extRouter = void 0;
const express_1 = require("express");
const movieFetcher_1 = require("../external/movieFetcher");
const extRouter = (0, express_1.Router)();
exports.extRouter = extRouter;
extRouter.get('/external', movieFetcher_1.movieFetcher);
extRouter.post('/external/createBulk', movieFetcher_1.bulkCreate);
