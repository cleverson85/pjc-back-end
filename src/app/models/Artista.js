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

  static associate(models) {
    this.hasMany(models.Album, {
      foreignKey: 'artistaId', as: 'albuns', onDelete: 'cascade',
    });
    this.hasMany(models.Imagem, {
      foreignKey: 'artistaId', as: 'imagens', onDelete: 'cascade',
    });
  }
}

export default Artista;
