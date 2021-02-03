import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import ArtistaController from './app/controllers/ArtistaController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import TokenController from './app/controllers/TokenController';

import authentication from './app/middlewares/autentication';
import validationArtista from './app/middlewares/validationArtista';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/token', TokenController.store);

// AUTENTICAÇÃO
routes.post('/session', SessionController.store);
routes.use(authentication);

// ROTAS PARA ADD, ATUALIZAR, EXCLUIR E LISTAR
routes.post('/artista', validationArtista, ArtistaController.post);
routes.put('/artista', validationArtista, ArtistaController.update);
routes.delete('/artista/:id', ArtistaController.delete);
routes.get('/artista', ArtistaController.list);
routes.get('/artista/:id', ArtistaController.get);
routes.get('/artista/:name', ArtistaController.list);

// ROTA PARA ARQUIVOS
routes.post('/files', upload.array('files'), FileController.store);
routes.post('/deletefiles', FileController.delete);

export default routes;
