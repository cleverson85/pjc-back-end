import Sequelize, { Model } from 'sequelize';

class Album extends Model {
  static init(sequelize) {
    super.init({
      artistaId: Sequelize.INTEGER,
      nome: Sequelize.STRING,
    }, {
      sequelize,
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Artista, { foreignKey: 'artistaId', as: 'artista' });
  }
}

export default Album;
