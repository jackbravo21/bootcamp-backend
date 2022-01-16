"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const userController = __importStar(require("../controllers/user.controller"));
const sessionController = __importStar(require("../controllers/session.controller"));
const movieController = __importStar(require("../controllers/movie.controller"));
const listController = __importStar(require("../controllers/list.controller"));
const auth_1 = require("../middlewares/auth");
const apiRouter = (0, express_1.Router)();
exports.apiRouter = apiRouter;
/* ROTAS GERAIS */
apiRouter.get('/', (req, res) => {
    return res.json({
        message: 'Rota raiz OK.'
    });
});
/* ROTAS DE USUÁRIO */
apiRouter.get('/users/all', userController.all);
apiRouter.post('/users/new', userController.create);
apiRouter.get('/users/id/:id', userController.view);
apiRouter.delete('/users/destroy/:id', auth_1.authorize, userController.destroy);
/* ROTAS DE SESSÃO */
apiRouter.get('/session', auth_1.authorize, sessionController.index);
apiRouter.post('/session/new', sessionController.create);
/* ROTAS DE FILME */
apiRouter.get('/movies', movieController.index);
apiRouter.get('/movies/id/:id', auth_1.authorize, movieController.view);
apiRouter.get('/movies/search/:search', auth_1.authorize, movieController.search);
apiRouter.post('/movies/new', auth_1.authorize, movieController.create);
/* ROTAS DE LISTA */
apiRouter.get('/list', auth_1.authorize, listController.index);
apiRouter.post('/list/add/:id', auth_1.authorize, listController.add);
apiRouter.delete('/list/remove/:id', auth_1.authorize, listController.remove);
