import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        passwordHash: Sequelize.STRING,
        refreshToken: Sequelize.STRING,
      },
      {
        sequelize,
      },
    );

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.passwordHash);
  }
}

export default Usuario;
