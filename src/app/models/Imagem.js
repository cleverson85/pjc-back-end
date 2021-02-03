import Sequelize, { Model } from 'sequelize';

class Imagem extends Model {
  static init(sequelize) {
    super.init({
      nome: Sequelize.STRING,
      url: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }
}

export default Imagem;
