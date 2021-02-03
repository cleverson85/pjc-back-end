import Sequelize from 'sequelize';

import Artista from '../app/models/Artista';
import Album from '../app/models/Album';
import Usuario from '../app/models/Usuario';
import Imagem from '../app/models/Imagem';

import databaseConfig from '../config/database';

const models = [Artista, Album, Usuario, Imagem];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map((model) => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
