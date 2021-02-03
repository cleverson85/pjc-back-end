import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import morgan from 'morgan';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(morgan('dev'));

    const staticFolder = express.static(path.resolve(__dirname, '..', 'temp', 'uploads'));
    this.server.use('/files', staticFolder);

    const jsonParser = bodyParser.json({ type: 'application/json' });
    const urlencodedParser = bodyParser.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' });
    this.server.use(jsonParser);
    this.server.use(urlencodedParser);
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
