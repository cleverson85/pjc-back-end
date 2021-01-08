import Sequelize, { Model } from 'sequelize';

class Artista extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }
}

export default Artista;
