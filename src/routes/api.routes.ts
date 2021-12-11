import { Router } from 'express';
import * as sessionController from '../controllers/session.controller';
import * as userController from '../controllers/user.controller';

const apiRouter = Router();

/* ROTAS GERAIS */

apiRouter.get('/', (req, res) => {
    return res.json({
        message: 'Nossa primeira rota de API'
    });
});

/* ROTAS DE USUÁRIO */

apiRouter.get('/users/id/:id', userController.view);
apiRouter.delete('/users/destroy/:id', userController.destroy);

/* ROTAS DE SESSAO */

apiRouter.post('/users/new', sessionController.create);

/* ROTAS DE FILME */



/* ROTAS DE LISTA */

export { apiRouter };