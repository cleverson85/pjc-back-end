import { Router } from 'express';

import ArtistaController from './app/controllers/ArtistaController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';

import authentication from './app/middlewares/autentication';
import validationArtista from './app/middlewares/validationArtista';

const routes = new Router();

// AUTENTICAÇÃO
routes.post('/session', SessionController.store);
routes.use(authentication);

// ROTAS PARA ADD, ATUALIZAR, EXCLUIR E LISTAR
routes.post('/artista', validationArtista, ArtistaController.post);
routes.put('/artista', validationArtista, ArtistaController.update);
routes.delete('/artista/:id', ArtistaController.delete);
routes.get('/artista', ArtistaController.list);
routes.get('/artista/name/:name', ArtistaController.list);

// ROTA PARA ARQUIVOS
routes.post('/files', FileController.store);

export default routes;
